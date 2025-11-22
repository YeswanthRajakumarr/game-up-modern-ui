import React, { useState } from 'react';
import { TrendingUp, Target, BookOpen, Clock, AlertTriangle, Lightbulb, BarChart3, PieChart } from 'lucide-react';
import { MOCK_WEAK_AREAS, MOCK_PERFORMANCE } from '../../../shared/mockData';
import type { WeakArea } from '../../../shared/types';
import { useAuth } from '../../global-context/AuthContext';
import { Icon3DImage } from '../../../shared/components/Icon3DImage';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

export const LearningAnalyticsPage = () => {
  const { user } = useAuth();
  const [timeframe, setTimeframe] = useState<'WEEK' | 'MONTH' | 'SEMESTER'>('MONTH');

  const weakAreas = MOCK_WEAK_AREAS;
  const performanceData = MOCK_PERFORMANCE.slice(-7).map(p => ({
    date: new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    score: p.score,
    xp: p.xpEarned,
  }));

  // Subject performance radar data
  const subjectPerformance = [
    { subject: 'Math', score: 88, fullMark: 100 },
    { subject: 'Science', score: 92, fullMark: 100 },
    { subject: 'History', score: 85, fullMark: 100 },
    { subject: 'English', score: 90, fullMark: 100 },
  ];

  // Learning time data
  const learningTime = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 3.0 },
    { day: 'Wed', hours: 2.0 },
    { day: 'Thu', hours: 3.5 },
    { day: 'Fri', hours: 2.5 },
    { day: 'Sat', hours: 1.5 },
    { day: 'Sun', hours: 1.0 },
  ];

  const totalHours = learningTime.reduce((sum, d) => sum + d.hours, 0);
  const averageHours = (totalHours / learningTime.length).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Icon3DImage type="star" size={48} float={true} />
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Learning Analytics</h1>
            <p className="text-slate-500 mt-1">Data-driven insights for personalized learning</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {(['WEEK', 'MONTH', 'SEMESTER'] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                timeframe === tf
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-2xl text-white">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-6 h-6" />
            <div className="text-2xl font-bold">88%</div>
          </div>
          <div className="text-sm opacity-90">Overall Performance</div>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-2xl text-white">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-6 h-6" />
            <div className="text-2xl font-bold">{averageHours}h</div>
          </div>
          <div className="text-sm opacity-90">Avg Daily Study Time</div>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-6 rounded-2xl text-white">
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-6 h-6" />
            <div className="text-2xl font-bold">12</div>
          </div>
          <div className="text-sm opacity-90">Goals Completed</div>
        </div>
        <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-6 rounded-2xl text-white">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-6 h-6" />
            <div className="text-2xl font-bold">45</div>
          </div>
          <div className="text-sm opacity-90">Topics Mastered</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trend */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Performance Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="score" stroke="#6366f1" fillOpacity={1} fill="url(#colorScore)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Subject Performance Radar */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <PieChart className="w-5 h-5" />
            Subject Performance
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={subjectPerformance}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar name="Performance" dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.6} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Weak Areas */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          Areas Needing Improvement
        </h3>
        <div className="space-y-4">
          {weakAreas.map((area, index) => (
            <div key={index} className="border border-slate-200 rounded-xl p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-slate-800">{area.subject}</span>
                    <span className="text-sm text-slate-500">•</span>
                    <span className="text-slate-600">{area.topic}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden max-w-xs">
                      <div
                        className="h-full bg-amber-500 transition-all"
                        style={{ width: `${area.score}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-slate-700">{area.score}%</span>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r-lg">
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-blue-900 mb-1">Recommendation:</p>
                    <p className="text-sm text-blue-800">{area.recommendation}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Time Analysis */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Study Time Analysis
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={learningTime}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="hours" fill="#6366f1" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 text-center text-slate-600">
          Total study time this week: <span className="font-bold text-slate-800">{totalHours} hours</span>
        </div>
      </div>

      {/* Learning Recommendations */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-indigo-600" />
          Personalized Learning Path
        </h3>
        <div className="space-y-3">
          <div className="bg-white rounded-xl p-4 border border-indigo-200">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-2 rounded-lg">
                <BookOpen className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-800">Focus on Calculus</h4>
                <p className="text-sm text-slate-600">Complete 3 practice quizzes to improve your score</p>
              </div>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-semibold">
                Start
              </button>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-indigo-200">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-100 p-2 rounded-lg">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-800">Review Organic Chemistry</h4>
                <p className="text-sm text-slate-600">Watch video lessons on chemical bonding</p>
              </div>
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-semibold">
                Start
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
