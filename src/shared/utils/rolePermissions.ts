import type { UserRole } from '../../shared/types';

// Define which routes are allowed for each role
export const ROLE_ROUTES: Record<UserRole, string[]> = {
  ADMIN: ['/users', '/classes', '/analytics', '/calendar', '/announcements', '/settings', '/dashboard'],
  TEACHER: ['/dashboard', '/tasks', '/leaderboard', '/gradebook', '/attendance', '/calendar', '/announcements', '/resources', '/settings'],
  STUDENT: ['/tasks', '/leaderboard', '/rewards', '/performance', '/calendar', '/announcements', '/resources', '/reports', '/badges', '/streaks', '/challenges', '/xp-history', '/settings'],
  PARENT: ['/tasks', '/performance', '/rewards', '/calendar', '/announcements', '/reports', '/settings'],
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

