import fs from 'fs';
import path from 'path';
import {
  MongoUserDocument,
  getUsersCollection,
  connectToDatabase,
  getEffectiveMongoUri,
  getEffectiveDbName,
  maskMongoUri,
  resetAndReconnect
} from './mongodb';
import { validateRealEmail } from '../utils/emailValidator';

const LOCAL_DATA_DIR = path.resolve(process.cwd(), 'data');
const LOCAL_USERS_FILE = path.resolve(LOCAL_DATA_DIR, 'users.json');

// Ensure local fallback directory exists
function ensureLocalFile() {
  try {
    if (!fs.existsSync(LOCAL_DATA_DIR)) {
      fs.mkdirSync(LOCAL_DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(LOCAL_USERS_FILE)) {
      fs.writeFileSync(LOCAL_USERS_FILE, JSON.stringify([], null, 2), 'utf-8');
    }
  } catch {}
}

function getLocalUsers(): MongoUserDocument[] {
  ensureLocalFile();
  try {
    const raw = fs.readFileSync(LOCAL_USERS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveLocalUsers(users: MongoUserDocument[]) {
  ensureLocalFile();
  try {
    fs.writeFileSync(LOCAL_USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
  } catch (err) {
    console.error('[LOCAL-DB] Failed to save users:', err);
  }
}

// Generate human-friendly sequential or timestamped User ID (e.g. CGURU-U10842)
export function generateUserId(): string {
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const timeSuffix = Date.now().toString().slice(-4);
  return `CGURU-U${timeSuffix}${randomSuffix}`;
}

export async function findUserByPhoneOrEmail(
  phone: string,
  email?: string
): Promise<MongoUserDocument | null> {
  const cleanPhoneDigits = (phone || '').replace(/\D/g, '').slice(-10);
  const cleanEmailStr = (email || '').trim().toLowerCase();

  const collection = await getUsersCollection();
  if (collection) {
    try {
      const query: any = {
        $or: [
          ...(cleanPhoneDigits ? [{ phone: cleanPhoneDigits }] : []),
          ...(cleanEmailStr ? [{ email: cleanEmailStr }] : [])
        ]
      };
      if (query.$or.length > 0) {
        const found = await collection.findOne(query);
        if (found) return found;
      }
    } catch (err) {
      console.warn('[MONGODB] Query error, falling back to local store:', err);
    }
  }

  // Local fallback
  const localUsers = getLocalUsers();
  return (
    localUsers.find(
      u =>
        (cleanPhoneDigits && u.phone === cleanPhoneDigits) ||
        (cleanEmailStr && u.email.toLowerCase() === cleanEmailStr)
    ) || null
  );
}

export async function registerOrUpdateMongoUser(data: {
  name: string;
  email: string;
  phone: string;
  password?: string;
  course?: string;
  role?: 'student' | 'admin';
  isSubscribed?: boolean;
}): Promise<{ success: boolean; user?: MongoUserDocument; error?: string; isNewUser?: boolean }> {
  const cleanPhoneDigits = (data.phone || '').replace(/\D/g, '').slice(-10);
  const cleanEmailStr = (data.email || '').trim().toLowerCase();
  const cleanName = (data.name || '').trim();

  // Validate Email strictly
  const emailVal = validateRealEmail(cleanEmailStr, 'hi');
  if (!emailVal.isValid) {
    return {
      success: false,
      error: emailVal.error || 'कृपया सही ईमेल आईडी दर्ज करें।'
    };
  }

  if (cleanPhoneDigits.length !== 10) {
    return {
      success: false,
      error: 'कृपया सही 10-अंकों का मोबाइल नंबर दर्ज करें।'
    };
  }

  const nowIso = new Date().toISOString();
  const todayStr = nowIso.split('T')[0];
  const isAdmin =
    cleanPhoneDigits === '9876543210' ||
    cleanEmailStr === 'kuldeep0203singh@gmail.com' ||
    data.role === 'admin';

  const collection = await getUsersCollection();

  // 1. Check if user already exists
  const existing = await findUserByPhoneOrEmail(cleanPhoneDigits, cleanEmailStr);

  if (existing) {
    if (existing.isBlocked) {
      return {
        success: false,
        error: 'यह खाता व्यवस्थापक (Admin) द्वारा ब्लॉक कर दिया गया है। एक्सेस प्रतिबंधित है।'
      };
    }

    // Update existing user's details & login timestamp
    const updatedUser: MongoUserDocument = {
      ...existing,
      name: cleanName || existing.name,
      email: cleanEmailStr || existing.email,
      phone: cleanPhoneDigits || existing.phone,
      password: data.password ? data.password.trim() : existing.password,
      course: data.course || existing.course || 'Complete C Programming Masterclass',
      role: isAdmin ? 'admin' : (existing.role || 'student'),
      isAdmin: isAdmin || Boolean(existing.isAdmin),
      lastLoginAt: nowIso,
      updatedAt: nowIso
    };

    if (collection) {
      try {
        await collection.updateOne(
          { _id: existing._id },
          { $set: updatedUser }
        );
      } catch (err: any) {
        console.warn('[MONGODB] Update error:', err.message);
      }
    }

    // Also update local fallback
    const locals = getLocalUsers();
    const idx = locals.findIndex(
      u => u.phone === cleanPhoneDigits || u.email.toLowerCase() === cleanEmailStr
    );
    if (idx !== -1) {
      locals[idx] = updatedUser;
    } else {
      locals.push(updatedUser);
    }
    saveLocalUsers(locals);

    return { success: true, user: updatedUser, isNewUser: false };
  }

  // 2. Create brand new User with generated User ID
  const newUserId = generateUserId();
  const newUserDoc: MongoUserDocument = {
    userId: newUserId,
    name: cleanName || `Student ${cleanPhoneDigits.slice(-4)}`,
    email: cleanEmailStr,
    phone: cleanPhoneDigits,
    password: data.password ? data.password.trim() : '',
    course: data.course || 'Complete C Programming Masterclass',
    avatarSeed: cleanName.toLowerCase().replace(/\s+/g, '_') || 'student',
    role: isAdmin ? 'admin' : 'student',
    isAdmin,
    isSubscribed: Boolean(data.isSubscribed),
    subscriptionPlan: data.isSubscribed ? 'Pro Lifetime' : 'Free Trial',
    enrolledAt: todayStr,
    createdAt: nowIso,
    updatedAt: nowIso,
    lastLoginAt: nowIso,
    progress: {
      completedTopicIds: [],
      quizScores: {},
      bugsSolvedIds: [],
      compilerRunsCount: 0,
      bookmarkedTopicIds: [],
      streakDays: 1,
      lastActiveDate: todayStr
    }
  };

  if (collection) {
    try {
      const insertResult = await collection.insertOne(newUserDoc);
      newUserDoc._id = insertResult.insertedId;
      console.log(`[MONGODB] ✅ Registered new user in database:`, newUserDoc.userId, newUserDoc.email);
    } catch (err: any) {
      console.warn('[MONGODB] Insert error, saving to local fallback:', err.message);
    }
  }

  // Save to local fallback store as well
  const locals = getLocalUsers();
  locals.push(newUserDoc);
  saveLocalUsers(locals);

  return { success: true, user: newUserDoc, isNewUser: true };
}

export async function getAllDatabaseUsers(): Promise<MongoUserDocument[]> {
  const collection = await getUsersCollection();
  if (collection) {
    try {
      const docs = await collection.find({}).sort({ createdAt: -1 }).toArray();
      if (docs && docs.length > 0) return docs;
    } catch (err) {
      console.warn('[MONGODB] Fetch all error:', err);
    }
  }
  return getLocalUsers();
}

export async function toggleUserBlockStatus(
  userIdOrPhone: string,
  isBlocked: boolean,
  reason?: string
): Promise<{ success: boolean; user?: MongoUserDocument; error?: string }> {
  const collection = await getUsersCollection();
  const cleanId = (userIdOrPhone || '').trim();
  const cleanDigits = cleanId.replace(/\D/g, '').slice(-10);
  const nowIso = new Date().toISOString();

  // Update in MongoDB
  if (collection) {
    try {
      const filter: any = {
        $or: [
          { userId: cleanId },
          { id: cleanId },
          ...(cleanDigits ? [{ phone: cleanDigits }] : [])
        ]
      };
      await collection.updateOne(filter, {
        $set: {
          isBlocked,
          blockedAt: isBlocked ? nowIso : undefined,
          blockedReason: isBlocked ? (reason || 'Blocked by Admin') : undefined,
          updatedAt: nowIso
        }
      });
    } catch (err: any) {
      console.warn('[MONGODB] toggleUserBlockStatus error:', err.message);
    }
  }

  // Update in local fallback
  const locals = getLocalUsers();
  const idx = locals.findIndex(
    u => u.userId === cleanId || (cleanDigits && u.phone === cleanDigits)
  );
  if (idx !== -1) {
    locals[idx].isBlocked = isBlocked;
    locals[idx].blockedAt = isBlocked ? nowIso : undefined;
    locals[idx].blockedReason = isBlocked ? (reason || 'Blocked by Admin') : undefined;
    locals[idx].updatedAt = nowIso;
    saveLocalUsers(locals);
    return { success: true, user: locals[idx] };
  }

  return { success: true };
}

export async function deleteMongoUser(userIdOrPhone: string): Promise<{ success: boolean }> {
  const collection = await getUsersCollection();
  const cleanId = (userIdOrPhone || '').trim();
  const cleanDigits = cleanId.replace(/\D/g, '').slice(-10);

  if (collection) {
    try {
      const filter: any = {
        $or: [
          { userId: cleanId },
          { id: cleanId },
          ...(cleanDigits ? [{ phone: cleanDigits }] : [])
        ]
      };
      await collection.deleteOne(filter);
    } catch (err: any) {
      console.warn('[MONGODB] deleteMongoUser error:', err.message);
    }
  }

  // Remove from local fallback
  const locals = getLocalUsers();
  const filtered = locals.filter(
    u => u.userId !== cleanId && (!cleanDigits || u.phone !== cleanDigits)
  );
  saveLocalUsers(filtered);
  return { success: true };
}

export async function updateUserSubscriptionInDb(
  userIdOrPhone: string,
  isSubscribed: boolean
): Promise<{ success: boolean }> {
  const collection = await getUsersCollection();
  const cleanId = (userIdOrPhone || '').trim();
  const cleanDigits = cleanId.replace(/\D/g, '').slice(-10);
  const nowIso = new Date().toISOString();

  if (collection) {
    try {
      const filter: any = {
        $or: [
          { userId: cleanId },
          { id: cleanId },
          ...(cleanDigits ? [{ phone: cleanDigits }] : [])
        ]
      };
      await collection.updateOne(filter, {
        $set: {
          isSubscribed,
          subscriptionPlan: isSubscribed ? 'Pro Lifetime' : 'Free Trial',
          updatedAt: nowIso
        }
      });
    } catch (err: any) {
      console.warn('[MONGODB] updateUserSubscriptionInDb error:', err.message);
    }
  }

  const locals = getLocalUsers();
  const idx = locals.findIndex(
    u => u.userId === cleanId || (cleanDigits && u.phone === cleanDigits)
  );
  if (idx !== -1) {
    locals[idx].isSubscribed = isSubscribed;
    locals[idx].subscriptionPlan = isSubscribed ? 'Pro Lifetime' : 'Free Trial';
    locals[idx].updatedAt = nowIso;
    saveLocalUsers(locals);
  }

  return { success: true };
}

export async function getUserDetails(userId: string): Promise<MongoUserDocument | null> {
  const collection = await getUsersCollection();
  const cleanId = (userId || '').trim();
  const cleanDigits = cleanId.replace(/\D/g, '').slice(-10);

  if (collection) {
    try {
      const doc = await collection.findOne({
        $or: [
          { userId: cleanId },
          { id: cleanId },
          ...(cleanDigits ? [{ phone: cleanDigits }] : [])
        ]
      });
      if (doc) return doc;
    } catch (err) {
      console.warn('[MONGODB] getUserDetails error:', err);
    }
  }

  const locals = getLocalUsers();
  return locals.find(u => u.userId === cleanId || (cleanDigits && u.phone === cleanDigits)) || null;
}

export async function syncAllUsersToMongo(): Promise<{ syncedCount: number; totalUsers: number }> {
  const collection = await getUsersCollection();
  const locals = getLocalUsers();

  if (!collection) {
    return { syncedCount: 0, totalUsers: locals.length };
  }

  let synced = 0;
  for (const user of locals) {
    try {
      await collection.updateOne(
        { $or: [{ userId: user.userId }, { phone: user.phone }, { email: user.email }] },
        { $set: user },
        { upsert: true }
      );
      synced++;
    } catch (err) {
      console.warn('[MONGODB] Sync user error:', err);
    }
  }

  const allInMongo = await collection.countDocuments();
  return { syncedCount: synced, totalUsers: allInMongo };
}

export async function getDatabaseStatus(): Promise<{
  connected: boolean;
  provider: 'mongodb' | 'local_fallback';
  totalUsers: number;
  activeUsers: number;
  blockedUsers: number;
  dbName: string;
  uriMasked: string;
  pingMs?: number;
  error?: string;
}> {
  const { isConnected, provider, pingMs, error } = await connectToDatabase();
  const all = await getAllDatabaseUsers();
  const effectiveUri = getEffectiveMongoUri();
  const dbName = getEffectiveDbName();

  const blockedCount = all.filter(u => u.isBlocked).length;
  const activeCount = all.filter(u => !u.isBlocked).length;

  return {
    connected: isConnected,
    provider,
    totalUsers: all.length,
    activeUsers: activeCount,
    blockedUsers: blockedCount,
    dbName,
    uriMasked: maskMongoUri(effectiveUri),
    pingMs,
    error
  };
}

export async function handleGoogleAuthUser(profile: {
  email: string;
  name: string;
  picture?: string;
  googleId?: string;
}): Promise<{ success: boolean; user?: MongoUserDocument; error?: string; isNewUser?: boolean }> {
  const cleanEmail = (profile.email || '').trim().toLowerCase();
  if (!cleanEmail) {
    return { success: false, error: 'Email is required for Google Sign-In.' };
  }

  const existing = await findUserByPhoneOrEmail('', cleanEmail);
  if (existing) {
    if (existing.isBlocked) {
      return {
        success: false,
        error: 'सुरक्षा अलर्ट: आपका खाता व्यवस्थापक (Admin) द्वारा ब्लॉक कर दिया गया है। एक्सेस प्रतिबंधित है।'
      };
    }
    // Update lastLoginAt
    const collection = await getUsersCollection();
    const nowIso = new Date().toISOString();
    if (collection) {
      try {
        await collection.updateOne(
          { userId: existing.userId },
          { $set: { lastLoginAt: nowIso, updatedAt: nowIso, ...(profile.picture ? { avatarSeed: profile.picture } : {}) } }
        );
      } catch (e) {
        console.warn('[MONGODB] Update google user error:', e);
      }
    }
    return {
      success: true,
      user: { ...existing, lastLoginAt: nowIso },
      isNewUser: false
    };
  }

  // Create new user in MongoDB
  const userId = `CGURU-G${Date.now().toString().slice(-4)}${Math.floor(1000 + Math.random() * 9000)}`;
  const nowIso = new Date().toISOString();
  const cleanName = (profile.name || cleanEmail.split('@')[0]).trim();
  const isAdmin = cleanEmail === 'kuldeep0203singh@gmail.com';

  const newUserDoc: MongoUserDocument = {
    userId,
    name: cleanName,
    email: cleanEmail,
    phone: '',
    role: isAdmin ? 'admin' : 'student',
    isAdmin,
    isSubscribed: isAdmin,
    subscriptionPlan: isAdmin ? '⭐ Lifetime Super Admin Pass' : 'Free Trial',
    course: 'Complete C Programming Masterclass',
    avatarSeed: profile.picture || cleanName.toLowerCase().replace(/\s+/g, '_'),
    createdAt: nowIso,
    updatedAt: nowIso,
    enrolledAt: nowIso,
    lastLoginAt: nowIso,
    isBlocked: false,
    progress: {
      completedTopicIds: [],
      quizScores: {},
      bugsSolvedIds: [],
      compilerRunsCount: 0,
      bookmarkedTopicIds: [],
      streakDays: 1,
      lastActiveDate: nowIso.split('T')[0]
    }
  };

  const collection = await getUsersCollection();
  if (collection) {
    try {
      const res = await collection.insertOne(newUserDoc);
      newUserDoc._id = res.insertedId;
      console.log(`[MONGODB] ✅ Registered Google User: ${newUserDoc.userId} (${newUserDoc.email})`);
    } catch (err: any) {
      console.warn('[MONGODB] Error inserting google user:', err);
    }
  }

  // Also save to local fallback
  const locals = getLocalUsers();
  locals.push(newUserDoc);
  saveLocalUsers(locals);

  return { success: true, user: newUserDoc, isNewUser: true };
}
