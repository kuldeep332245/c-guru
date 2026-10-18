import { User, UserProgress } from '../types';
import { C_TOPICS, MILESTONES } from '../data/cTopics';
import { validateRealEmail } from './emailValidator';

const STORAGE_USERS_KEY = 'cguru_users_db';
const STORAGE_ACTIVE_USER_KEY = 'cguru_active_user_session';
const STORAGE_PROGRESS_PREFIX = 'cguru_progress_';

export const ADMIN_USER: User = {
  id: 'admin_kuldeep',
  name: 'Kuldeep Singh (Admin)',
  phone: '9876543210',
  email: 'kuldeep0203singh@gmail.com',
  password: 'admin123',
  course: 'Complete C Programming Masterclass',
  avatarSeed: 'admin_kuldeep',
  createdAt: '2026-10-01',
  goal: 'Master Administrator - Full Course & Platform Control',
  role: 'admin',
  isAdmin: true,
  isSubscribed: true,
  subscribedAt: '2026-10-01T00:00:00.000Z',
  subscriptionExpiresAt: '2099-12-31T23:59:59.000Z',
  subscriptionPlan: '⭐ Lifetime Super Admin Pass (All Courses Unlocked)',
  transactionId: 'TXN_SUPERADMIN_LIFETIME'
};

const STORAGE_ADMIN_TOKEN_KEY = 'cguru_admin_secret_token';
export const DEFAULT_ADMIN_TOKEN = 'CGURU_SUPER_ADMIN_SECURE_TOKEN_2026';

export function getSavedAdminToken(): string {
  try {
    return localStorage.getItem(STORAGE_ADMIN_TOKEN_KEY) || DEFAULT_ADMIN_TOKEN;
  } catch {
    return DEFAULT_ADMIN_TOKEN;
  }
}

export function saveAdminToken(token: string): void {
  try {
    localStorage.setItem(STORAGE_ADMIN_TOKEN_KEY, token.trim());
  } catch {}
}

const DEFAULT_DEMO_USER: User = {
  id: 'user_kuldeep_demo',
  name: 'Kuldeep Singh',
  phone: '9876543210',
  email: 'kuldeep0203singh@gmail.com',
  avatarSeed: 'kuldeep',
  createdAt: '2026-10-01',
  goal: 'Master C from scratch to advanced file handling and cracking coding tests',
  role: 'admin',
  isAdmin: true,
  isSubscribed: true,
  subscribedAt: '2026-10-01T00:00:00.000Z',
  subscriptionExpiresAt: '2099-12-31T23:59:59.000Z',
  subscriptionPlan: '⭐ Lifetime Super Admin Pass (All Features Unlocked)'
};

const DEFAULT_PROGRESS: UserProgress = {
  completedTopicIds: ['program-structure'],
  quizScores: {
    'program-structure': { score: 40, total: 40, percentage: 100, date: '2026-10-01' }
  },
  bugsSolvedIds: [],
  compilerRunsCount: 2,
  bookmarkedTopicIds: [],
  streakDays: 3,
  lastActiveDate: new Date().toISOString().split('T')[0],
  milestonesUnlocked: []
};

export function cleanPhone(phone: string): string {
  // Strip non-digits and strip leading 91 if 12 digits
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) {
    return digits.slice(2);
  }
  if (digits.length > 10) {
    return digits.slice(-10);
  }
  return digits;
}

export function getAllUsers(): User[] {
  try {
    const raw = localStorage.getItem(STORAGE_USERS_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify([DEFAULT_DEMO_USER]));
      return [DEFAULT_DEMO_USER];
    }
    const list: User[] = JSON.parse(raw);
    return list;
  } catch {
    return [DEFAULT_DEMO_USER];
  }
}

export function getActiveUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_ACTIVE_USER_KEY);
    if (!raw) {
      return null;
    }
    const parsed: User = JSON.parse(raw);
    return parsed;
  } catch {
    return null;
  }
}

