import React, { useState } from 'react';
import { MOCK_PERFORMANCE } from '../../../shared/mockData';
import type { PerformanceData } from '../../../shared/types';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, Award, Target, Calendar } from 'lucide-react';
import { format, parseISO } from 'date-fns';

export const PerformancePage = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>('ALL');
  
  const subjects = ['ALL', ...Array.from(new Set(MOCK_PERFORMANCE.map(p => p.subject)))];
  
  const filteredData = selectedSubject === 'ALL' 
    ? MOCK_PERFORMANCE 
    : MOCK_PERFORMANCE.filter(p => p.subject === selectedSubject);

  const subjectAverages = subjects.slice(1).map(subject => {
    const subjectData = MOCK_PERFORMANCE.filter(p => p.subject === subject);
    const avgScore = subjectData.reduce((sum, d) => sum + d.score, 0) / subjectData.length;
    const totalXP = subjectData.reduce((sum, d) => sum + d.xpEarned, 0);
    return { subject, avgScore, totalXP };
  });

  const chartData = filteredData.map(d => ({
    ...d,
    dateFormatted: format(parseISO(d.date), 'MMM dd'),
  }));

  const overallAvg = filteredData.reduce((sum, d) => sum + d.score, 0) / filteredData.length;
  const totalXP = filteredData.reduce((sum, d) => sum + d.xpEarned, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Performance Analytics</h1>
        <p className="text-slate-500 mt-1">Track your academic progress and achievements</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-8 h-8 opacity-80" />
            <div className="text-sm opacity-80">Overall Average</div>
          </div>
          <div className="text-3xl font-bold">{overallAvg.toFixed(1)}%</div>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-8 h-8 opacity-80" />
            <div className="text-sm opacity-80">Total XP Earned</div>
          </div>
          <div className="text-3xl font-bold">{totalXP}</div>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8 opacity-80" />
            <div className="text-sm opacity-80">Assignments</div>
          </div>
          <div className="text-3xl font-bold">{filteredData.length}</div>
        </div>
        <div className="bg-gradient-to-br from-pink-500 to-pink-600 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-8 h-8 opacity-80" />
            <div className="text-sm opacity-80">Active Subjects</div>
          </div>
          <div className="text-3xl font-bold">{subjects.length - 1}</div>
        </div>
      </div>

      {/* Subject Filter */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-wrap gap-2">
        {subjects.map(subject => (
          <button
            key={subject}
            onClick={() => setSelectedSubject(subject)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              selectedSubject === subject
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {subject}
          </button>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Score Trend */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-6">Score Trend Over Time</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="dateFormatted" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                />
                <Area type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* XP Earned */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-6">XP Earned Over Time</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="dateFormatted" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                />
                <Line type="monotone" dataKey="xpEarned" stroke="#10b981" strokeWidth={3} dot={{r: 4, fill: '#10b981'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subject Comparison */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 lg:col-span-2">
          <h3 className="font-bold text-slate-800 mb-6">Performance by Subject</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectAverages}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  cursor={{fill: '#f8fafc'}}
                />
                <Bar dataKey="avgScore" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={60} name="Average Score (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};