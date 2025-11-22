export type UserRole = 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Student extends User {
  role: 'STUDENT';
  grade: string;
  section: string;
  xp: number;
  wallet: number; // "Rupees"
}

export interface Teacher extends User {
  role: 'TEACHER';
  department?: string;
}

export interface Class {
  id: string;
  name: string;
  grade: string;
  section: string;
  teacherId: string;
  studentCount: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  subject: string;
  assignedDate: string;
  dueDate: string;
  xpReward: number;
  status: 'PENDING' | 'SUBMITTED' | 'GRADED' | 'OVERDUE';
  submittedFileUrl?: string;
  grade?: string;
  feedback?: string;
  assignedTo?: string[]; // Class IDs or Section IDs
}

export interface LeaderboardEntry {
  rank: number;
  studentId: string;
  studentName: string;
  xp: number;
  avatar?: string;
  trend: 'UP' | 'DOWN' | 'SAME';
}

export interface Reward {
  id: string;
  name: string;
  cost: number;
  type: 'ITEM' | 'PRIVILEGE';
  image?: string;
}

export interface PerformanceData {
  subject: string;
  score: number;
  date: string;
  xpEarned: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
  read: boolean;
  timestamp: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time?: string;
  type: 'HOLIDAY' | 'EXAM' | 'EVENT' | 'DEADLINE' | 'MEETING';
  color: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  authorRole: UserRole;
  date: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  targetAudience: UserRole[];
}

export interface Grade {
  id: string;
  studentId: string;
  studentName: string;
  subject: string;
  assignment: string;
  score: number;
  maxScore: number;
  percentage: number;
  grade: string;
  date: string;
  feedback?: string;
}

export interface Attendance {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';
  subject?: string;
  notes?: string;
}

export interface StudyResource {
  id: string;
  title: string;
  description: string;
  subject: string;
  type: 'PDF' | 'VIDEO' | 'LINK' | 'DOCUMENT';
  url: string;
  uploadedBy: string;
  uploadDate: string;
  downloadCount: number;
}

export interface ProgressReport {
  id: string;
  studentId: string;
  studentName: string;
  period: string; // e.g., "Q1 2023", "Semester 1"
  subjects: {
    subject: string;
    grade: string;
    percentage: number;
    comments: string;
  }[];
  overallGPA: number;
  attendanceRate: number;
  generatedDate: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string; // emoji or icon name
  rarity: 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';
  category: 'ACADEMIC' | 'ATTENDANCE' | 'STREAK' | 'SOCIAL' | 'SPECIAL';
  unlockedAt?: string;
  progress?: number;
  maxProgress?: number;
}

export interface Streak {
  type: 'LOGIN' | 'TASK_COMPLETION' | 'PERFECT_ATTENDANCE';
  current: number;
  longest: number;
  lastDate: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'SPECIAL';
  xpReward: number;
  badgeReward?: string;
  progress: number;
  target: number;
  status: 'ACTIVE' | 'COMPLETED' | 'LOCKED';
  expiresAt?: string;
}

export interface XPMilestone {
  id: string;
  level: number;
  xpRequired: number;
  title: string;
  reward: string;
  unlocked: boolean;
  unlockedAt?: string;
}

// Messaging System Types
export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: string;
  read: boolean;
  attachments?: MessageAttachment[];
}

export interface MessageAttachment {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number;
}

export interface Conversation {
  id: string;
  type: 'DIRECT' | 'GROUP' | 'CLASS';
  name?: string; // For group/class chats
  participants: string[]; // User IDs
  lastMessage?: Message;
  unreadCount: number;
  avatar?: string;
  createdAt: string;
}

// Interactive Quizzes Types
export interface Quiz {
  id: string;
  title: string;
  description: string;
  subject: string;
  createdBy: string;
  createdAt: string;
  timeLimit?: number; // in minutes
  totalQuestions: number;
  totalPoints: number;
  attempts: number;
  maxAttempts?: number;
  questions: QuizQuestion[];
  status: 'DRAFT' | 'ACTIVE' | 'COMPLETED';
  dueDate?: string;
}

export interface QuizQuestion {
  id: string;
  type: 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'SHORT_ANSWER' | 'ESSAY';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  points: number;
  explanation?: string;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  studentId: string;
  studentName: string;
  startedAt: string;
  submittedAt?: string;
  answers: QuizAnswer[];
  score: number;
  totalPoints: number;
  percentage: number;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'TIMED_OUT';
}

export interface QuizAnswer {
  questionId: string;
  answer: string | string[];
  isCorrect: boolean;
  pointsEarned: number;
}