export function registerUserWithCredentials(data: {
  name: string;
  email: string;
  phone: string;
  password: string;
  course: string;
}): { success: boolean; user?: User; error?: string } {
  try {
    const users = getAllUsers();
    const cleanP = cleanPhone(data.phone);
    // Strict Real Email Check
    const emailCheck = validateRealEmail(data.email, 'hi');
    if (!emailCheck.isValid) {
      return {
        success: false,
        error: emailCheck.error || 'कृपया सही ईमेल आईडी दर्ज करें।'
      };
    }
    const cleanEmail = emailCheck.cleanedEmail || data.email.trim().toLowerCase();
    const cleanPassword = data.password.trim();

    // Check if phone or email already registered
    const existingIndex = users.findIndex(
      u => (u.email && u.email.trim().toLowerCase() === cleanEmail) || (cleanPhone(u.phone) === cleanP && cleanP.length >= 8)
    );

    if (existingIndex !== -1) {
      // User is already registered once. No need to re-register.
      const existingUser = users[existingIndex];
      return {
        success: false,
        error: 'This Gmail is already registered! Please Sign In using your Gmail and Password.',
        user: existingUser
      };
    }

    const newUser: User = {
      id: `user_${Date.now()}`,
      name: data.name.trim(),
      email: cleanEmail,
      phone: cleanP,
      password: cleanPassword,
      course: data.course,
      avatarSeed: data.name.toLowerCase().replace(/\s+/g, '_'),
      createdAt: new Date().toISOString().split('T')[0],
      role: 'student',
      isAdmin: false,
      isSubscribed: false,
      subscriptionPlan: 'Free Trial'
    };

    users.push(newUser);
    saveAllUsers(users);
    setActiveUser(newUser);

    // Initialize progress for this user
    saveUserProgress(newUser.id, {
      completedTopicIds: [],
      quizScores: {},
      bugsSolvedIds: [],
      compilerRunsCount: 0,
      bookmarkedTopicIds: [],
      streakDays: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      milestonesUnlocked: []
    });

    return { success: true, user: newUser };
  } catch (err) {
    return { success: false, error: 'Registration failed. Please try again.' };
  }
}

export function loginUserWithCredentials(
  identifier: string,
  password: string
): { success: boolean; user?: User; error?: string } {
  try {
    const cleanId = identifier.trim().toLowerCase();
    const cleanP = cleanPhone(identifier);
    const inputPass = password.trim();

    const users = getAllUsers();
    const user = users.find(u => {
      const matchesEmail = u.email && u.email.trim().toLowerCase() === cleanId;
      const matchesPhone = cleanPhone(u.phone) === cleanP && cleanP.length >= 8;
      const matchesName = u.name && u.name.trim().toLowerCase() === cleanId;
      const matchesId = u.id && u.id.trim().toLowerCase() === cleanId;
      return matchesEmail || matchesPhone || matchesName || matchesId;
    });

    if (user) {
      if (user.isBlocked) {
        return {
          success: false,
          error: 'सुरक्षा अलर्ट: आपका खाता व्यवस्थापक (Admin) द्वारा ब्लॉक कर दिया गया है। एक्सेस प्रतिबंधित है।'
        };
      }

      // If user has a password, compare (case-sensitive or trimmed)
      if (user.password) {
        if (user.password.trim() !== inputPass) {
          return { success: false, error: 'Incorrect password entered. Please check your password.' };
        }
      } else {
        // If account had no password yet, set the password and save
        user.password = inputPass;
        saveAllUsers(users);
      }
      setActiveUser(user);
      return { success: true, user };
    }

    // Check Admin login override if not in registered database
    if (
      (cleanId === 'admin' || cleanId === 'kuldeep0203singh@gmail.com' || cleanId === '9876543210') &&
      (inputPass === 'admin' || inputPass === 'admin123' || inputPass === '123456')
    ) {
      const admin = loginAsAdmin();
      return { success: true, user: admin };
    }

    return { success: false, error: 'No account found with this Gmail / Mobile. Please register first.' };
  } catch (err) {
    return { success: false, error: 'Login failed. Please try again.' };
  }
}

export function isPhoneRegistered(phone: string): boolean {
  try {
    const cleanP = cleanPhone(phone);
    if (!cleanP || cleanP.length < 8) return false;
    if (cleanP === '9876543210') return true; // Master admin number
    const users = getAllUsers();
    return users.some(u => cleanPhone(u.phone) === cleanP);
  } catch {
    return false;
  }
}

