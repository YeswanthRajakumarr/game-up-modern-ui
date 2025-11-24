import React, { useState } from 'react';
import { User, Mail, GraduationCap, Award, TrendingUp, Calendar, Edit, Camera, Settings, Trophy, Zap, Flame, Target } from 'lucide-react';
import { MOCK_USERS, MOCK_BADGES, MOCK_STREAKS, MOCK_CHALLENGES, MOCK_PERFORMANCE } from '../../../shared/mockData';
import { useAuth } from '../../global-context/AuthContext';
import { Icon3DImage } from '../../../shared/components/Icon3DImage';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

export const StudentProfilePage = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  // Get student data
  const student = MOCK_USERS.find(u => u.id === user?.id && u.role === 'STUDENT') as any;
  const badges = MOCK_BADGES.filter(b => b.unlockedAt);
  const streaks = MOCK_STREAKS;
  const activeChallenges = MOCK_CHALLENGES.filter(c => c.status === 'ACTIVE');
  const recentPerformance = MOCK_PERFORMANCE.slice(-6);

  // Calculate level from XP
  const calculateLevel = (xp: number) => {
    return Math.floor(xp / 500) + 1;
  };

  const level = student ? calculateLevel(student.xp) : 1;
  const xpForNextLevel = level * 500;
  const currentLevelXP = student ? student.xp % 500 : 0;
  const xpProgress = (currentLevelXP / 500) * 100;

  // Performance chart data
  const performanceData = recentPerformance.map(p => ({
    date: format(new Date(p.date), 'MMM dd'),
    score: p.score,
    xp: p.xpEarned,
  }));

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white">
                  {student?.avatar ? (
                    <img src={student.avatar} alt={student?.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-indigo-600">
                      <User className="w-16 h-16" />
                    </div>
                  )}
                </div>
                <button className="absolute bottom-0 right-0 bg-white text-indigo-600 p-2 rounded-full shadow-lg hover:bg-indigo-50 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">{student?.name || 'Student Name'}</h1>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center gap-4 text-indigo-100 mb-4">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>{student?.email || 'student@school.com'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    <span>Grade {student?.grade || '10'} - Section {student?.section || 'A'}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                    <div className="text-xs text-indigo-100 mb-1">Level</div>
                    <div className="text-2xl font-bold">{level}</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                    <div className="text-xs text-indigo-100 mb-1">Total XP</div>
                    <div className="text-2xl font-bold">{student?.xp?.toLocaleString() || '0'}</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                    <div className="text-xs text-indigo-100 mb-1">Rank</div>
                    <div className="text-2xl font-bold">#1</div>
                  </div>
                </div>
              </div>
            </div>
            <button className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>

          {/* XP Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-indigo-100">Progress to Level {level + 1}</span>
              <span className="text-indigo-100">{currentLevelXP} / 500 XP</span>
            </div>
            <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-500"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-indigo-100 p-3 rounded-xl">
              <Icon3DImage type="star" size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">{badges.length}</div>
              <div className="text-sm text-slate-500">Badges Earned</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-amber-100 p-3 rounded-xl">
              <Flame className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">
                {streaks.find(s => s.type === 'LOGIN')?.current || 0}
              </div>
              <div className="text-sm text-slate-500">Day Streak</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-emerald-100 p-3 rounded-xl">
              <Target className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">{activeChallenges.length}</div>
              <div className="text-sm text-slate-500">Active Challenges</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-purple-100 p-3 rounded-xl">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">
                {recentPerformance.length > 0 
                  ? Math.round(recentPerformance.reduce((sum, p) => sum + p.score, 0) / recentPerformance.length)
                  : 0}%
              </div>
              <div className="text-sm text-slate-500">Avg Score</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Badges */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5" />
            Recent Badges
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {badges.slice(0, 6).map((badge) => (
              <div key={badge.id} className="text-center">
                <div className="bg-gradient-to-br from-yellow-400 to-orange-500 w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-2 shadow-lg">
                  {badge.icon}
                </div>
                <div className="text-xs font-semibold text-slate-800">{badge.name}</div>
                <div className="text-xs text-slate-500">
                  {badge.unlockedAt && format(new Date(badge.unlockedAt), 'MMM dd')}
                </div>
              </div>
            ))}
          </div>
          {badges.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              <Award className="w-12 h-12 mx-auto mb-2 text-slate-300" />
              <p>No badges earned yet</p>
            </div>
          )}
        </div>

        {/* Active Challenges */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5" />
            Active Challenges
          </h3>
          <div className="space-y-3">
            {activeChallenges.slice(0, 3).map((challenge) => (
              <div key={challenge.id} className="border border-slate-200 rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-slate-800">{challenge.title}</h4>
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">
                    {challenge.xpReward} XP
                  </span>
                </div>
                <p className="text-sm text-slate-600 mb-3">{challenge.description}</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 transition-all"
                      style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-500">
                    {challenge.progress} / {challenge.target}
                  </span>
                </div>
              </div>
            ))}
            {activeChallenges.length === 0 && (
              <div className="text-center py-8 text-slate-500">
                <Target className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                <p>No active challenges</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Performance Trend
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={2} name="Score" />
            <Line type="monotone" dataKey="xp" stroke="#10b981" strokeWidth={2} name="XP Earned" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Account Information */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Account Information</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-slate-100">
            <div>
              <div className="text-sm text-slate-500">Email</div>
              <div className="font-semibold text-slate-800">{student?.email || 'student@school.com'}</div>
            </div>
            <button className="text-indigo-600 hover:text-indigo-700 text-sm font-semibold">Change</button>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-slate-100">
            <div>
              <div className="text-sm text-slate-500">Grade & Section</div>
              <div className="font-semibold text-slate-800">
                Grade {student?.grade || '10'} - Section {student?.section || 'A'}
              </div>
            </div>
            <button className="text-indigo-600 hover:text-indigo-700 text-sm font-semibold">View</button>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-slate-100">
            <div>
              <div className="text-sm text-slate-500">Member Since</div>
              <div className="font-semibold text-slate-800">
                {format(new Date('2023-09-01'), 'MMMM yyyy')}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <div className="text-sm text-slate-500">Wallet Balance</div>
              <div className="font-semibold text-slate-800 flex items-center gap-2">
                <Icon3DImage type="star" size={20} />
                {student?.wallet || 0} Rupees
              </div>
            </div>
            <button className="text-indigo-600 hover:text-indigo-700 text-sm font-semibold">View Rewards</button>
          </div>
        </div>
      </div>
    </div>
  );
};

