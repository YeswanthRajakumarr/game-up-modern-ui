import React, { useState } from 'react';
import { MOCK_CLASSES, MOCK_USERS } from '../../../shared/mockData';
import type { Class } from '../../../shared/types';
import { Plus, Edit, Trash2, Users, GraduationCap } from 'lucide-react';

export const ClassesPage = () => {
  const [classes, setClasses] = useState<Class[]>(MOCK_CLASSES);
  const [showAddModal, setShowAddModal] = useState(false);

  const getTeacherName = (teacherId: string) => {
    const teacher = MOCK_USERS.find(u => u.id === teacherId);
    return teacher?.name || 'Unassigned';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Class Management</h1>
          <p className="text-slate-500 mt-1">Organize classes and sections</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-indigo-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-lg shadow-indigo-600/20"
        >
          <Plus className="w-5 h-5" />
          Add Class
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">{classes.length}</div>
              <div className="text-sm text-slate-500">Total Classes</div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">
                {classes.reduce((sum, c) => sum + c.studentCount, 0)}
              </div>
              <div className="text-sm text-slate-500">Total Students</div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">
                {new Set(classes.map(c => c.teacherId)).size}
              </div>
              <div className="text-sm text-slate-500">Assigned Teachers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map(classItem => (
          <div key={classItem.id} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-1">{classItem.name}</h3>
                <p className="text-sm text-slate-500">Grade {classItem.grade} • Section {classItem.section}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Teacher:</span>
                <span className="font-medium text-slate-700">{getTeacherName(classItem.teacherId)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Students:</span>
                <span className="font-medium text-slate-700">{classItem.studentCount}</span>
              </div>
            </div>

            <button className="w-full mt-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg text-sm font-medium transition-colors">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
