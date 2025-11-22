import React from 'react';
import { MOCK_TASKS, MOCK_LEADERBOARD } from '../../../shared/mockData';
import { Calendar, Trophy, Star, ArrowRight, Clock } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Icon3DEnhanced } from '../../../shared/components/Icon3D';
import { Icon3DImage } from '../../../shared/components/Icon3DImage';

const XP_DATA = [
  { name: 'Math', value: 400, color: '#6366f1' },
  { name: 'Science', value: 300, color: '#ec4899' },
  { name: 'History', value: 200, color: '#f59e0b' },
  { name: 'English', value: 350, color: '#10b981' },
];

export const StudentDashboard = () => {
  const upcomingTasks = MOCK_TASKS.filter(t => t.status === 'PENDING').slice(0, 3);
  const recentAchievements = ['First Submission', 'Math Wizard', 'Early Bird'];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full -mr-16 -mt-16 opacity-50 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500 rounded-full -ml-10 -mb-10 opacity-50 blur-3xl"></div>
        
        <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2">Welcome back, Charlie! 🚀</h2>
            <p className="text-indigo-100 max-w-xl mb-6">You're doing great! You've earned <span className="font-bold text-yellow-300">150 XP</span> this week. Keep it up to reach Level 6!</p>
            
            <div className="flex gap-4">
                <Link to="/tasks" className="bg-white text-indigo-600 px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-50 transition-colors shadow-lg">
                    View Tasks
                </Link>
                <Link to="/rewards" className="bg-indigo-700/50 backdrop-blur-md text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition-colors border border-indigo-500/30">
                    Visit Shop
                </Link>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center hover:scale-[1.02] transition-transform">
                    <div className="mb-3">
                        <Icon3DImage type="star" size={40} float={true} />
                    </div>
                    <div className="text-2xl font-bold text-slate-800">1,250</div>
                    <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Total XP</div>
                </div>
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center hover:scale-[1.02] transition-transform">
                    <div className="mb-3">
                        <Icon3DImage type="trophy" size={40} float={true} />
                    </div>
                    <div className="text-2xl font-bold text-slate-800">#1</div>
                    <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Current Rank</div>
                </div>
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center hover:scale-[1.02] transition-transform">
                    <div className="mb-3">
                        <Icon3DEnhanced 
                            icon={Clock} 
                            size={32}
                            gradient="linear-gradient(135deg, #a855f7 0%, #9333ea 100%)"
                            glow={true}
                            glowColor="#a855f7"
                        />
                    </div>
                    <div className="text-2xl font-bold text-slate-800">98%</div>
                    <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">On-Time Rate</div>
                </div>
            </div>

            {/* Upcoming Tasks */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-slate-400" />
                        Upcoming Quests
                    </h3>
                    <Link to="/tasks" className="text-indigo-600 text-sm font-medium hover:underline flex items-center gap-1">
                        See all <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
                <div className="p-6 space-y-4">
                    {upcomingTasks.map(task => (
                        <div key={task.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 group hover:border-indigo-200 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className={`w-2 h-12 rounded-full ${task.subject === 'Math' ? 'bg-blue-500' : task.subject === 'Science' ? 'bg-pink-500' : 'bg-orange-500'}`}></div>
                                <div>
                                    <h4 className="font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">{task.title}</h4>
                                    <p className="text-sm text-slate-500">{task.subject} • Due {task.dueDate}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold">
                                    +{task.xpReward} XP
                                </div>
                                <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>

        {/* Right Column */}
        <div className="space-y-8">
            
            {/* Subject Breakdown Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-800 mb-6">XP Distribution</h3>
                <div className="h-64 w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={XP_DATA}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {XP_DATA.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                ))}
                            </Pie>
                            <Tooltip 
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    {/* Center Text */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                         <div className="text-2xl font-bold text-slate-800">1250</div>
                         <div className="text-xs text-slate-500">Total XP</div>
                    </div>
                </div>
                <div className="flex flex-wrap justify-center gap-3 mt-4">
                    {XP_DATA.map(d => (
                        <div key={d.name} className="flex items-center gap-1 text-xs text-slate-600">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }}></div>
                            {d.name}
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Badges */}
            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-6 rounded-2xl shadow-lg text-white">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-300" />
                    Recent Badges
                </h3>
                <div className="space-y-3">
                    {recentAchievements.map((badge, i) => (
                         <div key={i} className="flex items-center gap-3 bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10">
                             <div className="bg-yellow-400/20 p-2 rounded-lg text-yellow-300">
                                 <Star className="w-4 h-4 fill-yellow-300" />
                             </div>
                             <span className="font-medium text-sm">{badge}</span>
                         </div>
                    ))}
                </div>
                <button className="w-full mt-6 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors">
                    View All Badges
                </button>
            </div>

        </div>
      </div>
    </div>
  );
};

