import React from 'react';
import { useAuth } from '../../global-context/AuthContext';
import { StudentDashboard } from './StudentDashboard';
import { TeacherDashboard } from './TeacherDashboard';

export const DashboardPage = () => {
  const { user } = useAuth();

  if (user?.role === 'STUDENT') {
    return <StudentDashboard />;
  }
  
  // Treat Parent similar to Student (or separate) and Admin similar to Teacher for now
  if (user?.role === 'TEACHER' || user?.role === 'ADMIN') {
    return <TeacherDashboard />;
  }

  // Fallback
  return (
    <div>
        <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
        <p className="text-slate-500 mt-2">Select a role to view dashboard features.</p>
    </div>
  );
};
