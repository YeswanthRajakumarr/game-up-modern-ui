import React, { useState } from 'react';
import { FileText, Download, Eye, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import type { ProgressReport } from '../../../shared/types';
import { MOCK_USERS } from '../../../shared/mockData';

const MOCK_REPORTS: ProgressReport[] = [
  {
    id: 'pr1',
    studentId: 's1',
    studentName: 'Charlie Student',
    period: 'Q1 2023',
    subjects: [
      { subject: 'Math', grade: 'A', percentage: 95, comments: 'Excellent performance. Strong grasp of concepts.' },
      { subject: 'Science', grade: 'A-', percentage: 92, comments: 'Very good work. Continue practicing lab skills.' },
      { subject: 'History', grade: 'B+', percentage: 87, comments: 'Good understanding. Work on essay structure.' },
      { subject: 'English', grade: 'A-', percentage: 90, comments: 'Strong writing skills. Keep up the good work.' },
    ],
    overallGPA: 3.85,
    attendanceRate: 98,
    generatedDate: '2023-10-01',
  },
  {
    id: 'pr2',
    studentId: 's2',
    studentName: 'Diana Prince',
    period: 'Q1 2023',
    subjects: [
      { subject: 'Math', grade: 'B+', percentage: 88, comments: 'Good progress. Practice more problem-solving.' },
      { subject: 'Science', grade: 'A', percentage: 94, comments: 'Outstanding work in experiments.' },
      { subject: 'History', grade: 'A-', percentage: 91, comments: 'Excellent analytical skills.' },
      { subject: 'English', grade: 'B+', percentage: 87, comments: 'Good writing. Expand vocabulary.' },
    ],
    overallGPA: 3.75,
    attendanceRate: 95,
    generatedDate: '2023-10-01',
  },
];

export const ReportsPage = () => {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-emerald-600 bg-emerald-50';
    if (grade.startsWith('B')) return 'text-blue-600 bg-blue-50';
    if (grade.startsWith('C')) return 'text-amber-600 bg-amber-50';
    return 'text-red-600 bg-red-50';
  };

  const selectedReportData = selectedReport 
    ? MOCK_REPORTS.find(r => r.id === selectedReport)
    : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Progress Reports</h1>
          <p className="text-slate-500 mt-1">View and download student progress reports</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reports List */}
        <div className="lg:col-span-1 space-y-4">
          {MOCK_REPORTS.map(report => (
            <div
              key={report.id}
              onClick={() => setSelectedReport(report.id)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                selectedReport === report.id
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-slate-800">{report.studentName}</h3>
                <FileText className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="text-sm text-slate-600 mb-2">{report.period}</div>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span>GPA: {report.overallGPA}</span>
                <span>Attendance: {report.attendanceRate}%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Report Details */}
        <div className="lg:col-span-2">
          {selectedReportData ? (
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">{selectedReportData.studentName}</h2>
                  <p className="text-slate-500">{selectedReportData.period} Progress Report</p>
                </div>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
              </div>

              {/* Overall Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200">
                  <div className="text-2xl font-bold text-indigo-700">{selectedReportData.overallGPA}</div>
                  <div className="text-sm text-indigo-600 font-medium">Overall GPA</div>
                </div>
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                  <div className="text-2xl font-bold text-emerald-700">{selectedReportData.attendanceRate}%</div>
                  <div className="text-sm text-emerald-600 font-medium">Attendance</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                  <div className="text-2xl font-bold text-blue-700">{selectedReportData.subjects.length}</div>
                  <div className="text-sm text-blue-600 font-medium">Subjects</div>
                </div>
              </div>

              {/* Subject Grades */}
              <div className="space-y-4">
                <h3 className="font-bold text-slate-800 text-lg">Subject Performance</h3>
                {selectedReportData.subjects.map((subject, index) => (
                  <div key={index} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-slate-800">{subject.subject}</h4>
                      <div className="flex items-center gap-3">
                        <span className="text-slate-600 font-medium">{subject.percentage}%</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getGradeColor(subject.grade)}`}>
                          {subject.grade}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600">{subject.comments}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200 text-xs text-slate-500">
                Generated on {format(new Date(selectedReportData.generatedDate), 'MMMM dd, yyyy')}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-12 text-center">
              <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-slate-500 font-medium">Select a report to view details</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
