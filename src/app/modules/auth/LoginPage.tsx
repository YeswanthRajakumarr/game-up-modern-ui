import { useEffect } from 'react';
import { useAuth } from '../../global-context/AuthContext';
import { useNavigate } from '@tanstack/react-router';
import { getDefaultRoute } from '../../../shared/utils/rolePermissions';
import { GraduationCap, UserCog, Users, UserCheck, Gamepad2, Sparkles } from 'lucide-react';
import { Icon3DEnhanced } from '../../../shared/components/Icon3D';

export const LoginPage = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const defaultRoute = getDefaultRoute(user.role);
      navigate({ to: defaultRoute });
    }
  }, [user, navigate]);

  const handleLogin = (role: 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT') => {
    login(role);
  };

  const roleOptions = [
    {
      role: 'STUDENT' as const,
      label: 'Student',
      icon: GraduationCap,
      gradient: 'from-emerald-500 to-teal-600',
      hoverGradient: 'hover:from-emerald-600 hover:to-teal-700',
      description: 'Access your courses, tasks, and achievements'
    },
    {
      role: 'TEACHER' as const,
      label: 'Teacher',
      icon: UserCog,
      gradient: 'from-indigo-500 to-purple-600',
      hoverGradient: 'hover:from-indigo-600 hover:to-purple-700',
      description: 'Manage classes, grade assignments, and track progress'
    },
    {
      role: 'ADMIN' as const,
      label: 'Administrator',
      icon: Users,
      gradient: 'from-slate-600 to-slate-800',
      hoverGradient: 'hover:from-slate-700 hover:to-slate-900',
      description: 'System administration and analytics'
    },
    {
      role: 'PARENT' as const,
      label: 'Parent',
      icon: UserCheck,
      gradient: 'from-orange-500 to-amber-600',
      hoverGradient: 'hover:from-orange-600 hover:to-amber-700',
      description: 'Monitor your child\'s progress and performance'
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-black to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-2xl">
              <Icon3DEnhanced 
                icon={Gamepad2} 
                size={48}
                gradient="linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%)"
                glow={true}
                glowColor="#ffffff"
                color="#ffffff"
              />
            </div>
            <div className="text-left">
              <h1 className="text-5xl font-bold text-white mb-2 flex items-center gap-2">
                GameUp
                <span className="text-sm font-normal bg-yellow-400/20 text-yellow-300 px-3 py-1 rounded-full border border-yellow-400/30">(Demo)</span>
                <Sparkles className="w-8 h-8 text-yellow-300 animate-pulse" />
              </h1>
              <p className="text-indigo-200 text-lg">Gamified Educational Experience</p>
            </div>
          </div>
          <p className="text-white/80 text-xl max-w-2xl mx-auto">
            Choose your role to access the platform
          </p>
        </div>

        {/* Login Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roleOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.role}
                onClick={() => handleLogin(option.role)}
                className={`group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-left transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:border-white/40 hover:shadow-2xl overflow-hidden`}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${option.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${option.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-white transition-colors">
                    {option.label}
                  </h3>
                  <p className="text-white/70 text-sm group-hover:text-white/90 transition-colors">
                    {option.description}
                  </p>
                  <div className="mt-4 flex items-center text-white/60 group-hover:text-white transition-colors">
                    <span className="text-sm font-medium">Click to login</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-white/60 text-sm">
            Select a role to continue to your dashboard
          </p>
        </div>
      </div>
    </div>
  );
};

