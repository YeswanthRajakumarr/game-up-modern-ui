import React, { useState } from 'react';
import { TrendingUp, Award, Star, Zap, Target, Trophy, Calendar, CheckCircle } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, subDays } from 'date-fns';
import type { XPMilestone } from '../../../shared/types';
import { Icon3DEnhanced, FloatingIcon3D } from '../../../shared/components/Icon3D';
import { Icon3DImage } from '../../../shared/components/Icon3DImage';

const MOCK_XP_HISTORY = [
  { date: format(subDays(new Date(), 6), 'yyyy-MM-dd'), xp: 50, source: 'Task Completion' },
  { date: format(subDays(new Date(), 5), 'yyyy-MM-dd'), xp: 100, source: 'Task Completion' },
  { date: format(subDays(new Date(), 4), 'yyyy-MM-dd'), xp: 150, source: 'Challenge Reward' },
  { date: format(subDays(new Date(), 3), 'yyyy-MM-dd'), xp: 80, source: 'Task Completion' },
  { date: format(subDays(new Date(), 2), 'yyyy-MM-dd'), xp: 200, source: 'Badge Unlock' },
  { date: format(subDays(new Date(), 1), 'yyyy-MM-dd'), xp: 120, source: 'Task Completion' },
  { date: format(new Date(), 'yyyy-MM-dd'), xp: 90, source: 'Task Completion' },
];

const MOCK_MILESTONES: XPMilestone[] = [
  { id: 'm1', level: 1, xpRequired: 0, title: 'Beginner', reward: 'Welcome Badge', unlocked: true, unlockedAt: '2023-09-01' },
  { id: 'm2', level: 2, xpRequired: 100, title: 'Rising Star', reward: '100 XP Badge', unlocked: true, unlockedAt: '2023-09-05' },
  { id: 'm3', level: 3, xpRequired: 250, title: 'Dedicated Learner', reward: '250 XP Badge', unlocked: true, unlockedAt: '2023-09-12' },
  { id: 'm4', level: 4, xpRequired: 500, title: 'Knowledge Seeker', reward: '500 XP Badge', unlocked: true, unlockedAt: '2023-09-25' },
  { id: 'm5', level: 5, xpRequired: 1000, title: 'Academic Achiever', reward: '1000 XP Badge', unlocked: true, unlockedAt: '2023-10-01' },
  { id: 'm6', level: 6, xpRequired: 1500, title: 'Elite Scholar', reward: '1500 XP Badge + Special Avatar', unlocked: false },
  { id: 'm7', level: 7, xpRequired: 2500, title: 'Master Student', reward: '2500 XP Badge + Profile Theme', unlocked: false },
  { id: 'm8', level: 8, xpRequired: 5000, title: 'Legendary Learner', reward: '5000 XP Badge + Exclusive Title', unlocked: false },
];

