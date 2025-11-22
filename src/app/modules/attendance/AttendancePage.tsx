import React, { useState } from 'react';
import { Calendar, CheckCircle, XCircle, Clock, AlertCircle, Download, Plus } from 'lucide-react';
import { format } from 'date-fns';
import type { Attendance } from '../../../shared/types';
import { MOCK_USERS } from '../../../shared/mockData';

const MOCK_ATTENDANCE: Attendance[] = [
  { id: 'a1', studentId: 's1', studentName: 'Charlie Student', date: '2023-10-08', status: 'PRESENT', subject: 'Math' },
  { id: 'a2', studentId: 's2', studentName: 'Diana Prince', date: '2023-10-08', status: 'PRESENT', subject: 'Math' },
  { id: 'a3', studentId: 's3', studentName: 'Clark Kent', date: '2023-10-08', status: 'LATE', subject: 'Math', notes: 'Arrived 15 minutes late' },
  { id: 'a4', studentId: 's4', studentName: 'Bruce Wayne', date: '2023-10-08', status: 'ABSENT', subject: 'Math', notes: 'Sick leave' },
  { id: 'a5', studentId: 's1', studentName: 'Charlie Student', date: '2023-10-07', status: 'PRESENT', subject: 'Science' },
  { id: 'a6', studentId: 's2', studentName: 'Diana Prince', date: '2023-10-07', status: 'EXCUSED', subject: 'Science', notes: 'Family emergency' },
];

export const AttendancePage = () => {
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED'>('ALL');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PRESENT':
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'ABSENT':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'LATE':
        return <Clock className="w-5 h-5 text-amber-500" />;
      case 'EXCUSED':
        return <AlertCircle className="w-5 h-5 text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PRESENT':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'ABSENT':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'LATE':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'EXCUSED':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const filteredAttendance = MOCK_ATTENDANCE.filter(att => {
    const matchesDate = att.date === selectedDate;
    const matchesStatus = statusFilter === 'ALL' || att.status === statusFilter;
    return matchesDate && matchesStatus;
  });

  const stats = {
    present: filteredAttendance.filter(a => a.status === 'PRESENT').length,
    absent: filteredAttendance.filter(a => a.status === 'ABSENT').length,
    late: filteredAttendance.filter(a => a.status === 'LATE').length,
    excused: filteredAttendance.filter(a => a.status === 'EXCUSED').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Attendance</h1>
          <p className="text-slate-500 mt-1">Track student attendance and manage records</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-slate-100 text-slate-700 px-4 py-2.5 rounded-xl font-medium hover:bg-slate-200 transition-colors flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export
          </button>
          <button className="bg-indigo-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-lg shadow-indigo-600/20">
            <Plus className="w-5 h-5" />
            Mark Attendance
          </button>
        </div>
      </div>

      {/* Date Selector and Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
          <label className="block text-sm font-medium text-slate-700 mb-2">Select Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>
        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
          <div className="text-2xl font-bold text-emerald-700">{stats.present}</div>
          <div className="text-sm text-emerald-600 font-medium">Present</div>
        </div>
        <div className="bg-red-50 p-4 rounded-xl border border-red-200">
          <div className="text-2xl font-bold text-red-700">{stats.absent}</div>
          <div className="text-sm text-red-600 font-medium">Absent</div>
        </div>
        <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
          <div className="text-2xl font-bold text-amber-700">{stats.late}</div>
          <div className="text-sm text-amber-600 font-medium">Late</div>
        </div>
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
          <div className="text-2xl font-bold text-blue-700">{stats.excused}</div>
          <div className="text-sm text-blue-600 font-medium">Excused</div>
        </div>
      </div>

      {/* Status Filter */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex gap-2">
        {(['ALL', 'PRESENT', 'ABSENT', 'LATE', 'EXCUSED'] as const).map(status => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
              statusFilter === status
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Attendance List */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAttendance.map(attendance => (
                <tr key={attendance.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-800">{attendance.studentName}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{format(new Date(attendance.date), 'MMM dd, yyyy')}</td>
                  <td className="px-6 py-4 text-slate-600">{attendance.subject || 'All Subjects'}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(attendance.status)}
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(attendance.status)}`}>
                        {attendance.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-sm">{attendance.notes || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredAttendance.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            No attendance records found for this date.
          </div>
        )}
      </div>
    </div>
  );
};
