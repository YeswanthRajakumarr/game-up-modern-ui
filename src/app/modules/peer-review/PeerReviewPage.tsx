import { useState } from 'react';
import { Users, Star, MessageSquare, CheckCircle, Clock, Award, ThumbsUp, ThumbsDown } from 'lucide-react';
import { MOCK_PEER_REVIEWS } from '../../../shared/mockData';
import type { PeerReview } from '../../../shared/types';
import { Icon3DImage } from '../../../shared/components/Icon3DImage';
import { format } from 'date-fns';

export const PeerReviewPage = () => {
  const [selectedReview, setSelectedReview] = useState<PeerReview | null>(null);
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'COMPLETED'>('ALL');

  const reviews = MOCK_PEER_REVIEWS;
  const pendingReviews: PeerReview[] = []; // In real app, these would be tasks waiting for review
  const completedReviews = reviews;

  const filteredReviews = filter === 'ALL' 
    ? reviews 
    : filter === 'PENDING' 
    ? pendingReviews 
    : completedReviews;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Icon3DImage type="star" size={48} float={true} />
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Peer Review</h1>
            <p className="text-slate-500 mt-1">Review classmates' work and provide constructive feedback</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-2xl text-white">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-6 h-6" />
            <div className="text-2xl font-bold">{pendingReviews.length}</div>
          </div>
          <div className="text-sm opacity-90">Pending Reviews</div>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-2xl text-white">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-6 h-6" />
            <div className="text-2xl font-bold">{completedReviews.length}</div>
          </div>
          <div className="text-sm opacity-90">Completed Reviews</div>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-6 rounded-2xl text-white">
          <div className="flex items-center gap-3 mb-2">
            <Award className="w-6 h-6" />
            <div className="text-2xl font-bold">
              {reviews.reduce((sum, r) => sum + r.xpEarned, 0)}
            </div>
          </div>
          <div className="text-sm opacity-90">Total XP Earned</div>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-700">Filter:</span>
          {(['ALL', 'PENDING', 'COMPLETED'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                filter === f
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      {filteredReviews.length > 0 ? (
        <div className="space-y-4">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              onClick={() => setSelectedReview(review)}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="bg-indigo-100 p-3 rounded-xl">
                    <Users className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 mb-1">{review.taskTitle}</h3>
                    <p className="text-sm text-slate-600">
                      Reviewed <span className="font-semibold">{review.revieweeName}</span>'s work
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex">{renderStars(review.rating)}</div>
                  <span className="text-sm text-slate-500">
                    {format(new Date(review.submittedAt), 'MMM dd')}
                  </span>
                </div>
              </div>
              <p className="text-slate-700 mb-3 line-clamp-2">{review.feedback}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-emerald-600">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{review.strengths.length} strengths</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-600">
                    <ThumbsDown className="w-4 h-4" />
                    <span>{review.improvements.length} improvements</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-amber-600 font-semibold">
                  <Icon3DImage type="star" size={16} />
                  <span>+{review.xpEarned} XP</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center">
          <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-700 mb-2">No reviews available</h3>
          <p className="text-slate-500">Check back later for peer review opportunities</p>
        </div>
      )}

      {/* Review Detail Modal */}
      {selectedReview && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">{selectedReview.taskTitle}</h2>
                <p className="text-slate-600 mt-1">
                  Review by <span className="font-semibold">{selectedReview.reviewerName}</span> for{' '}
                  <span className="font-semibold">{selectedReview.revieweeName}</span>
                </p>
              </div>
              <button
                onClick={() => setSelectedReview(null)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Rating */}
              <div>
                <h3 className="font-semibold text-slate-800 mb-3">Overall Rating</h3>
                <div className="flex items-center gap-2">
                  {renderStars(selectedReview.rating)}
                  <span className="text-lg font-bold text-slate-800 ml-2">
                    {selectedReview.rating} / 5
                  </span>
                </div>
              </div>

              {/* Feedback */}
              <div>
                <h3 className="font-semibold text-slate-800 mb-3">Feedback</h3>
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-slate-700">{selectedReview.feedback}</p>
                </div>
              </div>

              {/* Strengths */}
              {selectedReview.strengths.length > 0 && (
                <div>
                  <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    <ThumbsUp className="w-5 h-5 text-emerald-600" />
                    Strengths
                  </h3>
                  <div className="space-y-2">
                    {selectedReview.strengths.map((strength, index) => (
                      <div key={index} className="flex items-start gap-2 bg-emerald-50 rounded-lg p-3">
                        <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700">{strength}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Improvements */}
              {selectedReview.improvements.length > 0 && (
                <div>
                  <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    <ThumbsDown className="w-5 h-5 text-amber-600" />
                    Areas for Improvement
                  </h3>
                  <div className="space-y-2">
                    {selectedReview.improvements.map((improvement, index) => (
                      <div key={index} className="flex items-start gap-2 bg-amber-50 rounded-lg p-3">
                        <MessageSquare className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700">{improvement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* XP Reward */}
              <div className="bg-gradient-to-r from-amber-400 to-yellow-500 rounded-xl p-4 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon3DImage type="star" size={24} />
                  <span className="font-semibold">XP Earned for this review</span>
                </div>
                <div className="text-2xl font-bold">+{selectedReview.xpEarned}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