export function loginUserWithPhoneOtp(
  phone: string
): { success: boolean; user?: User; error?: string } {
  try {
    const cleanP = cleanPhone(phone);
    if (cleanP.length < 10) {
      return { success: false, error: 'Please enter a valid 10-digit mobile number.' };
    }

    const users = getAllUsers();
    const user = users.find(u => cleanPhone(u.phone) === cleanP);

    if (user) {
      if (user.isBlocked) {
        return {
          success: false,
          error: 'सुरक्षा अलर्ट: आपका खाता व्यवस्थापक (Admin) द्वारा ब्लॉक कर दिया गया है। एक्सेस प्रतिबंधित है।'
        };
      }
      setActiveUser(user);
      return { success: true, user };
    }

    // Admin override check
    if (cleanP === '9876543210') {
      const admin = loginAsAdmin();
      return { success: true, user: admin };
    }

    // Number is NOT registered! Return error as explicitly requested by user
    return {
      success: false,
      error: 'Number is not registered'
    };
  } catch (err: any) {
    return { success: false, error: err.message || 'Login failed.' };
  }
}

export function registerUserWithPhoneOtp(
  phone: string,
  extraData: { name: string; email: string; course?: string; password?: string }
): { success: boolean; user?: User; error?: string } {
  try {
    const cleanP = cleanPhone(phone);
    if (cleanP.length < 10) {
      return { success: false, error: 'Please enter a valid 10-digit mobile number.' };
    }

    const users = getAllUsers();
    const existing = users.find(u => cleanPhone(u.phone) === cleanP);
    if (existing) {
      return {
        success: false,
        error: 'This mobile number is already registered! Please switch to Login tab.',
        user: existing
      };
    }

    const emailVal = validateRealEmail(extraData.email, 'hi');
    if (!emailVal.isValid) {
      return {
        success: false,
        error: emailVal.error || 'कृपया सही ईमेल आईडी दर्ज करें।'
      };
    }
    const cleanEmail = emailVal.cleanedEmail || extraData.email.trim().toLowerCase();
    const cleanName = extraData.name.trim() || `Student ${cleanP.slice(-4)}`;
    const cleanCourse = extraData.course || 'Complete C Programming Masterclass';

    const userId = `CGURU-U${Date.now().toString().slice(-4)}${Math.floor(1000 + Math.random() * 9000)}`;

    const newUser: User = {
      id: userId,
      name: cleanName,
      email: cleanEmail,
      phone: cleanP,
      password: extraData.password?.trim() || '',
      course: cleanCourse,
      avatarSeed: cleanName.toLowerCase().replace(/\s+/g, '_'),
      createdAt: new Date().toISOString().split('T')[0],
      role: (cleanP === '9876543210' || cleanEmail === 'kuldeep0203singh@gmail.com') ? 'admin' : 'student',
      isAdmin: (cleanP === '9876543210' || cleanEmail === 'kuldeep0203singh@gmail.com'),
      isSubscribed: false,
      subscriptionPlan: 'Free Trial'
    };

    users.push(newUser);
    saveAllUsers(users);
    setActiveUser(newUser);

    // Asynchronously sync with MongoDB database backend
    try {
      fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          phone: cleanP,
          password: extraData.password?.trim() || '',
          course: cleanCourse,
          role: newUser.role
        })
      }).catch(() => {});
    } catch {}

    saveUserProgress(newUser.id, {
      completedTopicIds: [],
      quizScores: {},
      bugsSolvedIds: [],
      compilerRunsCount: 0,
      bookmarkedTopicIds: [],
      streakDays: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      milestonesUnlocked: []
    });

    return { success: true, user: newUser };
  } catch (err: any) {
    return { success: false, error: err.message || 'Registration failed.' };
  }
}

