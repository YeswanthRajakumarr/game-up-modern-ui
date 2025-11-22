import React, { useState } from 'react';
import { BookOpen, Download, FileText, Video, Link as LinkIcon, File, Search, Filter, Upload } from 'lucide-react';
import type { StudyResource } from '../../../shared/types';

const MOCK_RESOURCES: StudyResource[] = [
  { id: 'r1', title: 'Algebra Fundamentals', description: 'Complete guide to linear equations and quadratic formulas', subject: 'Math', type: 'PDF', url: '#', uploadedBy: 'Alice Teacher', uploadDate: '2023-10-01', downloadCount: 145 },
  { id: 'r2', title: 'Physics Lab Safety', description: 'Video tutorial on laboratory safety procedures', subject: 'Science', type: 'VIDEO', url: '#', uploadedBy: 'Sarah Johnson', uploadDate: '2023-10-02', downloadCount: 98 },
  { id: 'r3', title: 'World War II Timeline', description: 'Interactive timeline of major WWII events', subject: 'History', type: 'LINK', url: '#', uploadedBy: 'Michael Chen', uploadDate: '2023-10-03', downloadCount: 67 },
  { id: 'r4', title: 'Essay Writing Guide', description: 'Step-by-step guide to writing effective essays', subject: 'English', type: 'DOCUMENT', url: '#', uploadedBy: 'Alice Teacher', uploadDate: '2023-09-28', downloadCount: 203 },
  { id: 'r5', title: 'Chemistry Periodic Table', description: 'Printable periodic table with element properties', subject: 'Science', type: 'PDF', url: '#', uploadedBy: 'Sarah Johnson', uploadDate: '2023-09-25', downloadCount: 312 },
];

export const ResourcesPage = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>('ALL');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const subjects = ['ALL', 'Math', 'Science', 'History', 'English'];
  const types = ['ALL', 'PDF', 'VIDEO', 'LINK', 'DOCUMENT'];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'PDF':
      case 'DOCUMENT':
        return <FileText className="w-5 h-5" />;
      case 'VIDEO':
        return <Video className="w-5 h-5" />;
      case 'LINK':
        return <LinkIcon className="w-5 h-5" />;
      default:
        return <File className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'PDF':
        return 'bg-red-100 text-red-600';
      case 'VIDEO':
        return 'bg-purple-100 text-purple-600';
      case 'LINK':
        return 'bg-blue-100 text-blue-600';
      case 'DOCUMENT':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-slate-100 text-slate-600';
    }
  };

  const filteredResources = MOCK_RESOURCES.filter(resource => {
    const matchesSubject = selectedSubject === 'ALL' || resource.subject === selectedSubject;
    const matchesType = selectedType === 'ALL' || resource.type === selectedType;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSubject && matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Study Resources</h1>
          <p className="text-slate-500 mt-1">Access learning materials and study guides</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-lg shadow-indigo-600/20">
          <Upload className="w-5 h-5" />
          Upload Resource
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search resources..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
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
          <div className="flex gap-2">
            {types.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                  selectedType === type
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map(resource => (
          <div key={resource.id} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 ${getTypeColor(resource.type)} rounded-lg`}>
                {getTypeIcon(resource.type)}
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${getTypeColor(resource.type)}`}>
                {resource.type}
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">{resource.title}</h3>
            <p className="text-sm text-slate-600 mb-4">{resource.description}</p>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
              <span>{resource.subject}</span>
              <span>{resource.downloadCount} downloads</span>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                {resource.type === 'LINK' ? 'Open Link' : 'Download'}
              </button>
              <button className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-slate-500 font-medium">No resources found</h3>
        </div>
      )}
    </div>
  );
};
