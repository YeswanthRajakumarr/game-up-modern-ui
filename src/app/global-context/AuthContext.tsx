import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, UserRole } from '../../shared/types';
import { MOCK_USERS } from '../../shared/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (role: UserRole) => void; // For demo purposes, just switch role
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking local storage or session
    const storedUser = localStorage.getItem('gameup_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user from local storage", e);
        localStorage.removeItem('gameup_user');
      }
    } else {
        // Default to Student for demo if not set
        // setUser(MOCK_USERS.find(u => u.role === 'STUDENT') || null);
    }
    setIsLoading(false);
  }, []);

  const login = (role: UserRole) => {
    const mockUser = MOCK_USERS.find((u) => u.role === role);
    if (mockUser) {
      setUser(mockUser);
      localStorage.setItem('gameup_user', JSON.stringify(mockUser));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gameup_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

