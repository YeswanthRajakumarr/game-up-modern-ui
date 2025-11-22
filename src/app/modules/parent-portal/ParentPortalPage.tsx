import React, { useState } from 'react';
import { TrendingUp, Calendar, Award, MessageSquare, BarChart3, BookOpen, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { MOCK_TASKS, MOCK_PERFORMANCE, MOCK_USERS } from '../../../shared/mockData';
import { useAuth } from '../../global-context/AuthContext';
import { Icon3DImage } from '../../../shared/components/Icon3DImage';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { format } from 'date-fns';

export const ParentPortalPage = () => {
  const { user } = useAuth();
  const [selectedTimeframe, setSelectedTimeframe] = useState<'WEEK' | 'MONTH' | 'SEMESTER'>('MONTH');

  // Mock child data (in real app, this would come from API)
  const child = MOCK_USERS.find(u => u.role === 'STUDENT') as any;
  const childTasks = MOCK_TASKS;
  const childPerformance = MOCK_PERFORMANCE;

  // Calculate stats
  const completedTasks = childTasks.filter(t => t.status === 'GRADED').length;
  const pendingTasks = childTasks.filter(t => t.status === 'PENDING').length;
  const averageScore = childPerformance.length > 0
    ? Math.round(childPerformance.reduce((sum, p) => sum + p.score, 0) / childPerformance.length)
    : 0;

  // Performance chart data
  const performanceData = childPerformance.slice(-7).map(p => ({
    date: format(new Date(p.date), 'MMM dd'),
    score: p.score,
    xp: p.xpEarned,
  }));

  // Subject distribution
  const subjectData = [
    { name: 'Math', value: childPerformance.filter(p => p.subject === 'Math').length, color: '#6366f1' },
    { name: 'Science', value: childPerformance.filter(p => p.subject === 'Science').length, color: '#ec4899' },
    { name: 'History', value: childPerformance.filter(p => p.subject === 'History').length, color: '#f59e0b' },
    { name: 'English', value: childPerformance.filter(p => p.subject === 'English').length, color: '#10b981' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Icon3DImage type="trophy" size={48} float={true} />
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Parent Portal</h1>
            <p className="text-slate-500 mt-1">Monitor your child's academic progress and engagement</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {(['WEEK', 'MONTH', 'SEMESTER'] as const).map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => setSelectedTimeframe(timeframe)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                selectedTimeframe === timeframe
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {timeframe}
            </button>
          ))}
        </div>
      </div>

      {/* Child Info Card */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-6">
          <img
            src={child?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${child?.name}`}
            alt={child?.name}
            className="w-20 h-20 rounded-full border-4 border-white"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-1">{child?.name || 'Student Name'}</h2>
            <p className="text-indigo-100 mb-4">Grade {child?.grade || '10'} - Section {child?.section || 'A'}</p>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-indigo-100 mb-1">Total XP</div>
                <div className="text-2xl font-bold">{child?.xp || 1250}</div>
              </div>
              <div>
                <div className="text-sm text-indigo-100 mb-1">Current Level</div>
                <div className="text-2xl font-bold">Level 5</div>
              </div>
              <div>
                <div className="text-sm text-indigo-100 mb-1">Rank</div>
                <div className="text-2xl font-bold">#1</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-emerald-100 p-3 rounded-xl">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">{completedTasks}</div>
              <div className="text-sm text-slate-500">Completed Tasks</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-amber-100 p-3 rounded-xl">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">{pendingTasks}</div>
              <div className="text-sm text-slate-500">Pending Tasks</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-blue-100 p-3 rounded-xl">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">{averageScore}%</div>
              <div className="text-sm text-slate-500">Average Score</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-purple-100 p-3 rounded-xl">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">12</div>
              <div className="text-sm text-slate-500">Badges Earned</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Performance Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Subject Distribution */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Subject Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={subjectData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {subjectData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          Recent Tasks
        </h3>
        <div className="space-y-3">
          {childTasks.slice(0, 5).map((task) => (
            <div key={task.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${
                  task.status === 'GRADED' ? 'bg-emerald-100' :
                  task.status === 'SUBMITTED' ? 'bg-blue-100' :
                  task.status === 'OVERDUE' ? 'bg-red-100' :
                  'bg-amber-100'
                }`}>
                  {task.status === 'GRADED' ? (
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  ) : task.status === 'OVERDUE' ? (
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  ) : (
                    <Clock className="w-5 h-5 text-amber-600" />
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">{task.title}</h4>
                  <p className="text-sm text-slate-500">{task.subject} • Due {format(new Date(task.dueDate), 'MMM dd')}</p>
                </div>
              </div>
              <div className="text-right">
                {task.grade && (
                  <div className="text-lg font-bold text-slate-800">{task.grade}</div>
                )}
                <div className="text-sm text-slate-500">{task.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Communication & Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-all text-left">
          <MessageSquare className="w-8 h-8 text-indigo-600 mb-3" />
          <h3 className="font-bold text-slate-800 mb-2">Message Teacher</h3>
          <p className="text-sm text-slate-600">Communicate with your child's teachers</p>
        </button>
        <button className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-all text-left">
          <Calendar className="w-8 h-8 text-emerald-600 mb-3" />
          <h3 className="font-bold text-slate-800 mb-2">Schedule Meeting</h3>
          <p className="text-sm text-slate-600">Request a parent-teacher meeting</p>
        </button>
        <button className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-all text-left">
          <BarChart3 className="w-8 h-8 text-purple-600 mb-3" />
          <h3 className="font-bold text-slate-800 mb-2">View Reports</h3>
          <p className="text-sm text-slate-600">Access detailed progress reports</p>
        </button>
      </div>
    </div>
  );
};
