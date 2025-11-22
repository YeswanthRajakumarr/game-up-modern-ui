import React, { useState } from 'react';
import { Target, Clock, Award, CheckCircle, Lock, Zap } from 'lucide-react';
import type { Challenge } from '../../../shared/types';
import { Icon3DEnhanced, FloatingIcon3D } from '../../../shared/components/Icon3D';
import { Icon3DImage } from '../../../shared/components/Icon3DImage';

const MOCK_CHALLENGES: Challenge[] = [
  {
    id: 'c1',
    title: 'Daily Quest: Math Master',
    description: 'Complete 3 Math tasks today',
    type: 'DAILY',
    xpReward: 150,
    badgeReward: 'b2',
    progress: 2,
    target: 3,
    status: 'ACTIVE',
    expiresAt: '2023-10-09T23:59:59Z',
  },
  {
    id: 'c2',
    title: 'Weekly Challenge: Perfect Week',
    description: 'Complete all assigned tasks this week',
    type: 'WEEKLY',
    xpReward: 500,
    progress: 5,
    target: 7,
    status: 'ACTIVE',
    expiresAt: '2023-10-15T23:59:59Z',
  },
  {
    id: 'c3',
    title: 'Monthly Goal: XP Collector',
    description: 'Earn 2000 XP this month',
    type: 'MONTHLY',
    xpReward: 1000,
    progress: 1250,
    target: 2000,
    status: 'ACTIVE',
    expiresAt: '2023-10-31T23:59:59Z',
  },
  {
    id: 'c4',
    title: 'Special: Science Explorer',
    description: 'Complete 5 Science assignments with A grade',
    type: 'SPECIAL',
    xpReward: 750,
    badgeReward: 'b9',
    progress: 3,
    target: 5,
    status: 'ACTIVE',
  },
  {
    id: 'c5',
    title: 'Daily Quest: Early Submission',
    description: 'Submit 2 tasks before deadline',
    type: 'DAILY',
    xpReward: 100,
    progress: 1,
    target: 2,
    status: 'ACTIVE',
    expiresAt: '2023-10-09T23:59:59Z',
  },
  {
    id: 'c6',
    title: 'Weekly Challenge: Top Performer',
    description: 'Maintain top 3 position on leaderboard',
    type: 'WEEKLY',
    xpReward: 600,
    progress: 1, // Currently rank 1
    target: 1,
    status: 'COMPLETED',
    expiresAt: '2023-10-15T23:59:59Z',
  },
];

export const ChallengesPage = () => {
  const [filter, setFilter] = useState<'ALL' | 'ACTIVE' | 'COMPLETED' | 'LOCKED'>('ALL');

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'DAILY':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'WEEKLY':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'MONTHLY':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'SPECIAL':
        return 'bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 border-yellow-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return (
          <Icon3DEnhanced 
            icon={CheckCircle} 
            size={20}
            gradient="linear-gradient(135deg, #10b981 0%, #059669 100%)"
            glow={true}
            glowColor="#10b981"
          />
        );
      case 'LOCKED':
        return <Lock className="w-5 h-5 text-slate-400" />;
      default:
        return (
          <Icon3DEnhanced 
            icon={Target} 
            size={20}
            gradient="linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)"
            glow={true}
            glowColor="#6366f1"
          />
        );
    }
  };

  const filteredChallenges = MOCK_CHALLENGES.filter(challenge => {
    if (filter === 'ALL') return true;
    return challenge.status === filter;
  });

  const activeCount = MOCK_CHALLENGES.filter(c => c.status === 'ACTIVE').length;
  const completedCount = MOCK_CHALLENGES.filter(c => c.status === 'COMPLETED').length;
  const totalXPReward = MOCK_CHALLENGES.filter(c => c.status === 'ACTIVE').reduce((sum, c) => sum + c.xpReward, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Challenges & Quests</h1>
        <p className="text-slate-500 mt-1">Complete challenges to earn bonus XP and rewards</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <Icon3DImage type="target" size={40} float={true} />
            <div className="text-3xl font-bold">{activeCount}</div>
          </div>
          <div className="text-sm opacity-90">Active Challenges</div>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <Icon3DEnhanced 
              icon={CheckCircle} 
              size={32}
              glow={true}
              glowColor="#ffffff"
              color="#ffffff"
            />
            <div className="text-3xl font-bold">{completedCount}</div>
          </div>
          <div className="text-sm opacity-90">Completed</div>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <Icon3DImage type="zap" size={40} float={true} />
            <div className="text-3xl font-bold">{totalXPReward}</div>
          </div>
          <div className="text-sm opacity-90">Available XP</div>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex gap-2">
        {(['ALL', 'ACTIVE', 'COMPLETED', 'LOCKED'] as const).map(f => (
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

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChallenges.map(challenge => {
          const progress = (challenge.progress / challenge.target) * 100;
          const isCompleted = challenge.status === 'COMPLETED';
          const isLocked = challenge.status === 'LOCKED';
          
          return (
            <div
              key={challenge.id}
              className={`bg-white rounded-2xl border-2 p-6 shadow-lg transition-all hover:scale-105 ${
                isCompleted
                  ? 'border-emerald-400 bg-emerald-50'
                  : isLocked
                  ? 'border-slate-200 opacity-60'
                  : 'border-indigo-200'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getStatusIcon(challenge.status)}
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getTypeColor(challenge.type)}`}>
                    {challenge.type}
                  </span>
                </div>
                {challenge.badgeReward && (
                  <Award className="w-5 h-5 text-yellow-500" />
                )}
              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-2">{challenge.title}</h3>
              <p className="text-sm text-slate-600 mb-4">{challenge.description}</p>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-slate-600">Progress</span>
                  <span className="font-bold text-slate-800">
                    {challenge.progress} / {challenge.target}
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      isCompleted
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                        : 'bg-gradient-to-r from-indigo-500 to-purple-500'
                    }`}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Rewards */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span className="font-bold text-slate-800">+{challenge.xpReward} XP</span>
                </div>
                {challenge.expiresAt && (
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Clock className="w-3 h-3" />
                    <span>
                      {new Date(challenge.expiresAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>

              {isCompleted && (
                <div className="mt-4 p-3 bg-emerald-100 rounded-lg border border-emerald-200">
                  <p className="text-xs text-emerald-700 font-medium text-center">
                    ✅ Challenge Completed!
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
