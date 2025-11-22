import React, { useState } from 'react';
import { FileText, Plus, Search, Share2, Edit, Trash2, Users, Tag, BookOpen, Star } from 'lucide-react';
import { MOCK_NOTES, MOCK_USERS } from '../../../shared/mockData';
import type { Note } from '../../../shared/types';
import { useAuth } from '../../global-context/AuthContext';
import { Icon3DImage } from '../../../shared/components/Icon3DImage';
import { format } from 'date-fns';

export const NotesPage = () => {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>(MOCK_NOTES);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSubject, setFilterSubject] = useState<string>('ALL');

  const myNotes = notes.filter(n => n.createdBy === user?.id);
  const sharedNotes = notes.filter(n => n.sharedWith.includes(user?.id || '') && n.createdBy !== user?.id);
  const publicNotes = notes.filter(n => n.isPublic && n.createdBy !== user?.id);

  const filteredNotes = [...myNotes, ...sharedNotes, ...publicNotes].filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = filterSubject === 'ALL' || note.subject === filterSubject;
    return matchesSearch && matchesSubject;
  });

  const handleDeleteNote = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
    if (selectedNote?.id === id) {
      setSelectedNote(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Icon3DImage type="notebook" size={48} float={true} />
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Notes & Study Materials</h1>
            <p className="text-slate-500 mt-1">Create, organize, and share your study notes</p>
          </div>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2 font-semibold"
        >
          <Plus className="w-5 h-5" />
          Create Note
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="ALL">All Subjects</option>
            <option value="Math">Math</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
            <option value="English">English</option>
          </select>
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            onClick={() => setSelectedNote(note)}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="bg-indigo-100 p-3 rounded-xl">
                <FileText className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="flex items-center gap-2">
                {note.isPublic && (
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                    Public
                  </span>
                )}
                {note.collaborators.length > 0 && (
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Users className="w-4 h-4" />
                    <span>{note.collaborators.length}</span>
                  </div>
                )}
              </div>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">{note.title}</h3>
            <p className="text-slate-600 text-sm mb-4 line-clamp-2">{note.content.replace(/#/g, '').substring(0, 100)}...</p>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                {note.subject}
              </span>
              <span className="text-xs text-slate-500">
                {format(new Date(note.updatedAt), 'MMM dd, yyyy')}
              </span>
            </div>
            {note.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {note.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
                {note.tags.length > 3 && (
                  <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                    +{note.tags.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredNotes.length === 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center">
          <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-700 mb-2">No notes found</h3>
          <p className="text-slate-500">Create your first note to get started!</p>
        </div>
      )}

      {/* Note Detail Modal */}
      {selectedNote && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <div className="flex items-center gap-4">
                <div className="bg-indigo-100 p-3 rounded-xl">
                  <FileText className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">{selectedNote.title}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                      {selectedNote.subject}
                    </span>
                    <span className="text-xs text-slate-500">
                      Updated {format(new Date(selectedNote.updatedAt), 'MMM dd, yyyy')}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {selectedNote.createdBy === user?.id && (
                  <>
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                      <Edit className="w-5 h-5 text-slate-600" />
                    </button>
                    <button
                      onClick={() => handleDeleteNote(selectedNote.id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5 text-red-600" />
                    </button>
                  </>
                )}
                <button
                  onClick={() => setSelectedNote(null)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="prose max-w-none mb-6">
                <div className="whitespace-pre-wrap text-slate-700">{selectedNote.content}</div>
              </div>

              {selectedNote.tags.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedNote.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedNote.collaborators.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Collaborators
                  </h3>
                  <div className="flex -space-x-2">
                    {selectedNote.collaborators.map((userId) => {
                      const collaborator = MOCK_USERS.find(u => u.id === userId);
                      return collaborator ? (
                        <img
                          key={userId}
                          src={collaborator.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${collaborator.name}`}
                          alt={collaborator.name}
                          className="w-10 h-10 rounded-full border-2 border-white"
                          title={collaborator.name}
                        />
                      ) : null;
                    })}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                <button className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-semibold flex items-center justify-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share Note
                </button>
                <button className="px-4 py-2 border-2 border-indigo-600 text-indigo-600 rounded-xl hover:bg-indigo-50 transition-colors font-semibold flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Favorite
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
