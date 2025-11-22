import React from 'react';
import { useAuth } from '../../global-context/AuthContext';
import { useNavigate } from '@tanstack/react-router';
import { getDefaultRoute } from '../../../shared/utils/rolePermissions';

export const LoginPage = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      const defaultRoute = getDefaultRoute(user.role);
      navigate({ to: defaultRoute });
    }
  }, [user, navigate]);

  const handleLogin = (role: 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT') => {
    login(role);
    // Navigation will happen via useEffect when user state updates
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome to GameUp</h1>
        <p className="text-slate-500 mb-8">Gamified Learning Platform</p>
        
        <div className="space-y-4">
            <button onClick={() => handleLogin('TEACHER')} className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors">
                Login as Teacher
            </button>
            <button onClick={() => handleLogin('STUDENT')} className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium transition-colors">
                Login as Student
            </button>
            <button onClick={() => handleLogin('ADMIN')} className="w-full py-3 px-4 bg-slate-700 hover:bg-slate-800 text-white rounded-xl font-medium transition-colors">
                Login as Admin
            </button>
             <button onClick={() => handleLogin('PARENT')} className="w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition-colors">
                Login as Parent
            </button>
        </div>
      </div>
    </div>
  );
};

