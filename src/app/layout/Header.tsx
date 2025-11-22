import React from 'react';
import { Bell, Search, User as UserIcon } from 'lucide-react';
import { useAuth } from '../global-context/AuthContext';
import type { UserRole } from '../../shared/types';
import { useNavigate } from '@tanstack/react-router';
import { getDefaultRoute } from '../../shared/utils/rolePermissions';
import { MOCK_APP_NOTIFICATIONS } from '../../shared/mockData';

export const Header = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  
  // Calculate unread notifications count
  const unreadCount = MOCK_APP_NOTIFICATIONS.filter(n => !n.read && n.userId === user?.id).length;
  
  const handleNotificationClick = () => {
    navigate({ to: '/notifications' });
  };

  const handleRoleSwitch = (role: UserRole) => {
    login(role);
    // Navigate to default route for the new role
    setTimeout(() => {
      const defaultRoute = getDefaultRoute(role);
      navigate({ to: defaultRoute });
    }, 100);
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-40 shadow-sm">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-md w-full hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
                type="text" 
                placeholder="Search tasks, students, or resources..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
            />
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Role Switcher for Demo */}
        <div className="hidden lg:flex items-center gap-2 bg-slate-100 p-1 rounded-lg">
            {(['ADMIN', 'TEACHER', 'STUDENT', 'PARENT'] as UserRole[]).map((role) => (
                <button
                    key={role}
                    onClick={() => handleRoleSwitch(role)}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${user?.role === role ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    {role}
                </button>
            ))}
        </div>

        <div className="flex items-center gap-4">
            <button 
              onClick={handleNotificationClick}
              className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-50"
            >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                )}
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
            </button>
            
            <div className="h-8 w-px bg-slate-200"></div>

            <div className="flex items-center gap-3 pl-2">
                <div className="text-right hidden md:block">
                    <div className="text-sm font-semibold text-slate-700">{user?.name}</div>
                    <div className="text-xs text-slate-500">{user?.role}</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-indigo-100 border-2 border-white shadow-sm overflow-hidden">
                    {user?.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-indigo-500">
                            <UserIcon className="w-5 h-5" />
                        </div>
                    )}
                </div>
            </div>
        </div>
      </div>
    </header>
  );
};

