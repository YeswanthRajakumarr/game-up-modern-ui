import type { UserRole } from '../../shared/types';

// Define which routes are allowed for each role
export const ROLE_ROUTES: Record<UserRole, string[]> = {
  // ADMIN: Full system access - Users, Classes, Analytics (with AI), Calendar, Announcements, Messages, Notifications, Settings
  ADMIN: [
    '/users',
    '/classes',
    '/analytics',
    '/calendar',
    '/announcements',
    '/messages',
    '/notifications',
    '/settings',
  ],
  
  // TEACHER: Teaching tools - Dashboard, Tasks, Gradebook, Attendance, Leaderboard, Quizzes, Videos, Notes, Flashcards, Resources, Calendar, Announcements, Messages, Notifications, Settings
  TEACHER: [
    '/dashboard',
    '/tasks',
    '/gradebook',
    '/attendance',
    '/leaderboard',
    '/quizzes',
    '/videos',
    '/notes',
    '/flashcards',
    '/resources',
    '/calendar',
    '/announcements',
    '/messages',
    '/notifications',
    '/settings',
  ],
  
  // STUDENT: Learning features - Tasks, Leaderboard, Rewards, Performance, Gamification (Badges, Streaks, Challenges, XP), Teams, Study Groups, Quizzes, Videos, Notes, Learning Analytics, Tournaments, Peer Review, Flashcards, Calendar, Announcements, Resources, Reports, Messages, Notifications, Profile, Settings
  STUDENT: [
    '/tasks',
    '/leaderboard',
    '/rewards',
    '/performance',
    '/badges',
    '/streaks',
    '/challenges',
    '/xp-history',
    '/teams',
    '/study-groups',
    '/quizzes',
    '/videos',
    '/notes',
    '/learning-analytics',
    '/tournaments',
    '/peer-review',
    '/flashcards',
    '/calendar',
    '/announcements',
    '/resources',
    '/reports',
    '/messages',
    '/notifications',
    '/profile',
    '/settings',
  ],
  
  // PARENT: Child monitoring - Parent Portal, Child Tasks, Performance, Rewards, Calendar, Announcements, Reports, Messages, Notifications, Settings
  PARENT: [
    '/parent-portal',
    '/tasks',
    '/performance',
    '/rewards',
    '/calendar',
    '/announcements',
    '/reports',
    '/messages',
    '/notifications',
    '/settings',
  ],
};

// Get the default route for a role (first route in the list)
export const getDefaultRoute = (role: UserRole): string => {
  const routes = ROLE_ROUTES[role];
  return routes[0] || '/dashboard';
};

// Check if a route is allowed for a role
export const isRouteAllowed = (role: UserRole, path: string): boolean => {
  const allowedRoutes = ROLE_ROUTES[role];
  return allowedRoutes.includes(path) || path === '/';
};

