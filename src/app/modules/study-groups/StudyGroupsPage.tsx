import React, { useState } from 'react';
import { Users, Plus, MessageSquare, BookOpen, Trophy, TrendingUp, Share2, Settings } from 'lucide-react';
import { MOCK_STUDY_GROUPS, MOCK_USERS } from '../../../shared/mockData';
import type { StudyGroup } from '../../../shared/types';
import { useAuth } from '../../global-context/AuthContext';
import { Icon3DImage } from '../../../shared/components/Icon3DImage';
import { format } from 'date-fns';

export const StudyGroupsPage = () => {
  const { user } = useAuth();
  const [selectedGroup, setSelectedGroup] = useState<StudyGroup | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const myGroups = MOCK_STUDY_GROUPS.filter(g => g.members.some(m => m.userId === user?.id));
  const availableGroups = MOCK_STUDY_GROUPS.filter(g => !g.members.some(m => m.userId === user?.id));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Icon3DImage type="notebook" size={48} float={true} />
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Study Groups</h1>
            <p className="text-slate-500 mt-1">Collaborate with classmates and learn together</p>
          </div>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2 font-semibold"
        >
          <Plus className="w-5 h-5" />
          Create Group
        </button>
      </div>

      {/* My Study Groups */}
      {myGroups.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-4">My Study Groups</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myGroups.map((group) => (
              <div
                key={group.id}
                onClick={() => setSelectedGroup(group)}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-indigo-100 p-3 rounded-xl">
                    <Users className="w-6 h-6 text-indigo-600" />
                  </div>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                    {group.subject}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{group.name}</h3>
                <p className="text-slate-600 text-sm mb-4">{group.description}</p>
                <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{group.members.length} members</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4" />
                    <span>{group.totalXP} XP</span>
                  </div>
                </div>
                <div className="flex -space-x-2 mb-4">
                  {group.members.slice(0, 4).map((member) => (
                    <img
                      key={member.userId}
                      src={member.userAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.userName}`}
                      alt={member.userName}
                      className="w-8 h-8 rounded-full border-2 border-white"
                      title={member.userName}
                    />
                  ))}
                  {group.members.length > 4 && (
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-700">
                      +{group.members.length - 4}
                    </div>
                  )}
                </div>
                <button className="w-full py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-semibold">
                  Open Group
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Available Study Groups */}
      {availableGroups.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-4">Available Groups</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableGroups.map((group) => (
              <div
                key={group.id}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-slate-100 p-3 rounded-xl">
                    <Users className="w-6 h-6 text-slate-600" />
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                    {group.subject}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{group.name}</h3>
                <p className="text-slate-600 text-sm mb-4">{group.description}</p>
                <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{group.members.length} members</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4" />
                    <span>{group.totalXP} XP</span>
                  </div>
                </div>
                <button className="w-full py-2 border-2 border-indigo-600 text-indigo-600 rounded-xl hover:bg-indigo-50 transition-colors font-semibold">
                  Join Group
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Group Details Modal */}
      {selectedGroup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-indigo-100 p-3 rounded-xl">
                  <Users className="w-8 h-8 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">{selectedGroup.name}</h2>
                  <p className="text-slate-600">{selectedGroup.description}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedGroup(null)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-slate-800">{selectedGroup.members.length}</div>
                  <div className="text-sm text-slate-600">Members</div>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-slate-800">{selectedGroup.totalXP}</div>
                  <div className="text-sm text-slate-600">Total XP</div>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-slate-800">{selectedGroup.challenges.length}</div>
                  <div className="text-sm text-slate-600">Challenges</div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Members
                  </h3>
                  <div className="space-y-2">
                    {selectedGroup.members.map((member) => (
                      <div key={member.userId} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <img
                            src={member.userAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.userName}`}
                            alt={member.userName}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <div className="font-semibold text-slate-800">{member.userName}</div>
                            <div className="text-xs text-slate-500 capitalize">{member.role.toLowerCase()}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-slate-800">{member.contributionXP} XP</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <button className="p-4 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors text-center">
                    <MessageSquare className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                    <div className="text-sm font-semibold text-indigo-600">Chat</div>
                  </button>
                  <button className="p-4 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors text-center">
                    <BookOpen className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                    <div className="text-sm font-semibold text-emerald-600">Resources</div>
                  </button>
                  <button className="p-4 bg-amber-50 rounded-xl hover:bg-amber-100 transition-colors text-center">
                    <Trophy className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                    <div className="text-sm font-semibold text-amber-600">Challenges</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
