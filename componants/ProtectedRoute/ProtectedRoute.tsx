'use client';
import React, { ReactNode } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';

interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function ProtectedRoute({ children, fallback = null }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">        
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center m-5">
        <div className="relative text-center p-8 bg-white rounded shadow p-5 mx-auto" style={{ maxWidth: "450px", width: "100%" }}>
          <h2 className="text-2xl font-bold mb-4">Please log in</h2>
          <a href="/login" className="btn btn-primary">Go to Login</a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