export function loginOrRegisterWithPhoneOtp(
  phone: string,
  extraData?: { name?: string; email?: string; course?: string; password?: string }
): { success: boolean; user?: User; error?: string } {
  try {
    const cleanP = cleanPhone(phone);
    if (cleanP.length < 10) {
      return { success: false, error: 'Please enter a valid 10-digit mobile number.' };
    }

    const users = getAllUsers();
    let user = users.find(u => cleanPhone(u.phone) === cleanP);

    if (user) {
      if (user.isBlocked) {
        return {
          success: false,
          error: 'सुरक्षा अलर्ट: आपका खाता व्यवस्थापक (Admin) द्वारा ब्लॉक कर दिया गया है। एक्सेस प्रतिबंधित है।'
        };
      }
      // User exists, update if extra details provided
      if (extraData?.name && (!user.name || user.name.startsWith('Student'))) {
        user.name = extraData.name.trim();
      }
      if (extraData?.email && (!user.email || user.email.includes('@cguru.app'))) {
        user.email = extraData.email.trim();
      }
      if (extraData?.course && !user.course) {
        user.course = extraData.course;
      }
      saveAllUsers(users);
      setActiveUser(user);
      return { success: true, user };
    }

    // New User registration via OTP
    const cleanName = extraData?.name?.trim() || `Student ${cleanP.slice(-4)}`;
    const cleanEmail = extraData?.email?.trim().toLowerCase() || `${cleanP}@cguru.app`;
    const cleanCourse = extraData?.course || 'Complete C Programming Masterclass (Zero to Hero)';

    const newUser: User = {
      id: `user_${Date.now()}`,
      name: cleanName,
      email: cleanEmail,
      phone: cleanP,
      password: extraData?.password?.trim() || '',
      course: cleanCourse,
      avatarSeed: cleanName.toLowerCase().replace(/\s+/g, '_'),
      createdAt: new Date().toISOString().split('T')[0],
      role: (cleanP === '9876543210' || cleanEmail === 'kuldeep0203singh@gmail.com') ? 'admin' : 'student',
      isAdmin: (cleanP === '9876543210' || cleanEmail === 'kuldeep0203singh@gmail.com'),
      isSubscribed: false,
      subscriptionPlan: 'Free Trial'
    };

    users.push(newUser);
    saveAllUsers(users);
    setActiveUser(newUser);

    saveUserProgress(newUser.id, {
      completedTopicIds: [],
      quizScores: {},
      bugsSolvedIds: [],
      compilerRunsCount: 0,
      bookmarkedTopicIds: [],
      streakDays: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      milestonesUnlocked: []
    });

    return { success: true, user: newUser };
  } catch (err: any) {
    return { success: false, error: err.message || 'Authentication error.' };
  }
}

export function loginOrRegisterWithGoogleUser(userData: {
  id?: string;
  userId?: string;
  name: string;
  email: string;
  phone?: string;
  avatarSeed?: string;
  role?: 'student' | 'admin';
  isAdmin?: boolean;
  isSubscribed?: boolean;
  isBlocked?: boolean;
  course?: string;
}): { success: boolean; user?: User; error?: string } {
  try {
    const cleanEmail = userData.email.trim().toLowerCase();
    const users = getAllUsers();
    let user = users.find(u => (u.email || '').toLowerCase() === cleanEmail);

    if (user && user.isBlocked) {
      return {
        success: false,
        error: 'सुरक्षा अलर्ट: आपका खाता व्यवस्थापक (Admin) द्वारा ब्लॉक कर दिया गया है। एक्सेस प्रतिबंधित है।'
      };
    }

    if (!user) {
      const isAdmin = cleanEmail === 'kuldeep0203singh@gmail.com' || userData.isAdmin;
      user = {
        id: userData.id || userData.userId || `CGURU-G${Date.now().toString().slice(-4)}${Math.floor(1000 + Math.random() * 9000)}`,
        name: userData.name || cleanEmail.split('@')[0],
        email: cleanEmail,
        phone: userData.phone || '',
        avatarSeed: userData.avatarSeed || userData.name.toLowerCase().replace(/\s+/g, '_'),
        course: userData.course || 'Complete C Programming Masterclass',
        createdAt: new Date().toISOString().split('T')[0],
        role: isAdmin ? 'admin' : 'student',
        isAdmin: Boolean(isAdmin),
        isSubscribed: Boolean(isAdmin || userData.isSubscribed),
        subscriptionPlan: isAdmin ? '⭐ Lifetime Super Admin Pass' : 'Free Trial'
      };
      users.push(user);
      saveAllUsers(users);
    } else {
      if (userData.name) user.name = userData.name;
      if (userData.avatarSeed) user.avatarSeed = userData.avatarSeed;
      if (userData.id && !user.id) user.id = userData.id;
      saveAllUsers(users);
    }

    setActiveUser(user);
    return { success: true, user };
  } catch (err: any) {
    return { success: false, error: err.message || 'Google authentication failed' };
  }
}

