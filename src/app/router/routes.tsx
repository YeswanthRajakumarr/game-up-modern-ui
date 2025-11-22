import React from 'react';
import { createRouter, createRoute, createRootRoute, Outlet, redirect, useNavigate } from '@tanstack/react-router';
import { MainLayout } from '../layout/MainLayout';
import { LoginPage } from '../modules/auth/LoginPage';
import { DashboardPage } from '../modules/dashboard/DashboardPage';
import { TasksPage } from '../modules/tasks/TasksPage';
import { LeaderboardPage } from '../modules/leaderboard/LeaderboardPage';
import { RewardsPage } from '../modules/rewards/RewardsPage';
import { PerformancePage } from '../modules/performance/PerformancePage';
import { SettingsPage } from '../modules/settings/SettingsPage';
import { UsersPage, ClassesPage, AnalyticsPage } from '../modules/admin/AdminSubPages';
import { CalendarPage } from '../modules/calendar/CalendarPage';
import { AnnouncementsPage } from '../modules/announcements/AnnouncementsPage';
import { GradebookPage } from '../modules/gradebook/GradebookPage';
import { AttendancePage } from '../modules/attendance/AttendancePage';
import { ResourcesPage } from '../modules/resources/ResourcesPage';
import { ReportsPage } from '../modules/reports/ReportsPage';
import { BadgesPage } from '../modules/badges/BadgesPage';
import { StreaksPage } from '../modules/streaks/StreaksPage';
import { ChallengesPage } from '../modules/challenges/ChallengesPage';
import { XPHistoryPage } from '../modules/xp-history/XPHistoryPage';
import { MessagesPage } from '../modules/messages/MessagesPage';
import { QuizzesPage } from '../modules/quizzes/QuizzesPage';
import { NotificationsPage } from '../modules/notifications/NotificationsPage';
import { TeamsPage } from '../modules/teams/TeamsPage';
import { StudyGroupsPage } from '../modules/study-groups/StudyGroupsPage';
import { VideoLessonsPage } from '../modules/videos/VideoLessonsPage';
import { ParentPortalPage } from '../modules/parent-portal/ParentPortalPage';
import { NotesPage } from '../modules/notes/NotesPage';
import { LearningAnalyticsPage } from '../modules/analytics/LearningAnalyticsPage';
import { TournamentsPage } from '../modules/tournaments/TournamentsPage';
import { PeerReviewPage } from '../modules/peer-review/PeerReviewPage';
import { FlashcardsPage } from '../modules/flashcards/FlashcardsPage';
import { StudentProfilePage } from '../modules/profile/StudentProfilePage';
import { useAuth } from '../global-context/AuthContext';
import { ProtectedRoute } from '../../shared/components/ProtectedRoute';
import { getDefaultRoute, isRouteAllowed } from '../../shared/utils/rolePermissions';

// Root route with context
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

// Public Routes
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
});

// Authenticated Layout Route
const authLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'auth-layout',
  component: () => {
    const { user, isLoading } = useAuth();
    const navigate = useNavigate();
    
    React.useEffect(() => {
        if (!isLoading && !user) {
            navigate({ to: '/login' });
        }
    }, [user, isLoading, navigate]);

    if (isLoading) return <div className="flex items-center justify-center h-screen text-slate-500">Loading...</div>;
    
    if (!user) return null; 

    return <MainLayout />;
  },
});

// Protected Routes with Role-based Access Control
const dashboardRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: '/',
  component: () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    
    React.useEffect(() => {
      if (user) {
        const defaultRoute = getDefaultRoute(user.role);
        navigate({ to: defaultRoute });
      }
    }, [user, navigate]);
    
    return <div className="flex items-center justify-center h-screen text-slate-500">Redirecting...</div>;
  }
});

const dashboardExplicitRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: '/dashboard',
  component: () => (
    <ProtectedRoute allowedRoles={['TEACHER']}>
      <DashboardPage />
    </ProtectedRoute>
  ),
});

const tasksRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: '/tasks',
  component: () => (
    <ProtectedRoute allowedRoles={['ADMIN', 'TEACHER', 'STUDENT', 'PARENT']}>
      <TasksPage />
    </ProtectedRoute>
  ),
});

const leaderboardRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: '/leaderboard',
  component: () => (
    <ProtectedRoute allowedRoles={['TEACHER', 'STUDENT']}>
      <LeaderboardPage />
    </ProtectedRoute>
  ),
});

const rewardsRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: '/rewards',
  component: () => (
    <ProtectedRoute allowedRoles={['STUDENT', 'PARENT']}>
      <RewardsPage />
    </ProtectedRoute>
  ),
});

const performanceRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: '/performance',
  component: () => (
    <ProtectedRoute allowedRoles={['STUDENT', 'PARENT']}>
      <PerformancePage />
    </ProtectedRoute>
  ),
});

const settingsRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: '/settings',
  component: () => (
    <ProtectedRoute allowedRoles={['ADMIN', 'TEACHER', 'STUDENT', 'PARENT']}>
      <SettingsPage />
    </ProtectedRoute>
  ),
});

// Admin Routes
const usersRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: '/users',
  component: () => (
    <ProtectedRoute allowedRoles={['ADMIN']}>
      <UsersPage />
    </ProtectedRoute>
  ),
});

const classesRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: '/classes',
  component: () => (
    <ProtectedRoute allowedRoles={['ADMIN']}>
      <ClassesPage />
    </ProtectedRoute>
  ),
});

const analyticsRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: '/analytics',
  component: () => (
    <ProtectedRoute allowedRoles={['ADMIN']}>
      <AnalyticsPage />
    </ProtectedRoute>
  ),
});

// Calendar & Events
const calendarRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: '/calendar',
  component: () => (
    <ProtectedRoute allowedRoles={['ADMIN', 'TEACHER', 'STUDENT', 'PARENT']}>
      <CalendarPage />
    </ProtectedRoute>
  ),
});

// Announcements
const announcementsRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: '/announcements',
  component: () => (
    <ProtectedRoute allowedRoles={['ADMIN', 'TEACHER', 'STUDENT', 'PARENT']}>
      <AnnouncementsPage />
    </ProtectedRoute>
  ),
});

// Gradebook
const gradebookRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: '/gradebook',
  component: () => (
    <ProtectedRoute allowedRoles={['ADMIN', 'TEACHER']}>
      <GradebookPage />
    </ProtectedRoute>
  ),
});

// Attendance
const attendanceRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: '/attendance',
  component: () => (
    <ProtectedRoute allowedRoles={['ADMIN', 'TEACHER']}>
      <AttendancePage />
    </ProtectedRoute>
  ),
});

// Study Resources
const resourcesRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: '/resources',
  component: () => (
    <ProtectedRoute allowedRoles={['TEACHER', 'STUDENT']}>
      <ResourcesPage />
    </ProtectedRoute>
  ),
});

// Progress Reports
const reportsRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: '/reports',
  component: () => (
    <ProtectedRoute allowedRoles={['STUDENT', 'PARENT']}>
      <ReportsPage />
    </ProtectedRoute>
  ),
});

// Gamification Routes
const badgesRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: '/badges',
  component: () => (
    <ProtectedRoute allowedRoles={['STUDENT']}>
      <BadgesPage />
    </ProtectedRoute>
  ),
});

const streaksRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: '/streaks',
  component: () => (
    <ProtectedRoute allowedRoles={['STUDENT']}>
      <StreaksPage />
    </ProtectedRoute>
  ),
});

const challengesRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: '/challenges',
  component: () => (
    <ProtectedRoute allowedRoles={['STUDENT']}>
      <ChallengesPage />
    </ProtectedRoute>
  ),
});

const xpHistoryRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: '/xp-history',
  component: () => (
    <ProtectedRoute allowedRoles={['STUDENT']}>
      <XPHistoryPage />
    </ProtectedRoute>
  ),
});

// Phase 1 New Features Routes
const messagesRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: '/messages',
  component: () => (
    <ProtectedRoute allowedRoles={['ADMIN', 'TEACHER', 'STUDENT', 'PARENT']}>
      <MessagesPage />
    </ProtectedRoute>
  ),
});

const quizzesRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: '/quizzes',
  component: () => (
    <ProtectedRoute allowedRoles={['TEACHER', 'STUDENT']}>
      <QuizzesPage />
    </ProtectedRoute>
  ),
});

const notificationsRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: '/notifications',
  component: () => (
    <ProtectedRoute allowedRoles={['ADMIN', 'TEACHER', 'STUDENT', 'PARENT']}>
      <NotificationsPage />
    </ProtectedRoute>
  ),
});

const teamsRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: '/teams',
  component: () => (
    <ProtectedRoute allowedRoles={['STUDENT']}>
      <TeamsPage />
    </ProtectedRoute>
  ),
});

// Phase 2 Routes
const studyGroupsRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: '/study-groups',
  component: () => (
    <ProtectedRoute allowedRoles={['STUDENT']}>
      <StudyGroupsPage />
    </ProtectedRoute>
  ),
});

const videosRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: '/videos',
  component: () => (
    <ProtectedRoute allowedRoles={['TEACHER', 'STUDENT']}>
      <VideoLessonsPage />
    </ProtectedRoute>
  ),
});

const parentPortalRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: '/parent-portal',
  component: () => (
    <ProtectedRoute allowedRoles={['PARENT']}>
      <ParentPortalPage />
    </ProtectedRoute>
  ),
});

const notesRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: '/notes',
  component: () => (
    <ProtectedRoute allowedRoles={['STUDENT', 'TEACHER']}>
      <NotesPage />
    </ProtectedRoute>
  ),
});

// Phase 3 Routes
const learningAnalyticsRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: '/learning-analytics',
  component: () => (
    <ProtectedRoute allowedRoles={['STUDENT']}>
      <LearningAnalyticsPage />
    </ProtectedRoute>
  ),
});

const tournamentsRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: '/tournaments',
  component: () => (
    <ProtectedRoute allowedRoles={['STUDENT']}>
      <TournamentsPage />
    </ProtectedRoute>
  ),
});

const peerReviewRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: '/peer-review',
  component: () => (
    <ProtectedRoute allowedRoles={['STUDENT']}>
      <PeerReviewPage />
    </ProtectedRoute>
  ),
});

const flashcardsRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: '/flashcards',
  component: () => (
    <ProtectedRoute allowedRoles={['STUDENT', 'TEACHER']}>
      <FlashcardsPage />
    </ProtectedRoute>
  ),
});

// Student Profile Route
const profileRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: '/profile',
  component: () => (
    <ProtectedRoute allowedRoles={['STUDENT']}>
      <StudentProfilePage />
    </ProtectedRoute>
  ),
});

// Catch-all route for unauthorized access
const unauthorizedRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: '*',
  component: () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    
    React.useEffect(() => {
      if (user) {
        const defaultRoute = getDefaultRoute(user.role);
        navigate({ to: defaultRoute });
      }
    }, [user, navigate]);
    
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Page Not Found</h2>
          <p className="text-slate-500 mb-4">The page you're looking for doesn't exist or you don't have access to it.</p>
          <p className="text-sm text-slate-400">Redirecting to your dashboard...</p>
        </div>
      </div>
    );
  },
});

const routeTree = rootRoute.addChildren([
  loginRoute,
  authLayoutRoute.addChildren([
    dashboardRoute,
    dashboardExplicitRoute,
    tasksRoute,
    leaderboardRoute,
    rewardsRoute,
    performanceRoute,
    settingsRoute,
    usersRoute,
    classesRoute,
    analyticsRoute,
    calendarRoute,
    announcementsRoute,
    gradebookRoute,
    attendanceRoute,
    resourcesRoute,
    reportsRoute,
    badgesRoute,
    streaksRoute,
    challengesRoute,
    xpHistoryRoute,
    messagesRoute,
    quizzesRoute,
    notificationsRoute,
    teamsRoute,
    studyGroupsRoute,
    videosRoute,
    parentPortalRoute,
    notesRoute,
    learningAnalyticsRoute,
    tournamentsRoute,
    peerReviewRoute,
    flashcardsRoute,
    profileRoute,
    unauthorizedRoute,
  ]),
]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

