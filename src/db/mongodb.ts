import fs from 'fs';
import path from 'path';
import { MongoClient, Db, Collection } from 'mongodb';

// Define User Document schema stored in MongoDB
export interface MongoUserDocument {
  _id?: any;
  userId: string; // e.g. CGURU-U1001 or user_1712345678
  name: string;
  email: string;
  phone: string;
  password?: string;
  course: string;
  avatarSeed?: string;
  role: 'student' | 'admin';
  isAdmin: boolean;
  isSubscribed: boolean;
  subscriptionPlan: string;
  isBlocked?: boolean;
  blockedAt?: string;
  blockedReason?: string;
  enrolledAt: string;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  progress?: {
    completedTopicIds: string[];
    quizScores: Record<string, number>;
    bugsSolvedIds: string[];
    compilerRunsCount: number;
    bookmarkedTopicIds: string[];
    streakDays: number;
    lastActiveDate: string;
  };
}

const CONFIG_FILE = path.resolve(process.cwd(), 'data', 'mongodb-config.json');

function getSavedCustomUri(): { uri: string; dbName: string } {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const raw = fs.readFileSync(CONFIG_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (parsed.uri) {
        return {
          uri: String(parsed.uri).trim(),
          dbName: parsed.dbName ? String(parsed.dbName).trim() : 'cguru_database'
        };
      }
    }
  } catch {}
  return { uri: '', dbName: 'cguru_database' };
}

export function sanitizeMongoUri(rawUri: string): string {
  if (!rawUri || typeof rawUri !== 'string') return '';
  const trimmed = rawUri.trim();
  // Match mongodb(+srv)://<credentials>@<host>/<path>
  const match = trimmed.match(/^(mongodb(?:\+srv)?:\/\/)(.*)@([^/]+(?:\/.*)?)$/);
  if (!match) return trimmed;

  const protocol = match[1];
  const credentials = match[2];
  const hostAndRest = match[3];

  const firstColon = credentials.indexOf(':');
  if (firstColon === -1) {
    // Only username without password
    return `${protocol}${encodeURIComponent(decodeURIComponent(credentials))}@${hostAndRest}`;
  }

  const username = credentials.substring(0, firstColon);
  const password = credentials.substring(firstColon + 1);

  // Safely decode first in case already partially encoded, then encode
  const safeUser = encodeURIComponent(decodeURIComponent(username));
  const safePassword = encodeURIComponent(decodeURIComponent(password));

  return `${protocol}${safeUser}:${safePassword}@${hostAndRest}`;
}

export function saveCustomUri(uri: string, dbName: string = 'cguru_database') {
  try {
    const dir = path.dirname(CONFIG_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const sanitized = sanitizeMongoUri(uri);
    fs.writeFileSync(CONFIG_FILE, JSON.stringify({ uri: sanitized, dbName: dbName.trim(), updatedAt: new Date().toISOString() }, null, 2), 'utf-8');
  } catch (err) {
    console.warn('[MONGODB] Could not save custom config file:', err);
  }
}

export function getEffectiveMongoUri(): string {
  const custom = getSavedCustomUri();
  const raw = custom.uri || process.env.MONGODB_URI || process.env.MONGO_URI || process.env.DATABASE_URL || '';
  return sanitizeMongoUri(raw);
}

export function getEffectiveDbName(): string {
  const custom = getSavedCustomUri();
  if (custom.dbName) return custom.dbName;
  return process.env.MONGODB_DB_NAME || 'cguru_database';
}

export function maskMongoUri(uri: string): string {
  if (!uri) return 'Not Configured';
  try {
    // Hide password in mongodb+srv://username:password@cluster...
    return uri.replace(/(mongodb(?:\+srv)?:\/\/[^:]+:)([^@]+)(@)/, '$1••••••••$3');
  } catch {
    return 'mongodb://••••••••';
  }
}

// Global cache for serverless & Express environments
let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<{
  client: MongoClient | null;
  db: Db | null;
  isConnected: boolean;
  provider: 'mongodb' | 'local_fallback';
  error?: string;
  pingMs?: number;
}> {
  const currentUri = getEffectiveMongoUri();
  const dbName = getEffectiveDbName();

  if (!currentUri) {
    return {
      client: null,
      db: null,
      isConnected: false,
      provider: 'local_fallback',
      error: 'MONGODB_URI not provided. Using high-speed local data persistence.'
    };
  }

  if (cachedClient && cachedDb) {
    return {
      client: cachedClient,
      db: cachedDb,
      isConnected: true,
      provider: 'mongodb'
    };
  }

  const start = Date.now();
  try {
    const client = new MongoClient(currentUri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000
    });

    await client.connect();
    const db = client.db(dbName);

    // Ping check
    await db.command({ ping: 1 });
    const pingMs = Date.now() - start;

    // Create unique indexes on email, phone, and userId
    try {
      const usersCol = db.collection<MongoUserDocument>('users');
      await usersCol.createIndex({ email: 1 }, { unique: true, sparse: true });
      await usersCol.createIndex({ phone: 1 }, { unique: true, sparse: true });
      await usersCol.createIndex({ userId: 1 }, { unique: true, sparse: true });
    } catch (idxErr) {
      console.warn('[MONGODB] Index note:', idxErr);
    }

    cachedClient = client;
    cachedDb = db;

    console.log(`[MONGODB] ✅ Successfully connected to MongoDB database "${dbName}" (${pingMs}ms)!`);
    return {
      client,
      db,
      isConnected: true,
      provider: 'mongodb',
      pingMs
    };
  } catch (err: any) {
    console.error(`[MONGODB] ⚠️ Connection error:`, err.message);
    cachedClient = null;
    cachedDb = null;
    return {
      client: null,
      db: null,
      isConnected: false,
      provider: 'local_fallback',
      error: err.message
    };
  }
}

export async function resetAndReconnect(newUri: string, newDbName?: string): Promise<{
  success: boolean;
  message: string;
  pingMs?: number;
  dbName: string;
}> {
  if (cachedClient) {
    try {
      await cachedClient.close();
    } catch {}
    cachedClient = null;
    cachedDb = null;
  }

  const dbNameToUse = (newDbName || 'cguru_database').trim();
  saveCustomUri(newUri, dbNameToUse);

  const res = await connectToDatabase();
  if (res.isConnected) {
    return {
      success: true,
      message: `MongoDB Atlas क्लस्टर सफलतापूर्वक कनेक्ट हो गया (${res.pingMs}ms)!`,
      pingMs: res.pingMs,
      dbName: dbNameToUse
    };
  } else {
    throw new Error(res.error || 'Failed to connect to MongoDB cluster.');
  }
}

export async function getUsersCollection(): Promise<Collection<MongoUserDocument> | null> {
  const { db } = await connectToDatabase();
  if (!db) return null;
  return db.collection<MongoUserDocument>('users');
}
