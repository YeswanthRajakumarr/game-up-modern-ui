import React, { useState } from 'react';
import { BookOpen, Clock, CheckCircle, XCircle, Play, Award, TrendingUp } from 'lucide-react';
import { MOCK_QUIZZES, MOCK_USERS } from '../../../shared/mockData';
import type { Quiz, QuizQuestion, QuizAnswer } from '../../../shared/types';
import { useAuth } from '../../global-context/AuthContext';
import { Icon3DImage } from '../../../shared/components/Icon3DImage';
import { format } from 'date-fns';

export const QuizzesPage = () => {
  const { user } = useAuth();
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  const availableQuizzes = MOCK_QUIZZES.filter(q => q.status === 'ACTIVE');
  const currentQuestion = selectedQuiz?.questions[currentQuestionIndex];

  const handleStartQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
    if (quiz.timeLimit) {
      setTimeRemaining(quiz.timeLimit * 60); // Convert to seconds
    }
  };

  const handleAnswerChange = (questionId: string, answer: string | string[]) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (selectedQuiz && currentQuestionIndex < selectedQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
    setQuizStarted(false);
  };

  const calculateScore = () => {
    if (!selectedQuiz) return { score: 0, total: 0, percentage: 0 };
    
    let score = 0;
    selectedQuiz.questions.forEach(question => {
      const userAnswer = answers[question.id];
      if (Array.isArray(question.correctAnswer)) {
        if (Array.isArray(userAnswer) && 
            userAnswer.length === question.correctAnswer.length &&
            userAnswer.every(a => question.correctAnswer.includes(a))) {
          score += question.points;
        }
      } else {
        if (userAnswer === question.correctAnswer) {
          score += question.points;
        }
      }
    });

    return {
      score,
      total: selectedQuiz.totalPoints,
      percentage: Math.round((score / selectedQuiz.totalPoints) * 100),
    };
  };

  const results = showResults ? calculateScore() : null;

  if (quizStarted && selectedQuiz && !showResults) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Quiz Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">{selectedQuiz.title}</h2>
              <p className="text-slate-500 mt-1">{selectedQuiz.description}</p>
            </div>
            {timeRemaining !== null && (
              <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-xl">
                <Clock className="w-5 h-5 text-red-600" />
                <span className="font-bold text-red-600">
                  {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span>Question {currentQuestionIndex + 1} of {selectedQuiz.questions.length}</span>
            <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / selectedQuiz.questions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question */}
        {currentQuestion && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">
                  {currentQuestion.type.replace('_', ' ')}
                </span>
                <span className="text-sm text-slate-500">{currentQuestion.points} points</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-6">{currentQuestion.question}</h3>
            </div>

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQuestion.type === 'MULTIPLE_CHOICE' && currentQuestion.options && (
                currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerChange(currentQuestion.id, option)}
                    className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                      answers[currentQuestion.id] === option
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
                    }`}
                  >
                    <span className="font-medium text-slate-800">{option}</span>
                  </button>
                ))
              )}

              {currentQuestion.type === 'TRUE_FALSE' && currentQuestion.options && (
                <div className="grid grid-cols-2 gap-4">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerChange(currentQuestion.id, option)}
                      className={`p-6 text-center rounded-xl border-2 transition-all ${
                        answers[currentQuestion.id] === option
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
                      }`}
                    >
                      <span className="font-bold text-lg text-slate-800">{option}</span>
                    </button>
                  ))}
                </div>
              )}

              {currentQuestion.type === 'SHORT_ANSWER' && (
                <textarea
                  value={answers[currentQuestion.id] as string || ''}
                  onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                  placeholder="Type your answer here..."
                  className="w-full p-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[120px]"
                />
              )}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                disabled={currentQuestionIndex === 0}
                className="px-6 py-2 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
              >
                {currentQuestionIndex === selectedQuiz.questions.length - 1 ? 'Submit Quiz' : 'Next'}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (showResults && results) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white text-center">
          <Icon3DImage type="trophy" size={64} float={true} />
          <h2 className="text-3xl font-bold mt-4 mb-2">Quiz Complete!</h2>
          <div className="text-5xl font-bold mb-2">{results.percentage}%</div>
          <p className="text-indigo-100">You scored {results.score} out of {results.total} points</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Question Review</h3>
          <div className="space-y-4">
            {selectedQuiz?.questions.map((question, index) => {
              const userAnswer = answers[question.id];
              const isCorrect = Array.isArray(question.correctAnswer)
                ? Array.isArray(userAnswer) && userAnswer.length === question.correctAnswer.length
                : userAnswer === question.correctAnswer;

              return (
                <div key={question.id} className="border border-slate-200 rounded-xl p-4">
                  <div className="flex items-start gap-3 mb-3">
                    {isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-slate-800">Question {index + 1}</span>
                        <span className={`text-sm font-medium ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                          {isCorrect ? `+${question.points} points` : '0 points'}
                        </span>
                      </div>
                      <p className="text-slate-700 mb-2">{question.question}</p>
                      <div className="space-y-1 text-sm">
                        <p className="text-slate-600">
                          <span className="font-medium">Your answer:</span> {userAnswer || 'No answer'}
                        </p>
                        {!isCorrect && (
                          <p className="text-green-600">
                            <span className="font-medium">Correct answer:</span> {Array.isArray(question.correctAnswer) ? question.correctAnswer.join(', ') : question.correctAnswer}
                          </p>
                        )}
                        {question.explanation && (
                          <p className="text-slate-500 italic mt-2">{question.explanation}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => {
              setShowResults(false);
              setSelectedQuiz(null);
              setAnswers({});
            }}
            className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-semibold"
          >
            Back to Quizzes
          </button>
          {selectedQuiz && selectedQuiz.attempts < (selectedQuiz.maxAttempts || 999) && (
            <button
              onClick={() => handleStartQuiz(selectedQuiz)}
              className="flex-1 px-6 py-3 border-2 border-indigo-600 text-indigo-600 rounded-xl hover:bg-indigo-50 transition-colors font-semibold"
            >
              Retake Quiz
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Icon3DImage type="target" size={48} float={true} />
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Interactive Quizzes</h1>
            <p className="text-slate-500 mt-1">Test your knowledge and earn XP</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableQuizzes.map((quiz) => (
          <div key={quiz.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-indigo-100 p-3 rounded-xl">
                <BookOpen className="w-6 h-6 text-indigo-600" />
              </div>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                {quiz.subject}
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-800 mb-2">{quiz.title}</h3>
            <p className="text-slate-600 text-sm mb-4">{quiz.description}</p>

            <div className="space-y-2 mb-4 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>{quiz.totalQuestions} questions</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>{quiz.totalPoints} points</span>
              </div>
              {quiz.timeLimit && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{quiz.timeLimit} minutes</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>{quiz.attempts} attempt{quiz.attempts !== 1 ? 's' : ''}</span>
              </div>
            </div>

            {quiz.dueDate && (
              <p className="text-xs text-slate-500 mb-4">
                Due: {format(new Date(quiz.dueDate), 'MMM dd, yyyy')}
              </p>
            )}

            <button
              onClick={() => handleStartQuiz(quiz)}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition-colors font-semibold flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4" />
              Start Quiz
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