export function setActiveUser(user: User | null): void {
  try {
    if (!user) {
      localStorage.removeItem(STORAGE_ACTIVE_USER_KEY);
    } else {
      localStorage.setItem(STORAGE_ACTIVE_USER_KEY, JSON.stringify(user));
    }
  } catch (err) {
    console.error('Failed to set active user:', err);
  }
}

export function isUserSubscribed(_user?: User | null): boolean {
  // Full Lifetime Access for all students
  return true;
}

export function loginAsAdmin(): User {
  const users = getAllUsers();
  const existingIdx = users.findIndex(u => u.id === ADMIN_USER.id || cleanPhone(u.phone) === cleanPhone(ADMIN_USER.phone));
  let admin: User;
  if (existingIdx !== -1) {
    admin = {
      ...users[existingIdx],
      ...ADMIN_USER,
      isAdmin: true,
      role: 'admin',
      isSubscribed: true
    };
    users[existingIdx] = admin;
  } else {
    admin = { ...ADMIN_USER };
    users.unshift(admin);
  }
  localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
  setActiveUser(admin);
  return admin;
}

export function saveAllUsers(users: User[]): void {
  try {
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
  } catch (err) {
    console.error('Failed to save users:', err);
  }
}

export function toggleUserSubscription(userId: string, grant: boolean): User | null {
  const users = getAllUsers();
  const idx = users.findIndex(u => u.id === userId);
  if (idx === -1) return null;
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);

  users[idx] = {
    ...users[idx],
    isSubscribed: grant,
    subscribedAt: grant ? now.toISOString() : undefined,
    subscriptionExpiresAt: grant ? expiresAt.toISOString() : undefined,
    subscriptionPlan: grant ? '12 Months All-Access (Granted by Admin)' : 'Free Trial'
  };

  saveAllUsers(users);
  const active = getActiveUser();
  if (active && active.id === userId) {
    setActiveUser(users[idx]);
  }

  // Sync with MongoDB backend
  fetch('/api/admin/users/subscription', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-token': getSavedAdminToken()
    },
    body: JSON.stringify({ userId, isSubscribed: grant })
  }).catch(() => {});

  return users[idx];
}

export function toggleBlockUser(userId: string, block: boolean, reason?: string): { success: boolean; users: User[] } {
  const users = getAllUsers();
  const updated = users.map(u => {
    if (u.id === userId || u.phone === userId) {
      return {
        ...u,
        isBlocked: block,
        blockedAt: block ? new Date().toISOString() : undefined,
        blockedReason: block ? (reason || 'Admin block') : undefined
      };
    }
    return u;
  });

  saveAllUsers(updated);

  // If the currently active user is the one being blocked, log them out
  const active = getActiveUser();
  if (active && (active.id === userId || active.phone === userId) && block) {
    localStorage.removeItem(STORAGE_ACTIVE_USER_KEY);
  }

  // Sync with MongoDB backend
  fetch('/api/admin/users/block', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-token': getSavedAdminToken()
    },
    body: JSON.stringify({ userId, isBlocked: block, reason })
  }).catch(() => {});

  return { success: true, users: updated };
}

export function deleteUser(userId: string): boolean {
  if (userId === ADMIN_USER.id || userId === 'user_kuldeep_demo') return false;
  const users = getAllUsers();
  const filtered = users.filter(u => u.id !== userId);
  saveAllUsers(filtered);

  // Sync with MongoDB backend
  fetch('/api/admin/users/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-token': getSavedAdminToken()
    },
    body: JSON.stringify({ userId })
  }).catch(() => {});

  return true;
}

