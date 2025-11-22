import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { TrendingUp, Users, Award, BookOpen, Brain, AlertTriangle, Lightbulb, MessageSquare, Sparkles, TrendingDown, CheckCircle, Clock } from 'lucide-react';
import { MOCK_AI_INSIGHTS, MOCK_AI_PREDICTIONS, MOCK_AI_RISK_ALERTS, MOCK_AI_RECOMMENDATIONS } from '../../../shared/mockData';
import type { AIInsight, AIPrediction, AIRiskAlert, AIRecommendation } from '../../../shared/types';
import { Icon3DImage } from '../../../shared/components/Icon3DImage';
import { format } from 'date-fns';

const ENGAGEMENT_DATA = [
  { month: 'Jan', active: 1200, completed: 950 },
  { month: 'Feb', active: 1350, completed: 1100 },
  { month: 'Mar', active: 1500, completed: 1250 },
  { month: 'Apr', active: 1450, completed: 1300 },
  { month: 'May', active: 1600, completed: 1400 },
  { month: 'Jun', active: 1700, completed: 1500 },
];

const SUBJECT_DISTRIBUTION = [
  { name: 'Math', value: 35, color: '#6366f1' },
  { name: 'Science', value: 25, color: '#ec4899' },
  { name: 'English', value: 20, color: '#10b981' },
  { name: 'History', value: 15, color: '#f59e0b' },
  { name: 'Other', value: 5, color: '#6b7280' },
];

const GRADE_DISTRIBUTION = [
  { grade: 'A', count: 45 },
  { grade: 'B', count: 60 },
  { grade: 'C', count: 35 },
  { grade: 'D', count: 15 },
  { grade: 'F', count: 5 },
];

