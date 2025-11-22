import React, { useState } from 'react';
import { Bell, AlertCircle, Info, CheckCircle, Plus, Filter } from 'lucide-react';
import { format } from 'date-fns';
import type { Announcement } from '../../../shared/types';
import { useAuth } from '../../global-context/AuthContext';

const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'a1',
    title: 'School Holiday - Diwali Break',
    content: 'School will be closed from October 24-26 for Diwali celebrations. Classes resume on October 27.',
    author: 'Principal Smith',
    authorRole: 'ADMIN',
    date: '2023-10-10',
    priority: 'HIGH',
    targetAudience: ['STUDENT', 'TEACHER', 'PARENT'],
  },
  {
    id: 'a2',
    title: 'Science Fair Registration Open',
    content: 'Annual Science Fair registration is now open. Submit your projects by October 15. Winners will receive special XP bonuses!',
    author: 'Sarah Johnson',
    authorRole: 'TEACHER',
    date: '2023-10-08',
    priority: 'MEDIUM',
    targetAudience: ['STUDENT'],
  },
  {
    id: 'a3',
    title: 'Parent-Teacher Meeting Scheduled',
    content: 'Parent-teacher meetings will be held on October 18 from 4:00 PM to 6:00 PM. Please book your slot through the portal.',
    author: 'Alice Teacher',
    authorRole: 'TEACHER',
    date: '2023-10-05',
    priority: 'HIGH',
    targetAudience: ['PARENT'],
  },
  {
    id: 'a4',
    title: 'New Study Resources Available',
    content: 'New study materials for Math and Science have been uploaded. Check the Resources section for access.',
    author: 'Michael Chen',
    authorRole: 'TEACHER',
    date: '2023-10-03',
    priority: 'LOW',
    targetAudience: ['STUDENT'],
  },
  {
    id: 'a5',
    title: 'Sports Day Registration',
    content: 'Annual Sports Day is on October 28. Register for events by October 20. Participation earns bonus XP!',
    author: 'Principal Smith',
    authorRole: 'ADMIN',
    date: '2023-10-01',
    priority: 'MEDIUM',
    targetAudience: ['STUDENT', 'TEACHER'],
  },
];

export const AnnouncementsPage = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState<'ALL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'URGENT'>('ALL');

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'URGENT':
      case 'HIGH':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'MEDIUM':
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'URGENT':
        return 'border-red-500 bg-red-50';
      case 'HIGH':
        return 'border-orange-500 bg-orange-50';
      case 'MEDIUM':
        return 'border-blue-500 bg-blue-50';
      default:
        return 'border-slate-300 bg-slate-50';
    }
  };

  const filteredAnnouncements = MOCK_ANNOUNCEMENTS.filter(announcement => {
    if (filter !== 'ALL' && announcement.priority !== filter) return false;
    if (user && !announcement.targetAudience.includes(user.role)) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Announcements</h1>
          <p className="text-slate-500 mt-1">Stay updated with school news and important notices</p>
        </div>
        {(user?.role === 'ADMIN' || user?.role === 'TEACHER') && (
          <button className="bg-indigo-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-lg shadow-indigo-600/20">
            <Plus className="w-5 h-5" />
            New Announcement
          </button>
        )}
      </div>

      {/* Filter */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex gap-2">
        {(['ALL', 'URGENT', 'HIGH', 'MEDIUM', 'LOW'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
              filter === f
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.map(announcement => (
          <div
            key={announcement.id}
            className={`p-6 rounded-xl border-2 shadow-sm transition-all hover:shadow-md ${getPriorityColor(announcement.priority)}`}
          >
            <div className="flex items-start gap-4">
              <div className="mt-1">
                {getPriorityIcon(announcement.priority)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-slate-800">{announcement.title}</h3>
                  <span className="px-3 py-1 bg-white rounded-full text-xs font-semibold text-slate-600 border border-slate-200">
                    {announcement.priority}
                  </span>
                </div>
                <p className="text-slate-700 mb-3">{announcement.content}</p>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <Bell className="w-4 h-4" />
                    {announcement.author}
                  </span>
                  <span>•</span>
                  <span>{format(new Date(announcement.date), 'MMM dd, yyyy')}</span>
                  <span>•</span>
                  <span>For: {announcement.targetAudience.join(', ')}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredAnnouncements.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
            <Bell className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-slate-500 font-medium">No announcements found</h3>
          </div>
        )}
      </div>
    </div>
  );
};
