import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { TrendingUp, Users, Award, BookOpen } from 'lucide-react';

const ENGAGEMENT_DATA = [
  { month: 'Jan', active: 1200, completed: 950 },
  { month: 'Feb', active: 1350, completed: 1100 },
  { month: 'Mar', active: 1500, completed: 1250 },
  { month: 'Apr', active: 1450, completed: 1300 },
  { month: 'May', active: 1600, completed: 1400 },
  { month: 'Jun', active: 1700, completed: 1500 },
];

const SUBJECT_DISTRIBUTION = [
  { name: 'Math', value: 35, color: '#6366f1' },
  { name: 'Science', value: 25, color: '#ec4899' },
  { name: 'English', value: 20, color: '#10b981' },
  { name: 'History', value: 15, color: '#f59e0b' },
  { name: 'Other', value: 5, color: '#6b7280' },
];

const GRADE_DISTRIBUTION = [
  { grade: 'A', count: 45 },
  { grade: 'B', count: 60 },
  { grade: 'C', count: 35 },
  { grade: 'D', count: 15 },
  { grade: 'F', count: 5 },
];

export const AnalyticsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">School Analytics</h1>
        <p className="text-slate-500 mt-1">Comprehensive insights into school performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 opacity-80" />
            <span className="text-sm opacity-80">+12%</span>
          </div>
          <div className="text-3xl font-bold mb-1">1,234</div>
          <div className="text-sm opacity-90">Total Students</div>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <BookOpen className="w-8 h-8 opacity-80" />
            <span className="text-sm opacity-80">+8%</span>
          </div>
          <div className="text-3xl font-bold mb-1">456</div>
          <div className="text-sm opacity-90">Active Tasks</div>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Award className="w-8 h-8 opacity-80" />
            <span className="text-sm opacity-80">+15%</span>
          </div>
          <div className="text-3xl font-bold mb-1">89%</div>
          <div className="text-sm opacity-90">Completion Rate</div>
        </div>
        <div className="bg-gradient-to-br from-pink-500 to-pink-600 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 opacity-80" />
            <span className="text-sm opacity-80">+22%</span>
          </div>
          <div className="text-3xl font-bold mb-1">2.5M</div>
          <div className="text-sm opacity-90">Total XP Earned</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Engagement Trend */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-6">Student Engagement Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ENGAGEMENT_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                />
                <Legend />
                <Line type="monotone" dataKey="active" stroke="#6366f1" strokeWidth={3} name="Active Students" dot={{r: 4}} />
                <Line type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={3} name="Completed Tasks" dot={{r: 4}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subject Distribution */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-6">Task Distribution by Subject</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={SUBJECT_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {SUBJECT_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Grade Distribution */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 lg:col-span-2">
          <h3 className="font-bold text-slate-800 mb-6">Grade Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={GRADE_DISTRIBUTION}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="grade" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  cursor={{fill: '#f8fafc'}}
                />
                <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