// Notification Center Types
export interface AppNotification {
  id: string;
  userId: string;
  type: 'TASK' | 'GRADE' | 'MESSAGE' | 'ANNOUNCEMENT' | 'ACHIEVEMENT' | 'SYSTEM';
  title: string;
  message: string;
  read: boolean;
  timestamp: string;
  actionUrl?: string;
  icon?: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface NotificationPreferences {
  userId: string;
  email: {
    tasks: boolean;
    grades: boolean;
    messages: boolean;
    announcements: boolean;
    achievements: boolean;
  };
  push: {
    tasks: boolean;
    grades: boolean;
    messages: boolean;
    announcements: boolean;
    achievements: boolean;
  };
  inApp: {
    tasks: boolean;
    grades: boolean;
    messages: boolean;
    announcements: boolean;
    achievements: boolean;
  };
}

// Teams/Clans Types
export interface Team {
  id: string;
  name: string;
  description: string;
  avatar?: string;
  leaderId: string;
  leaderName: string;
  members: TeamMember[];
  totalXP: number;
  rank: number;
  createdAt: string;
  achievements: string[]; // Badge IDs
  stats: {
    totalTasksCompleted: number;
    averageScore: number;
    activeMembers: number;
  };
}

export interface TeamMember {
  userId: string;
  userName: string;
  userAvatar?: string;
  role: 'LEADER' | 'MEMBER';
  joinedAt: string;
  contributionXP: number;
}

// Study Groups Types
export interface StudyGroup {
  id: string;
  name: string;
  description: string;
  subject: string;
  createdBy: string;
  createdAt: string;
  members: StudyGroupMember[];
  resources: StudyResource[];
  challenges: string[]; // Challenge IDs
  totalXP: number;
  avatar?: string;
}

export interface StudyGroupMember {
  userId: string;
  userName: string;
  userAvatar?: string;
  role: 'CREATOR' | 'ADMIN' | 'MEMBER';
  joinedAt: string;
  contributionXP: number;
}

// Video Lessons Types
export interface VideoLesson {
  id: string;
  title: string;
  description: string;
  subject: string;
  videoUrl: string;
  thumbnailUrl?: string;
  duration: number; // in seconds
  createdBy: string;
  createdAt: string;
  xpReward: number;
  quizzes?: string[]; // Quiz IDs embedded in video
  playlistId?: string;
  views: number;
  likes: number;
}

export interface VideoProgress {
  videoId: string;
  userId: string;
  progress: number; // 0-100 percentage
  watchedAt: string;
  completed: boolean;
  xpEarned: boolean;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  videoIds: string[];
  createdAt: string;
}

// Notes & Study Materials Types
export interface Note {
  id: string;
  title: string;
  content: string;
  subject: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
  sharedWith: string[]; // User IDs
  tags: string[];
  template?: string;
  attachments?: NoteAttachment[];
  collaborators: string[]; // User IDs
}

export interface NoteAttachment {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number;
}

// Learning Analytics Types
export interface LearningPath {
  id: string;
  title: string;
  description: string;
  subjects: string[];
  estimatedDuration: number; // in days
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  modules: LearningModule[];
}

export interface LearningModule {
  id: string;
  title: string;
  type: 'VIDEO' | 'QUIZ' | 'TASK' | 'READING';
  resourceId: string;
  order: number;
  completed: boolean;
}

export interface WeakArea {
  subject: string;
  topic: string;
  score: number;
  recommendation: string;
  resources: string[]; // Resource IDs
}

// Tournaments & Events Types
export interface Tournament {
  id: string;
  name: string;
  description: string;
  type: 'WEEKLY' | 'MONTHLY' | 'SEASONAL' | 'SPECIAL';
  startDate: string;
  endDate: string;
  status: 'UPCOMING' | 'ACTIVE' | 'COMPLETED';
  prizePool: {
    first: number;
    second: number;
    third: number;
  };
  participants: string[]; // Team or User IDs
  leaderboard: TournamentEntry[];
  rules: string[];
}

export interface TournamentEntry {
  id: string;
  name: string;
  avatar?: string;
  score: number;
  rank: number;
  progress: number; // percentage
}

// Peer Review Types
export interface PeerReview {
  id: string;
  taskId: string;
  taskTitle: string;
  reviewerId: string;
  reviewerName: string;
  revieweeId: string;
  revieweeName: string;
  submissionId: string;
  rating: number; // 1-5
  feedback: string;
  strengths: string[];
  improvements: string[];
  submittedAt: string;
  xpEarned: number;
}

// Flashcards Types
export interface Flashcard {
  id: string;
  front: string;
  back: string;
  subject: string;
  tags: string[];
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  lastReviewed?: string;
  nextReview?: string;
  reviewCount: number;
  correctCount: number;
  masteryLevel: number; // 0-100
}

export interface FlashcardDeck {
  id: string;
  name: string;
  description: string;
  subject: string;
  createdBy: string;
  createdAt: string;
  isPublic: boolean;
  cardIds: string[];
  totalCards: number;
  studyCount: number;
}

// AI Features Types
export interface AIInsight {
  id: string;
  type: 'PREDICTION' | 'RISK' | 'OPPORTUNITY' | 'TREND' | 'RECOMMENDATION';
  title: string;
  description: string;
  confidence: number; // 0-100
  impact: 'HIGH' | 'MEDIUM' | 'LOW';
  category: 'PERFORMANCE' | 'ENGAGEMENT' | 'ATTENDANCE' | 'BEHAVIOR' | 'LEARNING';
  timestamp: string;
  actionable: boolean;
  actionItems?: string[];
  relatedData?: {
    metric: string;
    value: number;
    trend: 'UP' | 'DOWN' | 'STABLE';
  };
}

export interface AIPrediction {
  id: string;
  target: string; // e.g., "Student Performance", "Dropout Risk"
  prediction: string;
  confidence: number;
  timeframe: string; // e.g., "Next 30 days"
  factors: string[];
  recommendation: string;
}

export interface AIRiskAlert {
  id: string;
  studentId?: string;
  studentName?: string;
  riskType: 'ACADEMIC' | 'ATTENDANCE' | 'ENGAGEMENT' | 'BEHAVIORAL';
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  description: string;
  indicators: string[];
  suggestedActions: string[];
  detectedAt: string;
}

export interface AIRecommendation {
  id: string;
  title: string;
  description: string;
  category: 'CURRICULUM' | 'INTERVENTION' | 'RESOURCE' | 'POLICY';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  estimatedImpact: string;
  implementationEffort: 'LOW' | 'MEDIUM' | 'HIGH';
  relatedInsights: string[]; // Insight IDs
}

