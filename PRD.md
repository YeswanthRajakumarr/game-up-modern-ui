# GameUp Frontend Documentation

## 1. Project Overview
**GameUp** is a gamified educational platform designed to engage students through tasks, rewards, and leaderboards. The frontend is a modern Single Page Application (SPA) built with **React** and **TypeScript**.

## 2. Project Architecture
The codebase follows a **modular architecture** located in `src/app/modules`. Each module encapsulates its own components, hooks, services, types, and routing logic.

### Directory Structure
```
src/
├── app/
│   ├── modules/          # Feature modules
│   ├── router/           # Main application routing
│   ├── global-context/   # Global state (Auth, Theme)
│   ├── layout/           # Main layouts (Sidebar, Header)
│   └── cognito/          # Authentication logic
└── shared/               # Shared components, hooks, and utilities
```

## 3. User Roles & Access Control
The application supports four distinct user roles, each with specific permissions and views:
1.  **Admin:** Full access to user management, class management, and analytics.
2.  **Teacher:** Manages tasks, classes, and views leaderboards/dashboards.
3.  **Student:** Views tasks, submits work, views leaderboards, tracks performance, and redeems rewards.
4.  **Parent:** Monitors child's progress, tasks, and rewards.

## 4. Modules & Functionalities

### 4.1 Authentication (`src/app/cognito`)
- **Features:** Sign In, Forgot Password, Reset Password.
- **Integration:** AWS Cognito.
- **Context:** `AuthContext` provides user role and authentication state.

### 4.2 Tasks Module (`src/app/modules/tasks`)
**Core functionality for assignment management.**
- **Teacher Features:**
    - Create, Edit, and Delete Tasks.
    - Assign tasks to Classes or Sections.
    - Evaluate submissions (give scores/grades).
    - View task analytics.
- **Student Features:**
    - View assigned tasks (filtered by Subject or Class).
    - Submit tasks (supports file uploads).
    - View grades and feedback.
- **Parent Features:**
    - View child's assigned tasks and status.
- **Key Data Models:**
    - `Task`: Contains due dates, XP rewards, description.
    - `Submission`: Status, score, file URL, evaluation details.

### 4.3 Rewards Module (`src/app/modules/rewards`)
**Gamification system allowing students to redeem earned XP.**
- **Student Features:**
    - **Redeem:** Convert XP into "Rupees" (virtual currency) or "Free Time".
    - **History:** View transaction history of redemptions.
    - **Stats:** View total XP earned/redeemed.
- **Parent Features:**
    - Monitor child's redemption history and current balances.
- **Data Models:**
    - `StudentRewards`: Available XP, Money, Time.
    - `RewardTransaction`: Record of a redemption.

### 4.4 Leaderboard Module (`src/app/modules/leaderboard`)
**Competitive ranking system.**
- **Features:**
    - **Overall Leaderboard:** Ranking based on total XP.
    - **Subject Leaderboard:** Ranking specific to a subject (Math, Science, etc.).
    - Filterable by Class or Subject.
- **Views:**
    - List view with Rank, Student Name, XP.
    - Top 3 highlighting.

### 4.5 Admin Modules (`src/app/modules/Admin`)
- **Users (`/users`):**
    - CRUD operations for Students, Teachers, and Parents.
    - Search and filter users.
- **Classes (`/classes`):**
    - Manage Class and Section definitions.
- **Analytics (`/analytics`):**
    - High-level dashboard metrics for the school/institution.

### 4.6 Dashboard (`src/app/modules/dashboard`)
- **Teacher:** Landing page with overview of classes and pending tasks.

### 4.7 Performance (`src/app/modules/performance`)
- **Student/Parent:** Detailed analytics on student performance (grades over time, subject strengths).

### 4.8 Settings (`src/app/modules/settings`)
- Global application settings (theme, notifications, etc.).

## 5. Routing & Navigation
Routing is handled centrally in `src/app/router/routes.tsx` with role-based protection.

| Role | Primary Routes |
|------|----------------|
| **Admin** | `/users`, `/classes`, `/analytics` |
| **Teacher** | `/tasks`, `/leaderboard`, `/dashboard`, `/add-list` |
| **Student/Parent** | `/tasks`, `/leaderboard`, `/performance`, `/rewards` |

*Note: `/settings` is available to all roles.*

## 6. Data Models (Key Types)

### Task
```typescript
interface Task {
  id: string;
  name: string; // Title
  description: string;
  onTimeXp: number;
  taskXp: number;
  dueDate: string;
  acceptedFileTypes: string[];
  submission?: Submission;
  // ...
}
```

### Student (User)
```typescript
interface Student {
  id: string;
  name: string;
  rollNumber: string;
  gradeId: string;
  sectionId: string;
  email: string;
  profileImage?: string;
  // ...
}
```

## 7. API Integration
- **Client:** Custom wrapper around `fetch` (or axios) located in `src/shared/src/api`.
- **Configuration:** Base URL and interceptors for auth tokens.
- **Pattern:** Service files (e.g., `taskService.ts`, `leaderboardService.ts`) handle specific API calls and return typed responses.

!! IMPORTANT :
Focus More on Desing , UX , Gamifies Views, Charts , Modern Look, fantastic Dashboard for teachers, Admin, Students