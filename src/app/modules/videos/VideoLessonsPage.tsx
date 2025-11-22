import React, { useState } from 'react';
import { Play, Clock, Eye, Heart, BookOpen, CheckCircle, List, Search } from 'lucide-react';
import { MOCK_VIDEO_LESSONS, MOCK_PLAYLISTS, MOCK_USERS } from '../../../shared/mockData';
import type { VideoLesson, Playlist, VideoProgress } from '../../../shared/types';
import { useAuth } from '../../global-context/AuthContext';
import { Icon3DImage } from '../../../shared/components/Icon3DImage';
import { format } from 'date-fns';

export const VideoLessonsPage = () => {
  const { user } = useAuth();
  const [selectedVideo, setSelectedVideo] = useState<VideoLesson | null>(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSubject, setFilterSubject] = useState<string>('ALL');

  const videos = MOCK_VIDEO_LESSONS;
  const playlists = MOCK_PLAYLISTS;
  const [videoProgress, setVideoProgress] = useState<Record<string, VideoProgress>>({});

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = (videoId: string) => {
    return videoProgress[videoId]?.progress || 0;
  };

  const handleVideoClick = (video: VideoLesson) => {
    setSelectedVideo(video);
    // In real app, this would open video player
  };

  const handleCompleteVideo = (videoId: string) => {
    setVideoProgress(prev => ({
      ...prev,
      [videoId]: {
        videoId,
        userId: user?.id || '',
        progress: 100,
        watchedAt: new Date().toISOString(),
        completed: true,
        xpEarned: true,
      },
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Icon3DImage type="star" size={48} float={true} />
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Video Lessons</h1>
            <p className="text-slate-500 mt-1">Learn through engaging video content</p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search videos..."
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

      {/* Playlists */}
      {playlists.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <List className="w-5 h-5" />
            Playlists
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {playlists.map((playlist) => (
              <div
                key={playlist.id}
                onClick={() => setSelectedPlaylist(playlist)}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-4 rounded-xl mb-4">
                  <List className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{playlist.name}</h3>
                <p className="text-slate-600 text-sm mb-4">{playlist.description}</p>
                <div className="text-sm text-slate-500">
                  {playlist.videoIds.length} video{playlist.videoIds.length !== 1 ? 's' : ''}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Video Lessons Grid */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-4">All Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => {
            const progress = getProgress(video.id);
            const isCompleted = videoProgress[video.id]?.completed || false;

            return (
              <div
                key={video.id}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all cursor-pointer"
                onClick={() => handleVideoClick(video)}
              >
                <div className="relative">
                  <div className="aspect-video bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <Play className="w-16 h-16 text-white opacity-80" />
                  </div>
                  {progress > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-200">
                      <div
                        className="h-full bg-indigo-600 transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                  {isCompleted && (
                    <div className="absolute top-2 right-2 bg-emerald-500 text-white p-2 rounded-full">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                  )}
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-semibold">
                    {formatDuration(video.duration)}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">
                      {video.subject}
                    </span>
                    {video.xpReward > 0 && (
                      <span className="text-sm font-semibold text-amber-600 flex items-center gap-1">
                        <Icon3DImage type="star" size={16} />
                        {video.xpReward} XP
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{video.title}</h3>
                  <p className="text-slate-600 text-sm mb-4">{video.description}</p>
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{video.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        <span>{video.likes}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{formatDuration(video.duration)}</span>
                    </div>
                  </div>
                  {progress > 0 && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                        <span>Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-600 transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">{selectedVideo.title}</h2>
                <p className="text-slate-600">{selectedVideo.description}</p>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="aspect-video bg-slate-900 rounded-xl mb-6 flex items-center justify-center">
                <div className="text-center text-white">
                  <Play className="w-20 h-20 mx-auto mb-4 opacity-80" />
                  <p className="text-lg">Video Player</p>
                  <p className="text-sm text-slate-400 mt-2">Click to play</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-slate-600" />
                    <span className="text-slate-700">{selectedVideo.views} views</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-slate-600" />
                    <span className="text-slate-700">{selectedVideo.likes} likes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-slate-600" />
                    <span className="text-slate-700">{formatDuration(selectedVideo.duration)}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleCompleteVideo(selectedVideo.id);
                    setSelectedVideo(null);
                  }}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-semibold"
                >
                  Mark as Complete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
