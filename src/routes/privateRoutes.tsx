import React from 'react';
import { RouteObject, Navigate } from 'react-router-dom';
import { useAuthStore, selectIsAuthenticated } from '../store';

// ─── Placeholder pages (sẽ được thay bằng trang thực khi phát triển) ─────────

function DashboardPlaceholder() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Bảng điều khiển</h1>
        <p className="text-muted-foreground">
          Trang này đang được phát triển...
        </p>
      </div>
    </div>
  );
}

// ─── Private Route Guard ─────────────────────────────────────────────────────

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

// ─── Private Routes ───────────────────────────────────────────────────────────

export const privateRoutes: RouteObject[] = [
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardPlaceholder />
      </PrivateRoute>
    ),
  },
  {
    path: '/farm-management',
    element: (
      <PrivateRoute>
        <DashboardPlaceholder />
      </PrivateRoute>
    ),
  },
  {
    path: '/tasks',
    element: (
      <PrivateRoute>
        <DashboardPlaceholder />
      </PrivateRoute>
    ),
  },
  {
    path: '/finance',
    element: (
      <PrivateRoute>
        <DashboardPlaceholder />
      </PrivateRoute>
    ),
  },
];