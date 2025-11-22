import React, { useState } from 'react';
import { Bell, Check, CheckCheck, Settings, Filter, Trash2, Mail, Smartphone, Monitor } from 'lucide-react';
import { MOCK_APP_NOTIFICATIONS } from '../../../shared/mockData';
import type { AppNotification, NotificationPreferences } from '../../../shared/types';
import { useAuth } from '../../global-context/AuthContext';
import { Icon3DImage } from '../../../shared/components/Icon3DImage';
import { format } from 'date-fns';

export const NotificationsPage = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<AppNotification[]>(MOCK_APP_NOTIFICATIONS);
  const [filter, setFilter] = useState<'ALL' | AppNotification['type']>('ALL');
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    userId: user?.id || '',
    email: {
      tasks: true,
      grades: true,
      messages: true,
      announcements: true,
      achievements: true,
    },
    push: {
      tasks: true,
      grades: true,
      messages: true,
      announcements: true,
      achievements: true,
    },
    inApp: {
      tasks: true,
      grades: true,
      messages: true,
      announcements: true,
      achievements: true,
    },
  });

  const filteredNotifications = filter === 'ALL' 
    ? notifications 
    : notifications.filter(n => n.type === filter);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleDelete = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const getNotificationIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'TASK':
        return '📝';
      case 'GRADE':
        return '🎉';
      case 'MESSAGE':
        return '💬';
      case 'ANNOUNCEMENT':
        return '📢';
      case 'ACHIEVEMENT':
        return '🏆';
      default:
        return '🔔';
    }
  };

  const getNotificationColor = (type: AppNotification['type']) => {
    switch (type) {
      case 'TASK':
        return 'bg-blue-100 text-blue-700';
      case 'GRADE':
        return 'bg-emerald-100 text-emerald-700';
      case 'MESSAGE':
        return 'bg-purple-100 text-purple-700';
      case 'ANNOUNCEMENT':
        return 'bg-amber-100 text-amber-700';
      case 'ACHIEVEMENT':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Icon3DImage type="star" size={48} float={true} />
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Notification Center</h1>
            <p className="text-slate-500 mt-1">
              {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}` : 'All caught up!'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2"
            >
              <CheckCheck className="w-4 h-4" />
              Mark All Read
            </button>
          )}
          <button
            onClick={() => setShowPreferences(!showPreferences)}
            className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            <Settings className="w-5 h-5 text-slate-700" />
          </button>
        </div>
      </div>

      {/* Preferences Panel */}
      {showPreferences && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Notification Preferences</h3>
          <div className="space-y-6">
            {(['email', 'push', 'inApp'] as const).map((channel) => (
              <div key={channel}>
                <div className="flex items-center gap-2 mb-3">
                  {channel === 'email' && <Mail className="w-5 h-5 text-slate-600" />}
                  {channel === 'push' && <Smartphone className="w-5 h-5 text-slate-600" />}
                  {channel === 'inApp' && <Monitor className="w-5 h-5 text-slate-600" />}
                  <h4 className="font-semibold text-slate-800 capitalize">{channel === 'inApp' ? 'In-App' : channel}</h4>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {(['tasks', 'grades', 'messages', 'announcements', 'achievements'] as const).map((type) => (
                    <label key={type} className="flex items-center gap-2 p-3 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences[channel][type]}
                        onChange={(e) => setPreferences(prev => ({
                          ...prev,
                          [channel]: { ...prev[channel], [type]: e.target.checked }
                        }))}
                        className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                      />
                      <span className="text-sm font-medium text-slate-700 capitalize">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-5 h-5 text-slate-500" />
          <span className="text-sm font-medium text-slate-700">Filter:</span>
          {(['ALL', 'TASK', 'GRADE', 'MESSAGE', 'ANNOUNCEMENT', 'ACHIEVEMENT'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === type
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {type === 'ALL' ? 'All' : type}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      {filteredNotifications.length > 0 ? (
        <div className="space-y-3">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-all ${
                !notification.read ? 'border-l-4 border-l-indigo-600 bg-indigo-50/30' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${getNotificationColor(notification.type)}`}>
                  {notification.icon || getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-slate-800 mb-1">{notification.title}</h3>
                      <p className="text-slate-600">{notification.message}</p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      {!notification.read && (
                        <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                      )}
                      <span className="text-xs text-slate-500 whitespace-nowrap">
                        {format(new Date(notification.timestamp), 'MMM dd, HH:mm')}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${getNotificationColor(notification.type)}`}>
                      {notification.type}
                    </span>
                    <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                      notification.priority === 'HIGH' ? 'bg-red-100 text-red-700' :
                      notification.priority === 'MEDIUM' ? 'bg-amber-100 text-amber-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {notification.priority}
                    </span>
                    {notification.actionUrl && (
                      <a
                        href={notification.actionUrl}
                        className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                      >
                        View →
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!notification.read && (
                    <button
                      onClick={() => handleMarkAsRead(notification.id)}
                      className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                      title="Mark as read"
                    >
                      <Check className="w-4 h-4 text-slate-600" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(notification.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center">
          <Bell className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-700 mb-2">No notifications</h3>
          <p className="text-slate-500">You're all caught up! Check back later for updates.</p>
        </div>
      )}

      {notifications.length > 0 && (
        <div className="flex justify-center">
          <button
            onClick={handleClearAll}
            className="px-6 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium"
          >
            Clear All Notifications
          </button>
        </div>
      )}
    </div>
  );
};
