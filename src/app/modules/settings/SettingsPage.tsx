import React, { useState } from 'react';
import { MOCK_NOTIFICATIONS } from '../../../shared/mockData';
import type { Notification } from '../../../shared/types';
import { Bell, Check, Settings as SettingsIcon, Moon, Sun, Volume2, VolumeX } from 'lucide-react';

export const SettingsPage = () => {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Settings</h1>
        <p className="text-slate-500 mt-1">Manage your preferences and account settings</p>
      </div>

      {/* Notifications Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Notifications</h2>
              <p className="text-sm text-slate-500">{unreadCount} unread notifications</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {notifications.map(notification => (
            <div 
              key={notification.id} 
              className={`p-4 rounded-xl border transition-colors ${
                notification.read 
                  ? 'bg-slate-50 border-slate-200' 
                  : 'bg-indigo-50 border-indigo-200'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-slate-800">{notification.title}</h3>
                    {!notification.read && (
                      <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 mb-2">{notification.message}</p>
                  <span className="text-xs text-slate-400">
                    {new Date(notification.timestamp).toLocaleString()}
                  </span>
                </div>
                {!notification.read && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors"
                    title="Mark as read"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preferences Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
            <SettingsIcon className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Preferences</h2>
        </div>

        <div className="space-y-6">
          {/* Theme */}
          <div className="flex items-center justify-between py-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              {theme === 'light' ? (
                <Sun className="w-5 h-5 text-amber-500" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-500" />
              )}
              <div>
                <h3 className="font-semibold text-slate-800">Theme</h3>
                <p className="text-sm text-slate-500">Choose your preferred color scheme</p>
              </div>
            </div>
            <div className="flex gap-2 bg-slate-100 p-1 rounded-lg">
              <button
                onClick={() => setTheme('light')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  theme === 'light' 
                    ? 'bg-white text-slate-800 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                Light
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  theme === 'dark' 
                    ? 'bg-white text-slate-800 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                Dark
              </button>
            </div>
          </div>

          {/* Sound */}
          <div className="flex items-center justify-between py-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              {soundEnabled ? (
                <Volume2 className="w-5 h-5 text-emerald-500" />
              ) : (
                <VolumeX className="w-5 h-5 text-slate-400" />
              )}
              <div>
                <h3 className="font-semibold text-slate-800">Sound Effects</h3>
                <p className="text-sm text-slate-500">Enable notification sounds</p>
              </div>
            </div>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                soundEnabled ? 'bg-indigo-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                  soundEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Email Notifications */}
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-blue-500" />
              <div>
                <h3 className="font-semibold text-slate-800">Email Notifications</h3>
                <p className="text-sm text-slate-500">Receive updates via email</p>
              </div>
            </div>
            <button
              onClick={() => setEmailNotifications(!emailNotifications)}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                emailNotifications ? 'bg-indigo-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                  emailNotifications ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Account Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Account</h2>
        <div className="space-y-4">
          <button className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-700 font-medium transition-colors">
            Change Password
          </button>
          <button className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-700 font-medium transition-colors">
            Privacy Settings
          </button>
          <button className="w-full text-left px-4 py-3 bg-red-50 hover:bg-red-100 rounded-lg text-red-600 font-medium transition-colors">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};