export const XPHistoryPage = () => {
  const [currentXP] = useState(1250);
  const [selectedPeriod, setSelectedPeriod] = useState<'WEEK' | 'MONTH' | 'ALL'>('WEEK');

  const chartData = MOCK_XP_HISTORY.map(h => ({
    date: format(new Date(h.date), 'MMM dd'),
    xp: h.xp,
    cumulative: MOCK_XP_HISTORY.filter(d => d.date <= h.date).reduce((sum, d) => sum + d.xp, 0),
  }));

  const nextMilestone = MOCK_MILESTONES.find(m => !m.unlocked);
  const currentLevel = MOCK_MILESTONES.filter(m => m.unlocked).length;
  const progressToNext = nextMilestone 
    ? ((currentXP - MOCK_MILESTONES[currentLevel - 1]?.xpRequired || 0) / (nextMilestone.xpRequired - (MOCK_MILESTONES[currentLevel - 1]?.xpRequired || 0))) * 100
    : 100;

  const totalXPEarned = MOCK_XP_HISTORY.reduce((sum, h) => sum + h.xp, 0);
  const averageDailyXP = Math.round(totalXPEarned / MOCK_XP_HISTORY.length);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">XP History & Milestones</h1>
        <p className="text-slate-500 mt-1">Track your XP journey and unlock amazing rewards</p>
      </div>

      {/* Current Level Card */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 rounded-2xl text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-sm opacity-90 mb-2">Current Level</div>
              <div className="text-5xl font-bold mb-2">Level {currentLevel}</div>
              <div className="text-2xl opacity-90">{currentXP} XP</div>
            </div>
            <div className="text-right">
              <Icon3DImage type="trophy" size={64} float={true} />
              <div className="text-sm opacity-90">{nextMilestone?.title || 'Max Level'}</div>
            </div>
          </div>
          
          {nextMilestone && (
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Progress to Level {nextMilestone.level}</span>
                <span>{currentXP} / {nextMilestone.xpRequired} XP</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-white h-full rounded-full transition-all shadow-lg"
                  style={{ width: `${Math.min(progressToNext, 100)}%` }}
                ></div>
              </div>
              <div className="mt-2 text-sm opacity-90">
                {nextMilestone.xpRequired - currentXP} XP needed for next level
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-2">
            <Icon3DImage type="zap" size={32} float={true} />
            <div className="text-2xl font-bold text-slate-800">{totalXPEarned}</div>
          </div>
          <div className="text-sm text-slate-500">Total XP This Week</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-2">
            <Icon3DEnhanced 
              icon={TrendingUp} 
              size={24}
              gradient="linear-gradient(135deg, #10b981 0%, #059669 100%)"
              glow={true}
              glowColor="#10b981"
            />
            <div className="text-2xl font-bold text-slate-800">{averageDailyXP}</div>
          </div>
          <div className="text-sm text-slate-500">Average Daily XP</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-2">
            <Icon3DImage type="star" size={32} float={true} />
            <div className="text-2xl font-bold text-slate-800">{MOCK_MILESTONES.filter(m => m.unlocked).length}</div>
          </div>
          <div className="text-sm text-slate-500">Milestones Unlocked</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* XP History Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800">XP Earned Over Time</h3>
            <div className="flex gap-2">
              {(['WEEK', 'MONTH', 'ALL'] as const).map(period => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                    selectedPeriod === period
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorXP" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                />
                <Area type="monotone" dataKey="xp" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorXP)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent XP Activity */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-6">Recent XP Activity</h3>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {MOCK_XP_HISTORY.slice().reverse().map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-800 text-sm">{activity.source}</div>
                    <div className="text-xs text-slate-500">{format(new Date(activity.date), 'MMM dd, yyyy')}</div>
                  </div>
                </div>
                <div className="text-indigo-600 font-bold">+{activity.xp} XP</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="font-bold text-slate-800 mb-6">Level Milestones</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {MOCK_MILESTONES.map((milestone, index) => {
            const isUnlocked = milestone.unlocked;
            const isNext = !isUnlocked && index === MOCK_MILESTONES.findIndex(m => !m.unlocked);
            
            return (
              <div
                key={milestone.id}
                className={`p-4 rounded-xl border-2 transition-all ${
                  isUnlocked
                    ? 'border-emerald-400 bg-emerald-50'
                    : isNext
                    ? 'border-indigo-400 bg-indigo-50 ring-2 ring-indigo-200'
                    : 'border-slate-200 bg-slate-50 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`text-2xl font-bold ${isUnlocked ? 'text-emerald-600' : isNext ? 'text-indigo-600' : 'text-slate-400'}`}>
                    Lv.{milestone.level}
                  </div>
                  {isUnlocked && <CheckCircle className="w-5 h-5 text-emerald-500" />}
                  {isNext && <Target className="w-5 h-5 text-indigo-500 animate-pulse" />}
                </div>
                <h4 className="font-bold text-slate-800 mb-1">{milestone.title}</h4>
                <p className="text-xs text-slate-600 mb-2">{milestone.reward}</p>
                <div className="text-sm font-semibold text-slate-700">
                  {milestone.xpRequired} XP Required
                </div>
                {milestone.unlockedAt && (
                  <div className="text-xs text-slate-500 mt-2">
                    Unlocked {format(new Date(milestone.unlockedAt), 'MMM dd')}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
