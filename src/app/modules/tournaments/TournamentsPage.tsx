import React, { useState } from 'react';
import { Trophy, Calendar, Users, Award, Clock, Target, TrendingUp, Play } from 'lucide-react';
import { MOCK_TOURNAMENTS, MOCK_TEAMS } from '../../../shared/mockData';
import type { Tournament } from '../../../shared/types';
import { useAuth } from '../../global-context/AuthContext';
import { Icon3DImage } from '../../../shared/components/Icon3DImage';
import { format } from 'date-fns';

export const TournamentsPage = () => {
  const { user } = useAuth();
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);

  const activeTournaments = MOCK_TOURNAMENTS.filter(t => t.status === 'ACTIVE');
  const upcomingTournaments = MOCK_TOURNAMENTS.filter(t => t.status === 'UPCOMING');
  const completedTournaments = MOCK_TOURNAMENTS.filter(t => t.status === 'COMPLETED');

  const getTournamentTypeColor = (type: Tournament['type']) => {
    switch (type) {
      case 'WEEKLY':
        return 'bg-blue-100 text-blue-700';
      case 'MONTHLY':
        return 'bg-purple-100 text-purple-700';
      case 'SEASONAL':
        return 'bg-amber-100 text-amber-700';
      case 'SPECIAL':
        return 'bg-pink-100 text-pink-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Icon3DImage type="trophy" size={48} float={true} />
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Tournaments & Events</h1>
            <p className="text-slate-500 mt-1">Compete in exciting challenges and win amazing prizes</p>
          </div>
        </div>
      </div>

      {/* Active Tournaments */}
      {activeTournaments.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Play className="w-5 h-5 text-emerald-600" />
            Active Tournaments
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeTournaments.map((tournament) => (
              <div
                key={tournament.id}
                className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-6 text-white relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-sm ${getTournamentTypeColor(tournament.type)}`}>
                          {tournament.type}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500">
                          ACTIVE
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{tournament.name}</h3>
                      <p className="text-indigo-100 mb-4">{tournament.description}</p>
                    </div>
                    <Icon3DImage type="trophy" size={48} float={true} />
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                      <div className="text-xs text-indigo-100 mb-1">Prize Pool</div>
                      <div className="text-lg font-bold">{tournament.prizePool.first.toLocaleString()} XP</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                      <div className="text-xs text-indigo-100 mb-1">Participants</div>
                      <div className="text-lg font-bold">{tournament.participants.length}</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                      <div className="text-xs text-indigo-100 mb-1">Ends In</div>
                      <div className="text-lg font-bold">
                        {Math.ceil((new Date(tournament.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedTournament(tournament)}
                    className="w-full py-3 bg-white text-indigo-600 rounded-xl hover:bg-indigo-50 transition-colors font-semibold"
                  >
                    View Details & Leaderboard
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Tournaments */}
      {upcomingTournaments.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            Upcoming Tournaments
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingTournaments.map((tournament) => (
              <div
                key={tournament.id}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-slate-100 p-3 rounded-xl">
                    <Trophy className="w-6 h-6 text-slate-600" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTournamentTypeColor(tournament.type)}`}>
                    {tournament.type}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{tournament.name}</h3>
                <p className="text-slate-600 text-sm mb-4">{tournament.description}</p>
                <div className="space-y-2 text-sm text-slate-500 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Starts {format(new Date(tournament.startDate), 'MMM dd, yyyy')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    <span>Prize: {tournament.prizePool.first.toLocaleString()} XP</span>
                  </div>
                </div>
                <button className="w-full py-2 border-2 border-indigo-600 text-indigo-600 rounded-xl hover:bg-indigo-50 transition-colors font-semibold">
                  Register
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tournament Details Modal */}
      {selectedTournament && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Icon3DImage type="trophy" size={48} float={true} />
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">{selectedTournament.name}</h2>
                  <p className="text-slate-600">{selectedTournament.description}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedTournament(null)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Prize Pool */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-6 rounded-xl text-white text-center">
                  <Trophy className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{selectedTournament.prizePool.first.toLocaleString()}</div>
                  <div className="text-sm opacity-90">1st Place</div>
                </div>
                <div className="bg-gradient-to-br from-slate-300 to-slate-400 p-6 rounded-xl text-white text-center">
                  <Award className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{selectedTournament.prizePool.second.toLocaleString()}</div>
                  <div className="text-sm opacity-90">2nd Place</div>
                </div>
                <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-6 rounded-xl text-white text-center">
                  <Award className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{selectedTournament.prizePool.third.toLocaleString()}</div>
                  <div className="text-sm opacity-90">3rd Place</div>
                </div>
              </div>

              {/* Leaderboard */}
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Leaderboard
                </h3>
                <div className="space-y-3">
                  {selectedTournament.leaderboard.map((entry) => {
                    const team = MOCK_TEAMS.find(t => t.id === entry.id);
                    return (
                      <div
                        key={entry.id}
                        className={`p-4 rounded-xl border-2 ${
                          entry.rank === 1
                            ? 'border-yellow-400 bg-yellow-50'
                            : entry.rank === 2
                            ? 'border-slate-300 bg-slate-50'
                            : entry.rank === 3
                            ? 'border-amber-400 bg-amber-50'
                            : 'border-slate-200 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl ${
                            entry.rank === 1 ? 'bg-yellow-400 text-yellow-900' :
                            entry.rank === 2 ? 'bg-slate-300 text-slate-800' :
                            entry.rank === 3 ? 'bg-amber-400 text-amber-900' :
                            'bg-slate-200 text-slate-700'
                          }`}>
                            {entry.rank}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-slate-800">{entry.name}</h4>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="text-sm text-slate-600">{entry.score.toLocaleString()} points</span>
                              <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden max-w-xs">
                                <div
                                  className="h-full bg-indigo-600 transition-all"
                                  style={{ width: `${entry.progress}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Rules */}
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Tournament Rules</h3>
                <ul className="space-y-2">
                  {selectedTournament.rules.map((rule, index) => (
                    <li key={index} className="flex items-start gap-2 text-slate-700">
                      <span className="text-indigo-600 font-bold mt-1">•</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Join Button */}
              {selectedTournament.status === 'ACTIVE' && (
                <button className="w-full py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-semibold flex items-center justify-center gap-2">
                  <Play className="w-5 h-5" />
                  Join Tournament
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
