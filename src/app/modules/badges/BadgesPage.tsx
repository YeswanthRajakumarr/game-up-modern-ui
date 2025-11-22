import React, { useState } from 'react';
import { Award, Trophy, Star, Zap, Target, Filter, Sparkles } from 'lucide-react';
import type { Badge } from '../../../shared/types';
import { Icon3DEnhanced, FloatingIcon3D } from '../../../shared/components/Icon3D';
import { Icon3DImage } from '../../../shared/components/Icon3DImage';

const MOCK_BADGES: Badge[] = [
  { id: 'b1', name: 'First Steps', description: 'Complete your first task', icon: '🎯', rarity: 'COMMON', category: 'ACADEMIC', unlockedAt: '2023-09-01', progress: 1, maxProgress: 1 },
  { id: 'b2', name: 'Math Wizard', description: 'Score A+ in 5 Math assignments', icon: '🧮', rarity: 'RARE', category: 'ACADEMIC', progress: 3, maxProgress: 5 },
  { id: 'b3', name: 'Perfect Week', description: 'Complete all tasks for 7 days', icon: '🔥', rarity: 'EPIC', category: 'STREAK', progress: 5, maxProgress: 7 },
  { id: 'b4', name: 'Early Bird', description: 'Submit 10 tasks before deadline', icon: '⏰', rarity: 'RARE', category: 'ACADEMIC', progress: 7, maxProgress: 10 },
  { id: 'b5', name: 'Social Butterfly', description: 'Help 5 classmates with tasks', icon: '🦋', rarity: 'COMMON', category: 'SOCIAL', progress: 2, maxProgress: 5 },
  { id: 'b6', name: 'Centurion', description: 'Earn 10,000 XP', icon: '💯', rarity: 'LEGENDARY', category: 'SPECIAL', progress: 1250, maxProgress: 10000 },
  { id: 'b7', name: 'Perfect Attendance', description: '100% attendance for a month', icon: '📅', rarity: 'EPIC', category: 'ATTENDANCE', progress: 20, maxProgress: 30 },
  { id: 'b8', name: 'Top Performer', description: 'Rank #1 on leaderboard', icon: '👑', rarity: 'LEGENDARY', category: 'SPECIAL', unlockedAt: '2023-10-01', progress: 1, maxProgress: 1 },
];

export const BadgesPage = () => {
  const [filter, setFilter] = useState<'ALL' | 'UNLOCKED' | 'LOCKED' | 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY'>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'LEGENDARY':
        return 'from-yellow-400 via-orange-500 to-red-500 border-yellow-400';
      case 'EPIC':
        return 'from-purple-500 to-pink-500 border-purple-400';
      case 'RARE':
        return 'from-blue-500 to-cyan-500 border-blue-400';
      default:
        return 'from-slate-400 to-slate-600 border-slate-400';
    }
  };

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case 'LEGENDARY':
        return 'shadow-[0_0_20px_rgba(251,191,36,0.5)]';
      case 'EPIC':
        return 'shadow-[0_0_20px_rgba(168,85,247,0.5)]';
      case 'RARE':
        return 'shadow-[0_0_15px_rgba(59,130,246,0.4)]';
      default:
        return '';
    }
  };

  const filteredBadges = MOCK_BADGES.filter(badge => {
    if (filter === 'UNLOCKED' && !badge.unlockedAt) return false;
    if (filter === 'LOCKED' && badge.unlockedAt) return false;
    if (filter !== 'ALL' && filter !== 'UNLOCKED' && filter !== 'LOCKED' && badge.rarity !== filter) return false;
    if (categoryFilter !== 'ALL' && badge.category !== categoryFilter) return false;
    return true;
  });

  const unlockedCount = MOCK_BADGES.filter(b => b.unlockedAt).length;
  const totalXP = MOCK_BADGES.filter(b => b.unlockedAt).reduce((sum, b) => sum + (b.rarity === 'LEGENDARY' ? 500 : b.rarity === 'EPIC' ? 300 : b.rarity === 'RARE' ? 150 : 50), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Badges & Achievements</h1>
          <p className="text-slate-500 mt-1">Unlock achievements and showcase your accomplishments</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <Icon3DImage type="trophy" size={40} float={true} />
            <div className="text-2xl font-bold">{unlockedCount}</div>
          </div>
          <div className="text-sm opacity-90">Badges Unlocked</div>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <Icon3DImage type="star" size={40} float={true} />
            <div className="text-2xl font-bold">{totalXP}</div>
          </div>
          <div className="text-sm opacity-90">Total Achievement XP</div>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <Icon3DEnhanced 
              icon={Target} 
              size={32}
              glow={true}
              glowColor="#ffffff"
              color="#ffffff"
            />
            <div className="text-2xl font-bold">{Math.round((unlockedCount / MOCK_BADGES.length) * 100)}%</div>
          </div>
          <div className="text-sm opacity-90">Collection Complete</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 space-y-4">
        <div className="flex flex-wrap gap-2">
          {(['ALL', 'UNLOCKED', 'LOCKED'] as const).map(f => (
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
        <div className="flex flex-wrap gap-2">
          {(['ALL', 'COMMON', 'RARE', 'EPIC', 'LEGENDARY'] as const).map(r => (
            <button
              key={r}
              onClick={() => setFilter(r)}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                filter === r
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {['ALL', 'ACADEMIC', 'ATTENDANCE', 'STREAK', 'SOCIAL', 'SPECIAL'].map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                categoryFilter === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBadges.map(badge => {
          const isUnlocked = !!badge.unlockedAt;
          const progress = badge.progress && badge.maxProgress ? (badge.progress / badge.maxProgress) * 100 : 0;
          
          return (
            <div
              key={badge.id}
              className={`relative bg-white rounded-2xl border-2 p-6 transition-all hover:scale-105 ${
                isUnlocked
                  ? `bg-gradient-to-br ${getRarityColor(badge.rarity)} ${getRarityGlow(badge.rarity)} border-2`
                  : 'border-slate-200 opacity-60'
              }`}
            >
              {isUnlocked && (
                <div className="absolute top-2 right-2">
                  <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
                </div>
              )}
              
              <div className="text-center mb-4">
                <div className={`text-6xl mb-3 ${!isUnlocked ? 'grayscale opacity-50' : ''}`}>
                  {badge.icon}
                </div>
                <h3 className={`font-bold text-lg mb-1 ${isUnlocked ? 'text-white' : 'text-slate-700'}`}>
                  {badge.name}
                </h3>
                <p className={`text-sm mb-3 ${isUnlocked ? 'text-white/90' : 'text-slate-500'}`}>
                  {badge.description}
                </p>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  isUnlocked 
                    ? 'bg-white/20 text-white border border-white/30'
                    : 'bg-slate-200 text-slate-600'
                }`}>
                  {badge.rarity}
                </span>
              </div>

              {!isUnlocked && badge.progress !== undefined && (
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-slate-600 mb-1">
                    <span>Progress</span>
                    <span>{badge.progress} / {badge.maxProgress}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {isUnlocked && badge.unlockedAt && (
                <div className="mt-4 text-center">
                  <p className="text-xs text-white/80">
                    Unlocked {new Date(badge.unlockedAt).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
