import React, { useState } from 'react';
import { BookOpen, Search, Filter, Download, Plus } from 'lucide-react';
import { MOCK_USERS } from '../../../shared/mockData';
import type { Grade } from '../../../shared/types';

const MOCK_GRADES: Grade[] = [
  { id: 'g1', studentId: 's1', studentName: 'Charlie Student', subject: 'Math', assignment: 'Algebra Quiz', score: 95, maxScore: 100, percentage: 95, grade: 'A', date: '2023-10-05', feedback: 'Excellent work!' },
  { id: 'g2', studentId: 's2', studentName: 'Diana Prince', subject: 'Math', assignment: 'Algebra Quiz', score: 88, maxScore: 100, percentage: 88, grade: 'B+', date: '2023-10-05', feedback: 'Good effort' },
  { id: 'g3', studentId: 's1', studentName: 'Charlie Student', subject: 'Science', assignment: 'Physics Lab', score: 92, maxScore: 100, percentage: 92, grade: 'A-', date: '2023-10-03' },
  { id: 'g4', studentId: 's3', studentName: 'Clark Kent', subject: 'History', assignment: 'Essay', score: 85, maxScore: 100, percentage: 85, grade: 'B', date: '2023-10-01' },
  { id: 'g5', studentId: 's1', studentName: 'Charlie Student', subject: 'English', assignment: 'Poetry Analysis', score: 90, maxScore: 100, percentage: 90, grade: 'A-', date: '2023-09-28' },
];

export const GradebookPage = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const subjects = ['ALL', 'Math', 'Science', 'History', 'English'];
  const students = Array.from(new Set(MOCK_GRADES.map(g => g.studentId)));

  const filteredGrades = MOCK_GRADES.filter(grade => {
    const matchesSubject = selectedSubject === 'ALL' || grade.subject === selectedSubject;
    const matchesSearch = grade.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         grade.assignment.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-emerald-600 bg-emerald-50';
    if (grade.startsWith('B')) return 'text-blue-600 bg-blue-50';
    if (grade.startsWith('C')) return 'text-amber-600 bg-amber-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Gradebook</h1>
          <p className="text-slate-500 mt-1">Manage and track student grades</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-slate-100 text-slate-700 px-4 py-2.5 rounded-xl font-medium hover:bg-slate-200 transition-colors flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export
          </button>
          <button className="bg-indigo-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-lg shadow-indigo-600/20">
            <Plus className="w-5 h-5" />
            Add Grade
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search students or assignments..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {subjects.map(subject => (
            <button
              key={subject}
              onClick={() => setSelectedSubject(subject)}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                selectedSubject === subject
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {subject}
            </button>
          ))}
        </div>
      </div>

      {/* Grades Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Assignment</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Score</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Grade</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredGrades.map(grade => (
                <tr key={grade.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-800">{grade.studentName}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{grade.subject}</td>
                  <td className="px-6 py-4 text-slate-600">{grade.assignment}</td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-slate-800">
                      {grade.score} / {grade.maxScore}
                    </span>
                    <span className="text-slate-500 text-sm ml-2">({grade.percentage}%)</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getGradeColor(grade.grade)}`}>
                      {grade.grade}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 text-sm">{grade.date}</td>
                  <td className="px-6 py-4">
                    <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredGrades.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            No grades found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};
