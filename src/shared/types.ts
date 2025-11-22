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

