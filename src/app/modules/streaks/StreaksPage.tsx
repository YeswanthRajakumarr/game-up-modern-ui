import React from 'react';
import { Flame, Calendar, CheckCircle, TrendingUp, Award } from 'lucide-react';
import type { Streak } from '../../../shared/types';
import { Icon3DEnhanced, FloatingIcon3D } from '../../../shared/components/Icon3D';

const MOCK_STREAKS: Streak[] = [
  { type: 'LOGIN', current: 12, longest: 15, lastDate: '2023-10-08' },
  { type: 'TASK_COMPLETION', current: 8, longest: 10, lastDate: '2023-10-08' },
  { type: 'PERFECT_ATTENDANCE', current: 5, longest: 7, lastDate: '2023-10-08' },
];

export const StreaksPage = () => {
  const getStreakIcon = (type: string) => {
    switch (type) {
      case 'LOGIN':
        return (
          <Icon3DEnhanced 
            icon={Calendar} 
            size={32}
            gradient="linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"
            glow={true}
            glowColor="#3b82f6"
          />
        );
      case 'TASK_COMPLETION':
        return (
          <Icon3DEnhanced 
            icon={CheckCircle} 
            size={32}
            gradient="linear-gradient(135deg, #10b981 0%, #059669 100%)"
            glow={true}
            glowColor="#10b981"
          />
        );
      case 'PERFECT_ATTENDANCE':
        return (
          <Icon3DEnhanced 
            icon={Award} 
            size={32}
            gradient="linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
            glow={true}
            glowColor="#f59e0b"
          />
        );
      default:
        return (
          <FloatingIcon3D 
            icon={Flame} 
            size={32}
            color="#f97316"
            float={true}
          />
        );
    }
  };

  const getStreakTitle = (type: string) => {
    switch (type) {
      case 'LOGIN':
        return 'Login Streak';
      case 'TASK_COMPLETION':
        return 'Task Completion';
      case 'PERFECT_ATTENDANCE':
        return 'Perfect Attendance';
      default:
        return 'Streak';
    }
  };

  const getStreakDescription = (type: string) => {
    switch (type) {
      case 'LOGIN':
        return 'Days logged in consecutively';
      case 'TASK_COMPLETION':
        return 'Days with completed tasks';
      case 'PERFECT_ATTENDANCE':
        return 'Days with perfect attendance';
      default:
        return 'Keep it going!';
    }
  };

  const totalStreakDays = MOCK_STREAKS.reduce((sum, s) => sum + s.current, 0);
  const longestStreak = Math.max(...MOCK_STREAKS.map(s => s.longest));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Streaks</h1>
        <p className="text-slate-500 mt-1">Maintain your momentum and build impressive streaks!</p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-orange-500 to-red-600 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <FloatingIcon3D 
              icon={Flame} 
              size={32}
              color="#ffffff"
              float={true}
            />
            <div className="text-3xl font-bold">{totalStreakDays}</div>
          </div>
          <div className="text-sm opacity-90">Total Active Streaks</div>
        </div>
        <div className="bg-gradient-to-br from-yellow-500 to-orange-600 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <Icon3DEnhanced 
              icon={TrendingUp} 
              size={32}
              glow={true}
              glowColor="#ffffff"
              color="#ffffff"
            />
            <div className="text-3xl font-bold">{longestStreak}</div>
          </div>
          <div className="text-sm opacity-90">Longest Streak</div>
        </div>
        <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <Icon3DEnhanced 
              icon={Award} 
              size={32}
              glow={true}
              glowColor="#ffffff"
              color="#ffffff"
            />
            <div className="text-3xl font-bold">{MOCK_STREAKS.length}</div>
          </div>
          <div className="text-sm opacity-90">Active Streak Types</div>
        </div>
      </div>

      {/* Streak Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_STREAKS.map((streak, index) => {
          const isHot = streak.current >= 7;
          const progress = (streak.current / Math.max(streak.longest, streak.current + 5)) * 100;
          
          return (
            <div
              key={index}
              className={`bg-white rounded-2xl border-2 p-6 shadow-lg transition-all hover:scale-105 ${
                isHot
                  ? 'border-orange-400 bg-gradient-to-br from-orange-50 to-red-50'
                  : 'border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${
                  isHot ? 'bg-orange-100 text-orange-600' : 'bg-indigo-100 text-indigo-600'
                }`}>
                  {getStreakIcon(streak.type)}
                </div>
                {isHot && (
                  <div className="flex items-center gap-1 text-orange-600 font-bold">
                    <Flame className="w-5 h-5 animate-pulse" />
                    <span>HOT!</span>
                  </div>
                )}
              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-1">
                {getStreakTitle(streak.type)}
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                {getStreakDescription(streak.type)}
              </p>

              <div className="mb-4">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-slate-800">{streak.current}</span>
                  <span className="text-slate-500">days</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      isHot
                        ? 'bg-gradient-to-r from-orange-500 to-red-500'
                        : 'bg-gradient-to-r from-indigo-500 to-purple-500'
                    }`}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Longest Streak:</span>
                  <span className="font-bold text-slate-800">{streak.longest} days</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-slate-600">Last Active:</span>
                  <span className="font-medium text-slate-700">
                    {new Date(streak.lastDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {streak.current >= 3 && streak.current < streak.longest && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-xs text-blue-700">
                    🔥 {streak.longest - streak.current} more days to beat your record!
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Streak Tips */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl border border-indigo-200">
        <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-500" />
          Streak Tips
        </h3>
        <ul className="space-y-2 text-sm text-slate-700">
          <li>✅ Log in daily to maintain your login streak</li>
          <li>✅ Complete at least one task every day</li>
          <li>✅ Maintain perfect attendance for bonus streaks</li>
          <li>✅ Streaks reset if you miss a day, so stay consistent!</li>
        </ul>
      </div>
    </div>
  );
};
