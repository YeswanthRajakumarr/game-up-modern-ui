import { useState, useEffect } from 'react';
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
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../global-context/AuthContext';
import { Icon3D, Icon3DEnhanced } from '../../shared/components/Icon3D';

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

export const Sidebar = ({ isCollapsed: externalCollapsed, onToggle }: SidebarProps = {}) => {
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    if (externalCollapsed !== undefined) {
      setIsCollapsed(externalCollapsed);
    }
  }, [externalCollapsed]);

  const toggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(newState));
    onToggle?.();
  };
  
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
    <aside className={`${isCollapsed ? 'w-20' : 'w-64'} bg-slate-900 text-white flex flex-col h-screen fixed left-0 top-0 shadow-xl z-50 transition-all duration-300`}>
      <div className={`${isCollapsed ? 'p-4' : 'p-6'} flex items-center border-b border-slate-800`}>
        <div className={`flex items-center ${isCollapsed ? 'justify-center gap-2' : 'gap-3'} w-full`}>
          <div className="bg-indigo-500 p-2 rounded-lg shadow-lg shadow-indigo-500/20 flex-shrink-0">
            <Icon3DEnhanced 
              icon={Gamepad2} 
              size={24}
              gradient="linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%)"
              glow={true}
              glowColor="#ffffff"
              color="#ffffff"
            />
          </div>
          {!isCollapsed && <h1 className="text-xl font-bold tracking-tight">GameUp</h1>}
          <button
            onClick={toggleCollapse}
            className="p-1.5 rounded-lg hover:bg-slate-800 transition-colors text-slate-400 hover:text-white flex-shrink-0"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>


      <nav className="flex-1 px-2 py-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} ${isCollapsed ? 'px-2' : 'px-4'} py-3 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-200 group relative`}
            activeProps={{
              className: "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
            }}
            title={isCollapsed ? item.label : undefined}
          >
            <div className="group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
              <Icon3D 
                icon={item.icon} 
                size={20}
                color="currentColor"
                depth={6}
              />
            </div>
            {!isCollapsed && <span className="font-medium whitespace-nowrap">{item.label}</span>}
            {isCollapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
                {item.label}
              </div>
            )}
          </Link>
        ))}
      </nav>

      <div className={`p-4 border-t border-slate-800 ${isCollapsed ? 'pb-20' : ''}`}>
        <button 
          onClick={logout}
          className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} ${isCollapsed ? 'px-2' : 'px-4'} py-3 w-full rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors relative group`}
          title={isCollapsed ? 'Sign Out' : undefined}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span className="font-medium">Sign Out</span>}
          {isCollapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
              Sign Out
            </div>
          )}
        </button>
      </div>
    </aside>
  );
};

