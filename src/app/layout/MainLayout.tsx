import { useEffect, useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Outlet } from '@tanstack/react-router';
import { NotificationToast } from '../../shared/components/NotificationToast';
import { useAuth } from '../global-context/AuthContext';
import { AnimatePresence } from 'framer-motion';

export const MainLayout = () => {
  const { user } = useAuth();
  const [showNotification, setShowNotification] = useState(false);
  const [hasShownNotification, setHasShownNotification] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    // Default to expanded (false) if no saved preference
    return saved !== null ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    // Show notification on first load
    if (user && !hasShownNotification) {
      const timer = setTimeout(() => {
        setShowNotification(true);
        setHasShownNotification(true);
      }, 1000); // Show after 1 second

      return () => clearTimeout(timer);
    }
  }, [user, hasShownNotification]);

  // Get announcement based on current date or random
  const getAnnouncement = () => {
    const announcements = [
      {
        title: '🎄 Christmas Holiday Announcement',
        message: 'School will be closed from December 23rd to January 2nd. Enjoy your holidays!',
        type: 'announcement' as const,
      },
      {
        title: '🎉 New Year Special Challenge',
        message: 'Complete 5 tasks this week to earn bonus XP and unlock exclusive badges!',
        type: 'announcement' as const,
      },
      {
        title: '📚 Midterm Exams Coming Up',
        message: 'Midterm exams start next week. Check your calendar for exam schedules.',
        type: 'warning' as const,
      },
      {
        title: '🏆 Leaderboard Update',
        message: 'New monthly leaderboard has started! Climb the ranks and win amazing rewards.',
        type: 'success' as const,
      },
      {
        title: '🎁 Special Rewards Available',
        message: 'Limited time offers in the rewards store! Redeem your coins now.',
        type: 'announcement' as const,
      },
    ];

    // Select random announcement or based on date
    const randomIndex = Math.floor(Math.random() * announcements.length);
    return announcements[randomIndex];
  };

  const announcement = getAnnouncement();

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      <div className={`flex-1 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'} flex flex-col min-h-screen transition-all duration-300`}>
        <Header />
        <main className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-7xl mx-auto w-full">
                <Outlet />
            </div>
        </main>
      </div>
      
      {/* Notification Toast */}
      <AnimatePresence>
        {showNotification && (
          <NotificationToast
            key="notification"
            title={announcement.title}
            message={announcement.message}
            type={announcement.type}
            duration={6000}
            onClose={() => setShowNotification(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