export async function fetchRemoteUsers(): Promise<User[]> {
  try {
    const res = await fetch('/api/admin/users', {
      headers: {
        'x-admin-token': getSavedAdminToken()
      }
    });
    if (!res.ok) return getAllUsers();
    const data = await res.json();
    if (data.success && Array.isArray(data.users)) {
      const currentLocals = getAllUsers();
      const localMap = new Map(currentLocals.map(u => [u.id, u]));

      // Merge remote MongoDB users into local cache
      const merged: User[] = data.users.map((dbUser: any) => {
        const id = dbUser.userId || dbUser.id || `user_${dbUser.phone}`;
        const existing = localMap.get(id);
        return {
          id,
          name: dbUser.name,
          email: dbUser.email,
          phone: dbUser.phone,
          role: dbUser.role || (dbUser.isAdmin ? 'admin' : 'student'),
          isAdmin: Boolean(dbUser.isAdmin),
          isSubscribed: Boolean(dbUser.isSubscribed),
          isBlocked: Boolean(dbUser.isBlocked),
          blockedAt: dbUser.blockedAt,
          blockedReason: dbUser.blockedReason,
          course: dbUser.course || 'Complete C Programming Masterclass',
          createdAt: dbUser.createdAt ? dbUser.createdAt.split('T')[0] : (existing?.createdAt || '2026-04-01'),
          avatarSeed: dbUser.avatarSeed || existing?.avatarSeed || 'student'
        };
      });

      // Also preserve any local users not in db
      currentLocals.forEach(loc => {
        if (!merged.some(m => m.id === loc.id || (loc.phone && m.phone === loc.phone))) {
          merged.push(loc);
        }
      });

      saveAllUsers(merged);
      return merged;
    }
  } catch {}
  return getAllUsers();
}

export async function getDatabaseStatusApi(): Promise<{
  connected: boolean;
  provider: 'mongodb' | 'local_fallback';
  totalUsers: number;
  activeUsers: number;
  blockedUsers: number;
  dbName: string;
  uriMasked: string;
  pingMs?: number;
  error?: string;
} | null> {
  try {
    const res = await fetch('/api/database/status');
    const data = await res.json();
    if (data.success && data.database) {
      return data.database;
    }
  } catch {}
  return null;
}

export async function connectMongoDatabaseApi(
  uri: string,
  dbName: string = 'cguru_database'
): Promise<{ success: boolean; message: string; pingMs?: number; syncedUsers?: number; error?: string }> {
  try {
    const res = await fetch('/api/database/connect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uri, dbName })
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      return { success: false, message: data.error || 'Connection failed' };
    }
    return {
      success: true,
      message: data.message,
      pingMs: data.pingMs,
      syncedUsers: data.syncedUsers
    };
  } catch (err: any) {
    return { success: false, message: err.message || 'Network request failed' };
  }
}

export async function fetchSingleUserMongoDetail(userId: string): Promise<any | null> {
  try {
    const res = await fetch(`/api/admin/users/detail/${encodeURIComponent(userId)}`);
    const data = await res.json();
    if (data.success && data.user) {
      return data.user;
    }
  } catch {}
  return null;
}

export async function syncUsersToMongoApi(): Promise<{ success: boolean; message: string; totalUsers?: number }> {
  try {
    const res = await fetch('/api/admin/users/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    return {
      success: Boolean(data.success),
      message: data.message || 'Sync completed',
      totalUsers: data.totalUsers
    };
  } catch (err: any) {
    return { success: false, message: err.message || 'Sync failed' };
  }
}

export function findUserByPhone(phone: string): User | null {
  const normalized = cleanPhone(phone);
  if (!normalized) return null;
  const users = getAllUsers();
  return users.find(u => cleanPhone(u.phone) === normalized) || null;
}

