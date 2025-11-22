import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { MOCK_CLASSES } from '../../../shared/mockData';
import { Icon3DEnhanced } from '../../../shared/components/Icon3D';

const CLASS_PERFORMANCE = [
  { name: 'Grade 10A', avg: 87 },
  { name: 'Grade 10B', avg: 85 },
  { name: 'Grade 9A', avg: 82 },
  { name: 'Grade 9B', avg: 80 },
  { name: 'Grade 11A', avg: 91 },
  { name: 'Grade 11B', avg: 89 },
];

const ACTIVITY_DATA = [
    { day: 'Mon', active: 24, completed: 18 },
    { day: 'Tue', active: 35, completed: 28 },
    { day: 'Wed', active: 40, completed: 32 },
    { day: 'Thu', active: 30, completed: 25 },
    { day: 'Fri', active: 45, completed: 38 },
    { day: 'Sat', active: 15, completed: 12 },
    { day: 'Sun', active: 10, completed: 8 },
];

export const TeacherDashboard = () => {
  const totalStudents = MOCK_CLASSES.reduce((sum, c) => sum + c.studentCount, 0);
  
  return (
    <div className="space-y-8">
        <div className="flex items-center justify-between">
             <h1 className="text-2xl font-bold text-slate-800">Teacher Dashboard</h1>
             <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm">
                 + Create New Task
             </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                    <Icon3DEnhanced 
                      icon={Users} 
                      size={24}
                      gradient="linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"
                      glow={true}
                      glowColor="#3b82f6"
                    />
                </div>
                <div>
                    <div className="text-2xl font-bold text-slate-800">{totalStudents}</div>
                    <div className="text-xs text-slate-500 uppercase font-bold">Total Students</div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
                <div className="p-3 bg-amber-100 rounded-lg">
                    <Icon3DEnhanced 
                      icon={Clock} 
                      size={24}
                      gradient="linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
                      glow={true}
                      glowColor="#f59e0b"
                    />
                </div>
                <div>
                    <div className="text-2xl font-bold text-slate-800">18</div>
                    <div className="text-xs text-slate-500 uppercase font-bold">Pending Grading</div>
                </div>
            </div>
             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
                <div className="p-3 bg-emerald-100 rounded-lg">
                    <Icon3DEnhanced 
                      icon={CheckCircle} 
                      size={24}
                      gradient="linear-gradient(135deg, #10b981 0%, #059669 100%)"
                      glow={true}
                      glowColor="#10b981"
                    />
                </div>
                <div>
                    <div className="text-2xl font-bold text-slate-800">94%</div>
                    <div className="text-xs text-slate-500 uppercase font-bold">Completion Rate</div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
                <div className="p-3 bg-red-100 rounded-lg">
                    <Icon3DEnhanced 
                      icon={AlertCircle} 
                      size={24}
                      gradient="linear-gradient(135deg, #ef4444 0%, #dc2626 100%)"
                      glow={true}
                      glowColor="#ef4444"
                    />
                </div>
                <div>
                    <div className="text-2xl font-bold text-slate-800">7</div>
                    <div className="text-xs text-slate-500 uppercase font-bold">Needs Attention</div>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Performance Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-800 mb-6">Class Performance (Avg Score)</h3>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={CLASS_PERFORMANCE}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                            <Tooltip 
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                cursor={{fill: '#f8fafc'}}
                            />
                            <Bar dataKey="avg" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

             {/* Activity Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-800 mb-6">Student Activity (Last 7 Days)</h3>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                         <LineChart data={ACTIVITY_DATA}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                             <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                            <Tooltip 
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                            />
                            <Line type="monotone" dataKey="active" stroke="#6366f1" strokeWidth={3} name="Active Students" dot={{r: 4, fill: '#6366f1', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 6}} />
                            <Line type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={3} name="Completed Tasks" dot={{r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 6}} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    </div>
  );
};