export const AnalyticsPage = () => {
  const [selectedTab, setSelectedTab] = useState<'OVERVIEW' | 'AI_INSIGHTS' | 'PREDICTIONS' | 'RISKS' | 'RECOMMENDATIONS'>('OVERVIEW');
  const [selectedInsight, setSelectedInsight] = useState<AIInsight | null>(null);
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponses, setAiResponses] = useState<Array<{ query: string; response: string; timestamp: string }>>([
    {
      query: 'What are the key trends this month?',
      response: 'Based on the data, I\'ve identified several key trends: Math performance is improving (12% increase), Science engagement is up 40%, and overall student participation has increased by 25% due to gamification elements. The system shows strong positive momentum.',
      timestamp: new Date().toISOString(),
    },
  ]);

  const getInsightIcon = (type: AIInsight['type']) => {
    switch (type) {
      case 'PREDICTION':
        return <TrendingUp className="w-5 h-5" />;
      case 'RISK':
        return <AlertTriangle className="w-5 h-5" />;
      case 'OPPORTUNITY':
        return <Lightbulb className="w-5 h-5" />;
      case 'TREND':
        return <TrendingUp className="w-5 h-5" />;
      case 'RECOMMENDATION':
        return <CheckCircle className="w-5 h-5" />;
    }
  };

  const getInsightColor = (type: AIInsight['type']) => {
    switch (type) {
      case 'PREDICTION':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'RISK':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'OPPORTUNITY':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'TREND':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'RECOMMENDATION':
        return 'bg-amber-100 text-amber-700 border-amber-200';
    }
  };

  const getSeverityColor = (severity: AIRiskAlert['severity']) => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-red-600 text-white';
      case 'HIGH':
        return 'bg-orange-500 text-white';
      case 'MEDIUM':
        return 'bg-amber-500 text-white';
      case 'LOW':
        return 'bg-blue-500 text-white';
    }
  };

  const handleAIQuery = () => {
    if (!aiQuery.trim()) return;
    
    // Mock AI responses
    const mockResponses = [
      'Based on the analytics, I can see that student engagement has increased significantly this month. The gamification features are showing excellent results.',
      'The data indicates that Math performance is trending upward. I recommend continuing the current teaching strategies.',
      'I\'ve analyzed the attendance patterns and found that most students maintain good attendance. However, there are a few students who may need additional support.',
      'The AI system has identified several opportunities for improvement, particularly in Science content where engagement is high.',
    ];
    
    const response = mockResponses[Math.floor(Math.random() * mockResponses.length)];
    setAiResponses(prev => [...prev, {
      query: aiQuery,
      response,
      timestamp: new Date().toISOString(),
    }]);
    setAiQuery('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Icon3DImage type="star" size={48} float={true} />
          <div>
            <h1 className="text-3xl font-bold text-slate-800">School Analytics</h1>
            <p className="text-slate-500 mt-1">AI-powered insights and comprehensive analytics</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 rounded-xl text-white">
          <Sparkles className="w-5 h-5" />
          <span className="font-semibold">AI Assistant Active</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-2">
        <div className="flex items-center gap-2">
          {(['OVERVIEW', 'AI_INSIGHTS', 'PREDICTIONS', 'RISKS', 'RECOMMENDATIONS'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                selectedTab === tab
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {tab.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Tab */}
      {selectedTab === 'OVERVIEW' && (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-6 rounded-2xl text-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <Users className="w-8 h-8 opacity-80" />
                <span className="text-sm opacity-80">+12%</span>
              </div>
              <div className="text-3xl font-bold mb-1">1,234</div>
              <div className="text-sm opacity-90">Total Students</div>
            </div>
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 rounded-2xl text-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <BookOpen className="w-8 h-8 opacity-80" />
                <span className="text-sm opacity-80">+8%</span>
              </div>
              <div className="text-3xl font-bold mb-1">456</div>
              <div className="text-sm opacity-90">Active Tasks</div>
            </div>
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-6 rounded-2xl text-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <Award className="w-8 h-8 opacity-80" />
                <span className="text-sm opacity-80">+15%</span>
              </div>
              <div className="text-3xl font-bold mb-1">89%</div>
              <div className="text-sm opacity-90">Completion Rate</div>
            </div>
            <div className="bg-gradient-to-br from-pink-500 to-pink-600 p-6 rounded-2xl text-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-8 h-8 opacity-80" />
                <span className="text-sm opacity-80">+22%</span>
              </div>
              <div className="text-3xl font-bold mb-1">2.5M</div>
              <div className="text-sm opacity-90">Total XP Earned</div>
            </div>
          </div>

          {/* AI Quick Insights */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border-2 border-indigo-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">AI Quick Insights</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MOCK_AI_INSIGHTS.slice(0, 4).map((insight) => (
                <div
                  key={insight.id}
                  className="bg-white rounded-xl p-4 border border-slate-200 hover:shadow-md transition-all cursor-pointer"
                  onClick={() => {
                    setSelectedTab('AI_INSIGHTS');
                    setSelectedInsight(insight);
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className={`flex items-center gap-2 px-2 py-1 rounded-lg text-xs font-semibold ${getInsightColor(insight.type)}`}>
                      {getInsightIcon(insight.type)}
                      <span>{insight.type}</span>
                    </div>
                    <span className="text-xs text-slate-500">{insight.confidence}% confidence</span>
                  </div>
                  <h3 className="font-bold text-slate-800 mb-1">{insight.title}</h3>
                  <p className="text-sm text-slate-600 line-clamp-2">{insight.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-6">Student Engagement Trend</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={ENGAGEMENT_DATA}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="active" stroke="#6366f1" strokeWidth={3} name="Active Students" dot={{r: 4}} />
                    <Line type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={3} name="Completed Tasks" dot={{r: 4}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-6">Task Distribution by Subject</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={SUBJECT_DISTRIBUTION}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {SUBJECT_DISTRIBUTION.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 lg:col-span-2">
              <h3 className="font-bold text-slate-800 mb-6">Grade Distribution</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={GRADE_DISTRIBUTION}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="grade" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                      cursor={{fill: '#f8fafc'}}
                    />
                    <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={60} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </>
      )}

      {/* AI Insights Tab */}
      {selectedTab === 'AI_INSIGHTS' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <Brain className="w-8 h-8" />
              <h2 className="text-2xl font-bold">AI-Powered Insights</h2>
            </div>
            <p className="text-indigo-100">Real-time analysis and intelligent recommendations powered by AI</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {MOCK_AI_INSIGHTS.map((insight) => (
              <div
                key={insight.id}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl ${getInsightColor(insight.type)}`}>
                      {getInsightIcon(insight.type)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">{insight.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          insight.impact === 'HIGH' ? 'bg-red-100 text-red-700' :
                          insight.impact === 'MEDIUM' ? 'bg-amber-100 text-amber-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {insight.impact} Impact
                        </span>
                        <span className="text-xs text-slate-500">
                          {insight.category} • {format(new Date(insight.timestamp), 'MMM dd, yyyy')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-indigo-600">{insight.confidence}%</div>
                    <div className="text-xs text-slate-500">Confidence</div>
                  </div>
                </div>
                <p className="text-slate-700 mb-4">{insight.description}</p>
                {insight.relatedData && (
                  <div className="bg-slate-50 rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">{insight.relatedData.metric}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-slate-800">{insight.relatedData.value}%</span>
                        {insight.relatedData.trend === 'UP' ? (
                          <TrendingUp className="w-5 h-5 text-emerald-600" />
                        ) : (
                          <TrendingDown className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {insight.actionItems && insight.actionItems.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">Recommended Actions:</h4>
                    <ul className="space-y-1">
                      {insight.actionItems.map((action, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                          <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Predictions Tab */}
      {selectedTab === 'PREDICTIONS' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-8 h-8" />
              <h2 className="text-2xl font-bold">AI Predictions</h2>
            </div>
            <p className="text-blue-100">Forecasted outcomes based on current data patterns</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MOCK_AI_PREDICTIONS.map((prediction) => (
              <div key={prediction.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-1">{prediction.target}</h3>
                    <span className="text-sm text-slate-500">{prediction.timeframe}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{prediction.confidence}%</div>
                    <div className="text-xs text-slate-500">Confidence</div>
                  </div>
                </div>
                <p className="text-slate-700 mb-4">{prediction.prediction}</p>
                <div className="bg-blue-50 rounded-xl p-4 mb-4">
                  <h4 className="font-semibold text-slate-800 mb-2">Key Factors:</h4>
                  <ul className="space-y-1">
                    {prediction.factors.map((factor, index) => (
                      <li key={index} className="text-sm text-slate-700 flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        <span>{factor}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-emerald-50 border-l-4 border-emerald-500 rounded-r-lg p-3">
                  <p className="text-sm font-semibold text-emerald-900 mb-1">Recommendation:</p>
                  <p className="text-sm text-emerald-800">{prediction.recommendation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Risks Tab */}
      {selectedTab === 'RISKS' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="w-8 h-8" />
              <h2 className="text-2xl font-bold">Risk Alerts</h2>
            </div>
            <p className="text-red-100">AI-identified students and situations requiring attention</p>
          </div>

          <div className="space-y-4">
            {MOCK_AI_RISK_ALERTS.map((risk) => (
              <div key={risk.id} className="bg-white rounded-2xl shadow-sm border-2 border-slate-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`px-4 py-2 rounded-xl font-bold ${getSeverityColor(risk.severity)}`}>
                      {risk.severity}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">{risk.studentName}</h3>
                      <span className="text-sm text-slate-500">{risk.riskType} Risk</span>
                    </div>
                  </div>
                  <span className="text-xs text-slate-500">
                    {format(new Date(risk.detectedAt), 'MMM dd, HH:mm')}
                  </span>
                </div>
                <p className="text-slate-700 mb-4">{risk.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">Indicators:</h4>
                    <ul className="space-y-1">
                      {risk.indicators.map((indicator, index) => (
                        <li key={index} className="text-sm text-slate-700 flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                          <span>{indicator}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">Suggested Actions:</h4>
                    <ul className="space-y-1">
                      {risk.suggestedActions.map((action, index) => (
                        <li key={index} className="text-sm text-slate-700 flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations Tab */}
      {selectedTab === 'RECOMMENDATIONS' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <Lightbulb className="w-8 h-8" />
              <h2 className="text-2xl font-bold">AI Recommendations</h2>
            </div>
            <p className="text-emerald-100">Strategic recommendations to improve school performance</p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {MOCK_AI_RECOMMENDATIONS.map((rec) => (
              <div key={rec.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        rec.priority === 'HIGH' ? 'bg-red-100 text-red-700' :
                        rec.priority === 'MEDIUM' ? 'bg-amber-100 text-amber-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {rec.priority} Priority
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                        {rec.category}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        rec.implementationEffort === 'LOW' ? 'bg-emerald-100 text-emerald-700' :
                        rec.implementationEffort === 'MEDIUM' ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {rec.implementationEffort} Effort
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">{rec.title}</h3>
                    <p className="text-slate-700 mb-4">{rec.description}</p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-200">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                    <span className="font-semibold text-emerald-900">Estimated Impact:</span>
                  </div>
                  <p className="text-emerald-800 font-semibold">{rec.estimatedImpact}</p>
                </div>
                <div className="mt-4 flex gap-3">
                  <button className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-semibold">
                    Implement
                  </button>
                  <button className="px-6 py-2 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-semibold">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Chatbot */}
      <div className="bg-white rounded-2xl shadow-lg border-2 border-indigo-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-3 rounded-xl">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">AI Assistant</h3>
            <p className="text-sm text-slate-500">Ask questions about your school's analytics</p>
          </div>
        </div>
        <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
          {aiResponses.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-start gap-2">
                <div className="bg-slate-100 p-2 rounded-lg">
                  <Users className="w-4 h-4 text-slate-600" />
                </div>
                <div className="flex-1 bg-slate-50 rounded-xl p-3">
                  <p className="text-sm text-slate-700">{item.query}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2 rounded-lg">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 bg-indigo-50 rounded-xl p-3">
                  <p className="text-sm text-slate-700">{item.response}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={aiQuery}
            onChange={(e) => setAiQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAIQuery()}
            placeholder="Ask AI about your analytics..."
            className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            onClick={handleAIQuery}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-semibold flex items-center gap-2"
          >
            <MessageSquare className="w-5 h-5" />
            Send
          </button>
        </div>
      </div>
    </div>
  );
};