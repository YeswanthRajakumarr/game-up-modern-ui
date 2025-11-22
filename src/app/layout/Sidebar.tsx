import React from 'react';
import { Link } from '@tanstack/react-router';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Trophy, 
  TrendingUp, 
  Gift, 
  Settings, 
  LogOut,
  Gamepad2,
  School,
  Calendar,
  Bell,
  ClipboardList,
  UserCheck,
  FileText,
  FolderOpen,
  Award,
  Flame,
  Target,
  Zap,
  MessageCircle,
  HelpCircle,
  Users as UsersIcon,
  Video,
  FileText as FileTextIcon,
  BarChart3,
  Users as UsersGroup,
  ClipboardCheck,
  User as UserIcon
} from 'lucide-react';
import { useAuth } from '../global-context/AuthContext';
import { Icon3D, Icon3DEnhanced } from '../../shared/components/Icon3D';

export const Sidebar = () => {
  const { user, logout } = useAuth();
  
  if (!user) return null;

  const getNavItems = () => {
    switch (user.role) {
      case 'ADMIN':
        return [
          { label: 'Users', icon: Users, to: '/users' },
          { label: 'Classes', icon: School, to: '/classes' },
          { label: 'Analytics', icon: TrendingUp, to: '/analytics' },
          { label: 'Calendar', icon: Calendar, to: '/calendar' },
          { label: 'Announcements', icon: Bell, to: '/announcements' },
          { label: 'Messages', icon: MessageCircle, to: '/messages' },
          { label: 'Notifications', icon: Bell, to: '/notifications' },
          { label: 'Settings', icon: Settings, to: '/settings' },
        ];
      case 'TEACHER':
        return [
          { label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
          { label: 'Tasks', icon: BookOpen, to: '/tasks' },
          { label: 'Gradebook', icon: ClipboardList, to: '/gradebook' },
          { label: 'Attendance', icon: UserCheck, to: '/attendance' },
          { label: 'Leaderboard', icon: Trophy, to: '/leaderboard' },
          { label: 'Quizzes', icon: HelpCircle, to: '/quizzes' },
          { label: 'Video Lessons', icon: Video, to: '/videos' },
          { label: 'Notes', icon: FileTextIcon, to: '/notes' },
          { label: 'Flashcards', icon: BookOpen, to: '/flashcards' },
          { label: 'Resources', icon: FolderOpen, to: '/resources' },
          { label: 'Calendar', icon: Calendar, to: '/calendar' },
          { label: 'Announcements', icon: Bell, to: '/announcements' },
          { label: 'Messages', icon: MessageCircle, to: '/messages' },
          { label: 'Notifications', icon: Bell, to: '/notifications' },
          { label: 'Settings', icon: Settings, to: '/settings' },
        ];
      case 'STUDENT':
        return [
          { label: 'My Tasks', icon: BookOpen, to: '/tasks' },
          { label: 'Leaderboard', icon: Trophy, to: '/leaderboard' },
          { label: 'Rewards', icon: Gift, to: '/rewards' },
          { label: 'Performance', icon: TrendingUp, to: '/performance' },
          { label: 'Challenges', icon: Target, to: '/challenges' },
          { label: 'Badges', icon: Award, to: '/badges' },
          { label: 'Streaks', icon: Flame, to: '/streaks' },
          { label: 'XP History', icon: Zap, to: '/xp-history' },
          { label: 'Teams', icon: UsersIcon, to: '/teams' },
          { label: 'Study Groups', icon: UsersGroup, to: '/study-groups' },
          { label: 'Quizzes', icon: HelpCircle, to: '/quizzes' },
          { label: 'Video Lessons', icon: Video, to: '/videos' },
          { label: 'Notes', icon: FileTextIcon, to: '/notes' },
          { label: 'Flashcards', icon: BookOpen, to: '/flashcards' },
          { label: 'Learning Analytics', icon: BarChart3, to: '/learning-analytics' },
          { label: 'Tournaments', icon: Trophy, to: '/tournaments' },
          { label: 'Peer Review', icon: ClipboardCheck, to: '/peer-review' },
          { label: 'Calendar', icon: Calendar, to: '/calendar' },
          { label: 'Announcements', icon: Bell, to: '/announcements' },
          { label: 'Resources', icon: FolderOpen, to: '/resources' },
          { label: 'Reports', icon: FileText, to: '/reports' },
          { label: 'Messages', icon: MessageCircle, to: '/messages' },
          { label: 'Notifications', icon: Bell, to: '/notifications' },
          { label: 'Settings', icon: Settings, to: '/settings' },
        ];
      case 'PARENT':
        return [
          { label: 'Parent Portal', icon: LayoutDashboard, to: '/parent-portal' },
          { label: 'Child Tasks', icon: BookOpen, to: '/tasks' },
          { label: 'Performance', icon: TrendingUp, to: '/performance' },
          { label: 'Rewards', icon: Gift, to: '/rewards' },
          { label: 'Calendar', icon: Calendar, to: '/calendar' },
          { label: 'Announcements', icon: Bell, to: '/announcements' },
          { label: 'Reports', icon: FileText, to: '/reports' },
          { label: 'Messages', icon: MessageCircle, to: '/messages' },
          { label: 'Notifications', icon: Bell, to: '/notifications' },
          { label: 'Settings', icon: Settings, to: '/settings' },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-screen fixed left-0 top-0 shadow-xl z-50 transition-all duration-300">
      <div className="p-6 flex items-center gap-3 border-b border-slate-800">
        <div className="bg-indigo-500 p-2 rounded-lg shadow-lg shadow-indigo-500/20">
          <Icon3DEnhanced 
            icon={Gamepad2} 
            size={24}
            gradient="linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%)"
            glow={true}
            glowColor="#ffffff"
            color="#ffffff"
          />
        </div>
        <h1 className="text-xl font-bold tracking-tight">GameUp</h1>
      </div>

      <div className="p-4">
        {user.role === 'STUDENT' && (
           <div className="mb-6 bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 backdrop-blur-sm">
             <div className="text-xs text-slate-400 uppercase font-semibold mb-2">My Level</div>
             <div className="flex items-center justify-between mb-2">
               <span className="text-yellow-400 font-bold text-lg">Lvl 5</span>
               <span className="text-slate-300 text-sm">1250 XP</span>
             </div>
             <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
               <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full w-[70%] shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
             </div>
           </div>
        )}
      </div>

      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-200 group"
            activeProps={{
              className: "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
            }}
          >
            <div className="group-hover:scale-110 transition-transform duration-200">
              <Icon3D 
                icon={item.icon} 
                size={20}
                color="currentColor"
                depth={6}
              />
            </div>
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
        
        <div className="my-4 border-t border-slate-800 mx-4"></div>

        <Link
            to="/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-200 group"
            activeProps={{
              className: "bg-slate-800 text-white"
            }}
          >
            <div className="group-hover:rotate-90 transition-transform duration-300">
              <Icon3D 
                icon={Settings} 
                size={20}
                color="currentColor"
                depth={6}
              />
            </div>
            <span className="font-medium">Settings</span>
        </Link>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button 
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