export function registerUserWithPhone(name: string, phone: string, email?: string, goal?: string): User {
  const users = getAllUsers();
  const normalizedPhone = cleanPhone(phone);
  const existing = users.find(u => cleanPhone(u.phone) === normalizedPhone);
  
  if (existing) {
    setActiveUser(existing);
    return existing;
  }

  const newUser: User = {
    id: `user_${Date.now()}`,
    name: name.trim(),
    phone: normalizedPhone,
    email: email?.trim() || `${normalizedPhone}@cguru.student`,
    avatarSeed: name.toLowerCase().replace(/\s+/g, '_'),
    createdAt: new Date().toISOString().split('T')[0],
    goal: goal || 'Master C Programming from Scratch to Advanced',
    isSubscribed: false,
    subscriptionPlan: 'Free Trial (Sample Chapter)'
  };

  users.push(newUser);
  localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
  setActiveUser(newUser);

  // Initialize progress for this user
  saveUserProgress(newUser.id, {
    completedTopicIds: [],
    quizScores: {},
    bugsSolvedIds: [],
    compilerRunsCount: 0,
    bookmarkedTopicIds: [],
    streakDays: 1,
    lastActiveDate: new Date().toISOString().split('T')[0],
    milestonesUnlocked: []
  });

  return newUser;
}

export function loginUserWithPhone(phone: string): User | null {
  const found = findUserByPhone(phone);
  if (found) {
    setActiveUser(found);
    return found;
  }
  return null;
}

export function subscribeUser(userId: string, transactionId?: string): User | null {
  const users = getAllUsers();
  const idx = users.findIndex(u => u.id === userId);
  const now = new Date();
  // 12 Months = 365 Days
  const expiresAt = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);

  const txn = transactionId || `TXN_CGURU_${Date.now().toString().slice(-8)}`;

  if (idx !== -1) {
    users[idx] = {
      ...users[idx],
      isSubscribed: true,
      subscribedAt: now.toISOString(),
      subscriptionExpiresAt: expiresAt.toISOString(),
      subscriptionPlan: '12 Months All-Access (₹200)',
      transactionId: txn
    };
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
    setActiveUser(users[idx]);
    return users[idx];
  } else {
    // Check if active user matches
    const active = getActiveUser();
    if (active && active.id === userId) {
      const updated: User = {
        ...active,
        isSubscribed: true,
        subscribedAt: now.toISOString(),
        subscriptionExpiresAt: expiresAt.toISOString(),
        subscriptionPlan: '12 Months All-Access (₹200)',
        transactionId: txn
      };
      setActiveUser(updated);
      return updated;
    }
  }
  return null;
}

export function registerUser(name: string, email: string, goal?: string): User {
  return registerUserWithPhone(name, '9876543210', email, goal);
}

export function loginUser(email: string): User | null {
  const users = getAllUsers();
  const found = users.find(u => u.email?.toLowerCase() === email.toLowerCase());
  if (found) {
    setActiveUser(found);
    return found;
  }
  return null;
}

export function getUserProgress(userId: string): UserProgress {
  try {
    const raw = localStorage.getItem(`${STORAGE_PROGRESS_PREFIX}${userId}`);
    if (!raw) {
      if (userId === DEFAULT_DEMO_USER.id) {
        saveUserProgress(userId, DEFAULT_PROGRESS);
        return DEFAULT_PROGRESS;
      }
      const initial: UserProgress = {
        completedTopicIds: [],
        quizScores: {},
        bugsSolvedIds: [],
        compilerRunsCount: 0,
        bookmarkedTopicIds: [],
        streakDays: 1,
        lastActiveDate: new Date().toISOString().split('T')[0],
        milestonesUnlocked: []
      };
      saveUserProgress(userId, initial);
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function saveUserProgress(userId: string, progress: UserProgress): void {
  try {
    // Check milestones automatically
    const totalTopics = C_TOPICS.length;
    const progressPercent = Math.round((progress.completedTopicIds.length / totalTopics) * 100);

    const unlocked = [...progress.milestonesUnlocked];
    for (const m of MILESTONES) {
      if (progressPercent >= m.requiredProgress && !unlocked.includes(m.id)) {
        unlocked.push(m.id);
      }
    }
    progress.milestonesUnlocked = unlocked;

    localStorage.setItem(`${STORAGE_PROGRESS_PREFIX}${userId}`, JSON.stringify(progress));
  } catch (err) {
    console.error('Failed to save progress:', err);
  }
}
