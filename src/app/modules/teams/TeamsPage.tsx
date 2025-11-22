import React, { useState } from 'react';
import { Users, Trophy, TrendingUp, Award, Plus, Crown, UserPlus, BarChart3 } from 'lucide-react';
import { MOCK_TEAMS, MOCK_USERS } from '../../../shared/mockData';
import type { Team } from '../../../shared/types';
import { useAuth } from '../../global-context/AuthContext';
import { Icon3DImage } from '../../../shared/components/Icon3DImage';
import { format } from 'date-fns';

export const TeamsPage = () => {
  const { user } = useAuth();
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const myTeam = MOCK_TEAMS.find(t => t.members.some(m => m.userId === user?.id));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Icon3DImage type="trophy" size={48} float={true} />
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Teams & Clans</h1>
            <p className="text-slate-500 mt-1">Join forces with classmates and compete together</p>
          </div>
        </div>
        {!myTeam && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2 font-semibold"
          >
            <Plus className="w-5 h-5" />
            Create Team
          </button>
        )}
      </div>

      {/* My Team Card */}
      {myTeam && (
        <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              {myTeam.avatar ? (
                <img src={myTeam.avatar} alt={myTeam.name} className="w-16 h-16 rounded-xl" />
              ) : (
                <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center">
                  <Users className="w-8 h-8" />
                </div>
              )}
              <div>
                <h2 className="text-2xl font-bold mb-1">{myTeam.name}</h2>
                <p className="text-indigo-100">{myTeam.description}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold mb-1">#{myTeam.rank}</div>
              <div className="text-sm text-indigo-100">Team Rank</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5" />
                <span className="text-sm text-indigo-100">Total XP</span>
              </div>
              <div className="text-2xl font-bold">{myTeam.totalXP.toLocaleString()}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-5 h-5" />
                <span className="text-sm text-indigo-100">Tasks Completed</span>
              </div>
              <div className="text-2xl font-bold">{myTeam.stats.totalTasksCompleted}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm text-indigo-100">Average Score</span>
              </div>
              <div className="text-2xl font-bold">{myTeam.stats.averageScore}%</div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-indigo-100 mb-2">Team Members</div>
              <div className="flex -space-x-2">
                {myTeam.members.slice(0, 5).map((member) => (
                  <img
                    key={member.userId}
                    src={member.userAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.userName}`}
                    alt={member.userName}
                    className="w-10 h-10 rounded-full border-2 border-white"
                    title={member.userName}
                  />
                ))}
                {myTeam.members.length > 5 && (
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-white/20 flex items-center justify-center text-sm font-bold">
                    +{myTeam.members.length - 5}
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => setSelectedTeam(myTeam)}
              className="px-6 py-2 bg-white text-indigo-600 rounded-xl hover:bg-indigo-50 transition-colors font-semibold"
            >
              View Details
            </button>
          </div>
        </div>
      )}

      {/* Team Leaderboard */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          Team Leaderboard
        </h2>
        <div className="space-y-3">
          {MOCK_TEAMS.map((team, index) => (
            <div
              key={team.id}
              onClick={() => setSelectedTeam(team)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${
                team.rank === 1
                  ? 'border-yellow-400 bg-yellow-50'
                  : team.rank === 2
                  ? 'border-slate-300 bg-slate-50'
                  : team.rank === 3
                  ? 'border-amber-400 bg-amber-50'
                  : 'border-slate-200 hover:border-indigo-300'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  {team.rank <= 3 ? (
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl ${
                      team.rank === 1 ? 'bg-yellow-400 text-yellow-900' :
                      team.rank === 2 ? 'bg-slate-300 text-slate-800' :
                      'bg-amber-400 text-amber-900'
                    }`}>
                      {team.rank}
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-slate-200 flex items-center justify-center font-bold text-slate-700">
                      {team.rank}
                    </div>
                  )}
                </div>
                {team.avatar ? (
                  <img src={team.avatar} alt={team.name} className="w-12 h-12 rounded-xl" />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white">
                    <Users className="w-6 h-6" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-slate-800">{team.name}</h3>
                    {team.rank === 1 && <Crown className="w-5 h-5 text-yellow-500" />}
                  </div>
                  <p className="text-sm text-slate-600 truncate">{team.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-slate-800">{team.totalXP.toLocaleString()} XP</div>
                  <div className="text-xs text-slate-500">{team.members.length} members</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Details Modal */}
      {selectedTeam && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-4">
                {selectedTeam.avatar ? (
                  <img src={selectedTeam.avatar} alt={selectedTeam.name} className="w-16 h-16 rounded-xl" />
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white">
                    <Users className="w-8 h-8" />
                  </div>
                )}
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">{selectedTeam.name}</h2>
                  <p className="text-slate-600">{selectedTeam.description}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedTeam(null)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-slate-800">{selectedTeam.totalXP.toLocaleString()}</div>
                  <div className="text-sm text-slate-600">Total XP</div>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-slate-800">#{selectedTeam.rank}</div>
                  <div className="text-sm text-slate-600">Rank</div>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-slate-800">{selectedTeam.members.length}</div>
                  <div className="text-sm text-slate-600">Members</div>
                </div>
              </div>

              {/* Members */}
              <div>
                <h3 className="font-bold text-slate-800 mb-3">Team Members</h3>
                <div className="space-y-2">
                  {selectedTeam.members.map((member) => (
                    <div key={member.userId} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <img
                          src={member.userAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.userName}`}
                          alt={member.userName}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-slate-800">{member.userName}</span>
                            {member.role === 'LEADER' && <Crown className="w-4 h-4 text-yellow-500" />}
                          </div>
                          <div className="text-xs text-slate-500">
                            Joined {format(new Date(member.joinedAt), 'MMM dd, yyyy')}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-slate-800">{member.contributionXP} XP</div>
                        <div className="text-xs text-slate-500">Contribution</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              {selectedTeam.achievements.length > 0 && (
                <div>
                  <h3 className="font-bold text-slate-800 mb-3">Team Achievements</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedTeam.achievements.map((badgeId) => (
                      <div key={badgeId} className="bg-gradient-to-br from-yellow-400 to-orange-500 p-3 rounded-xl text-white">
                        <Award className="w-6 h-6" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Join Button */}
              {!myTeam && selectedTeam.id !== myTeam?.id && (
                <button className="w-full py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-semibold flex items-center justify-center gap-2">
                  <UserPlus className="w-5 h-5" />
                  Join Team
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
