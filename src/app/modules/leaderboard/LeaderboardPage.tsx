import React, { useState } from 'react';
import { MOCK_LEADERBOARD } from '../../../shared/mockData';
import { Trophy, TrendingUp, TrendingDown, Minus, Medal, Filter } from 'lucide-react';
import { Icon3DEnhanced, FloatingIcon3D } from '../../../shared/components/Icon3D';
import { Icon3DImage } from '../../../shared/components/Icon3DImage';

export const LeaderboardPage = () => {
  const [category, setCategory] = useState<'ALL' | 'MATH' | 'SCIENCE' | 'HISTORY' | 'ENGLISH'>('ALL');
  
  const topThree = MOCK_LEADERBOARD.slice(0, 3);
  const rest = MOCK_LEADERBOARD.slice(3);

  // In a real app, this would filter by subject-specific XP
  const filteredLeaderboard = category === 'ALL' 
    ? MOCK_LEADERBOARD 
    : MOCK_LEADERBOARD; // Mock data doesn't have subject-specific XP yet

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-800">Class Leaderboard</h1>
          <p className="text-slate-500">Top performers this semester</p>
      </div>

      {/* Category Filter */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex justify-center gap-2">
        {(['ALL', 'MATH', 'SCIENCE', 'HISTORY', 'ENGLISH'] as const).map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
              category === cat
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat === 'ALL' ? 'Overall' : cat}
          </button>
        ))}
      </div>

      {/* Podium */}
      <div className="flex justify-center items-end gap-4 pb-8 min-h-[300px]">
          {/* 2nd Place */}
          <div className="flex flex-col items-center">
             <div className="w-20 h-20 rounded-full border-4 border-slate-200 overflow-hidden mb-3 shadow-lg relative z-10">
                 <img src={topThree[1].avatar} alt={topThree[1].studentName} className="w-full h-full object-cover" />
                 <div className="absolute bottom-0 w-full bg-slate-300 text-slate-800 text-[10px] font-bold text-center py-0.5">
                     #{topThree[1].rank}
                 </div>
             </div>
             <div className="text-center mb-2">
                 <div className="font-bold text-slate-700">{topThree[1].studentName}</div>
                 <div className="text-sm text-slate-500 font-medium">{topThree[1].xp} XP</div>
             </div>
             <div className="w-24 h-32 bg-gradient-to-t from-slate-300 to-slate-100 rounded-t-lg shadow-inner flex items-end justify-center pb-4 relative">
                 <div className="text-4xl font-bold text-slate-400 opacity-20">2</div>
             </div>
          </div>

          {/* 1st Place */}
          <div className="flex flex-col items-center -mt-8">
             <div className="relative">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                  <Icon3DImage type="trophy" size={48} float={true} />
                </div>
                <div className="w-24 h-24 rounded-full border-4 border-yellow-400 overflow-hidden mb-3 shadow-xl shadow-yellow-400/20 relative z-10">
                    <img src={topThree[0].avatar} alt={topThree[0].studentName} className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 w-full bg-yellow-400 text-yellow-900 text-xs font-bold text-center py-0.5">
                        #{topThree[0].rank}
                    </div>
                </div>
             </div>
             <div className="text-center mb-2">
                 <div className="font-bold text-slate-800 text-lg">{topThree[0].studentName}</div>
                 <div className="text-sm text-indigo-600 font-bold">{topThree[0].xp} XP</div>
             </div>
             <div className="w-28 h-40 bg-gradient-to-t from-yellow-400 to-yellow-100 rounded-t-lg shadow-[0_0_30px_rgba(250,204,21,0.3)] flex items-end justify-center pb-4 relative overflow-hidden">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                 <div className="text-5xl font-bold text-yellow-600 opacity-20">1</div>
             </div>
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center">
             <div className="w-20 h-20 rounded-full border-4 border-amber-600 overflow-hidden mb-3 shadow-lg relative z-10">
                 <img src={topThree[2].avatar} alt={topThree[2].studentName} className="w-full h-full object-cover" />
                 <div className="absolute bottom-0 w-full bg-amber-600 text-white text-[10px] font-bold text-center py-0.5">
                     #{topThree[2].rank}
                 </div>
             </div>
             <div className="text-center mb-2">
                 <div className="font-bold text-slate-700">{topThree[2].studentName}</div>
                 <div className="text-sm text-slate-500 font-medium">{topThree[2].xp} XP</div>
             </div>
             <div className="w-24 h-24 bg-gradient-to-t from-amber-600 to-amber-100 rounded-t-lg shadow-inner flex items-end justify-center pb-4 relative">
                 <div className="text-4xl font-bold text-amber-800 opacity-20">3</div>
             </div>
          </div>
      </div>

      {/* Rest of the list */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden max-w-3xl mx-auto">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <div className="w-16 text-center">Rank</div>
              <div className="flex-1">Student</div>
              <div className="w-24 text-right">XP</div>
              <div className="w-16 text-center">Trend</div>
          </div>
          
          <div className="divide-y divide-slate-50">
            {rest.map((student) => (
                <div key={student.studentId} className="p-4 flex items-center hover:bg-slate-50 transition-colors">
                    <div className="w-16 text-center font-bold text-slate-500">#{student.rank}</div>
                    <div className="flex-1 flex items-center gap-3">
                        <img src={student.avatar} alt={student.studentName} className="w-8 h-8 rounded-full" />
                        <span className="font-medium text-slate-700">{student.studentName}</span>
                    </div>
                    <div className="w-24 text-right font-bold text-indigo-600">{student.xp}</div>
                    <div className="w-16 flex justify-center">
                        {student.trend === 'UP' && <TrendingUp className="w-4 h-4 text-emerald-500" />}
                        {student.trend === 'DOWN' && <TrendingDown className="w-4 h-4 text-red-500" />}
                        {student.trend === 'SAME' && <Minus className="w-4 h-4 text-slate-400" />}
                    </div>
                </div>
            ))}
          </div>
      </div>
    </div>
  );
};
