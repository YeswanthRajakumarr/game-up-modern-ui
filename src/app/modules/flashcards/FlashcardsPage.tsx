import React, { useState } from 'react';
import { BookOpen, RotateCw, CheckCircle, XCircle, Plus, Search, Share2, TrendingUp } from 'lucide-react';
import { MOCK_FLASHCARDS, MOCK_FLASHCARD_DECKS, MOCK_USERS } from '../../../shared/mockData';
import type { Flashcard, FlashcardDeck } from '../../../shared/types';
import { useAuth } from '../../global-context/AuthContext';
import { Icon3DImage } from '../../../shared/components/Icon3DImage';
import { format } from 'date-fns';

export const FlashcardsPage = () => {
  const { user } = useAuth();
  const [selectedDeck, setSelectedDeck] = useState<FlashcardDeck | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [studyMode, setStudyMode] = useState(false);

  const decks = MOCK_FLASHCARD_DECKS;
  const currentDeckCards = selectedDeck 
    ? MOCK_FLASHCARDS.filter(c => selectedDeck.cardIds.includes(c.id))
    : [];
  const currentCard = currentDeckCards[currentCardIndex];

  const handleStartStudy = (deck: FlashcardDeck) => {
    setSelectedDeck(deck);
    setStudyMode(true);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setShowAnswer(false);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setShowAnswer(true);
  };

  const handleAnswer = (correct: boolean) => {
    if (currentCardIndex < currentDeckCards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
      setIsFlipped(false);
      setShowAnswer(false);
    } else {
      // Study session complete
      setStudyMode(false);
      setSelectedDeck(null);
    }
  };

  const getMasteryColor = (level: number) => {
    if (level >= 80) return 'text-emerald-600';
    if (level >= 50) return 'text-amber-600';
    return 'text-red-600';
  };

  if (studyMode && currentCard) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <div className="text-sm text-slate-500 mb-2">
            Card {currentCardIndex + 1} of {currentDeckCards.length}
          </div>
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 transition-all"
              style={{ width: `${((currentCardIndex + 1) / currentDeckCards.length) * 100}%` }}
            />
          </div>
        </div>

        <div
          className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 p-12 min-h-[400px] flex items-center justify-center cursor-pointer transform transition-transform hover:scale-105"
          onClick={handleFlip}
        >
          <div className="text-center w-full">
            {!isFlipped ? (
              <div>
                <div className="text-sm font-semibold text-slate-500 mb-4 uppercase tracking-wide">Front</div>
                <h2 className="text-3xl font-bold text-slate-800">{currentCard.front}</h2>
                <p className="text-slate-500 mt-4">Click to reveal answer</p>
              </div>
            ) : (
              <div>
                <div className="text-sm font-semibold text-slate-500 mb-4 uppercase tracking-wide">Back</div>
                <h2 className="text-3xl font-bold text-slate-800">{currentCard.back}</h2>
                <div className="mt-6 flex items-center justify-center gap-2">
                  <span className="text-sm text-slate-500">Difficulty:</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    currentCard.difficulty === 'EASY' ? 'bg-emerald-100 text-emerald-700' :
                    currentCard.difficulty === 'MEDIUM' ? 'bg-amber-100 text-amber-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {currentCard.difficulty}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {showAnswer && (
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => handleAnswer(false)}
              className="px-8 py-4 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-colors font-semibold flex items-center gap-2"
            >
              <XCircle className="w-5 h-5" />
              Incorrect
            </button>
            <button
              onClick={() => handleAnswer(true)}
              className="px-8 py-4 bg-emerald-100 text-emerald-700 rounded-xl hover:bg-emerald-200 transition-colors font-semibold flex items-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Correct
            </button>
          </div>
        )}

        <button
          onClick={() => {
            setStudyMode(false);
            setSelectedDeck(null);
          }}
          className="w-full py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-semibold"
        >
          Exit Study Mode
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Icon3DImage type="notebook" size={48} float={true} />
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Flashcards</h1>
            <p className="text-slate-500 mt-1">Master concepts with spaced repetition</p>
          </div>
        </div>
        <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2 font-semibold">
          <Plus className="w-5 h-5" />
          Create Deck
        </button>
      </div>

      {/* My Decks */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-4">My Decks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {decks.map((deck) => (
            <div
              key={deck.id}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="bg-indigo-100 p-3 rounded-xl">
                  <BookOpen className="w-6 h-6 text-indigo-600" />
                </div>
                {deck.isPublic && (
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                    Public
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{deck.name}</h3>
              <p className="text-slate-600 text-sm mb-4">{deck.description}</p>
              <div className="space-y-2 text-sm text-slate-500 mb-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>{deck.totalCards} cards</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>{deck.studyCount} study sessions</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                    {deck.subject}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleStartStudy(deck)}
                className="w-full py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-semibold"
              >
                Start Studying
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Deck Details Modal */}
      {selectedDeck && !studyMode && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-indigo-100 p-3 rounded-xl">
                  <BookOpen className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">{selectedDeck.name}</h2>
                  <p className="text-slate-600">{selectedDeck.description}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedDeck(null)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-slate-800">{selectedDeck.totalCards}</div>
                  <div className="text-sm text-slate-600">Total Cards</div>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-slate-800">{selectedDeck.studyCount}</div>
                  <div className="text-sm text-slate-600">Study Sessions</div>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-slate-800">
                    {Math.round((MOCK_FLASHCARDS.filter(c => selectedDeck.cardIds.includes(c.id)).reduce((sum, c) => sum + c.masteryLevel, 0) / selectedDeck.totalCards))}%
                  </div>
                  <div className="text-sm text-slate-600">Avg Mastery</div>
                </div>
              </div>

              <h3 className="font-bold text-slate-800 mb-4">Cards in this deck</h3>
              <div className="space-y-3">
                {MOCK_FLASHCARDS.filter(c => selectedDeck.cardIds.includes(c.id)).map((card) => (
                  <div key={card.id} className="border border-slate-200 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="font-semibold text-slate-800 mb-1">{card.front}</div>
                        <div className="text-sm text-slate-600">{card.back}</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-semibold ${getMasteryColor(card.masteryLevel)}`}>
                          {card.masteryLevel}%
                        </div>
                        <div className="text-xs text-slate-500">Mastery</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      {card.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => handleStartStudy(selectedDeck)}
                  className="flex-1 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-semibold"
                >
                  Start Studying
                </button>
                <button className="px-6 py-3 border-2 border-indigo-600 text-indigo-600 rounded-xl hover:bg-indigo-50 transition-colors font-semibold">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
