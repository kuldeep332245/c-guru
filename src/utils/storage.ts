import { User, UserProgress } from '../types';
import { C_TOPICS, MILESTONES } from '../data/cTopics';

const STORAGE_USERS_KEY = 'cguru_users_db';
const STORAGE_ACTIVE_USER_KEY = 'cguru_active_user_session';
const STORAGE_PROGRESS_PREFIX = 'cguru_progress_';

const DEFAULT_DEMO_USER: User = {
  id: 'user_kuldeep_demo',
  name: 'Kuldeep Singh',
  email: 'kuldeep0203singh@gmail.com',
  avatarSeed: 'kuldeep',
  createdAt: '2026-10-01',
  goal: 'Master C from scratch to advanced file handling and cracking coding tests'
};

const DEFAULT_PROGRESS: UserProgress = {
  completedTopicIds: ['c-intro', 'variables-datatypes'],
  quizScores: {
    'c-intro': { score: 3, total: 3, percentage: 100, date: '2026-10-01' },
    'variables-datatypes': { score: 2, total: 3, percentage: 67, date: '2026-10-02' }
  },
  bugsSolvedIds: ['bug-1'],
  compilerRunsCount: 5,
  bookmarkedTopicIds: ['pointers', 'file-handling'],
  streakDays: 3,
  lastActiveDate: new Date().toISOString().split('T')[0],
  milestonesUnlocked: ['m1']
};

export function getAllUsers(): User[] {
  try {
    const raw = localStorage.getItem(STORAGE_USERS_KEY);
    if (!raw) {
      // Seed default user
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify([DEFAULT_DEMO_USER]));
      return [DEFAULT_DEMO_USER];
    }
    return JSON.parse(raw);
  } catch {
    return [DEFAULT_DEMO_USER];
  }
}

export function getActiveUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_ACTIVE_USER_KEY);
    if (!raw) {
      // Auto-login demo user for immediate access
      setActiveUser(DEFAULT_DEMO_USER);
      return DEFAULT_DEMO_USER;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_DEMO_USER;
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

export function registerUser(name: string, email: string, goal?: string): User {
  const users = getAllUsers();
  const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    setActiveUser(existing);
    return existing;
  }

  const newUser: User = {
    id: `user_${Date.now()}`,
    name,
    email,
    avatarSeed: name.toLowerCase().replace(/\s+/g, '_'),
    createdAt: new Date().toISOString().split('T')[0],
    goal: goal || 'Learn C Programming'
  };

  users.push(newUser);
  localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
  setActiveUser(newUser);

  // Initialize progress
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

export function loginUser(email: string): User | null {
  const users = getAllUsers();
  const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
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
