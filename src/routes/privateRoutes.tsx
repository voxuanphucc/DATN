import React from 'react';
import { RouteObject, Navigate } from 'react-router-dom';
// Placeholder pages for future private routes
// These will be implemented when dashboard pages are built
function DashboardPlaceholder() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Bảng điều khiển</h1>
        <p className="text-muted-foreground">
          Trang này đang được phát triển...
        </p>
      </div>
    </div>);

}
// In a real app, this would check auth state
const isAuthenticated = false;
function PrivateRoute({ children }: {children: React.ReactNode;}) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}
export const privateRoutes: RouteObject[] = [
{
  path: '/dashboard',
  element:
  <PrivateRoute>
        <DashboardPlaceholder />
      </PrivateRoute>

},
{
  path: '/farm-management',
  element:
  <PrivateRoute>
        <DashboardPlaceholder />
      </PrivateRoute>

},
{
  path: '/tasks',
  element:
  <PrivateRoute>
        <DashboardPlaceholder />
      </PrivateRoute>

},
{
  path: '/finance',
  element:
  <PrivateRoute>
        <DashboardPlaceholder />
      </PrivateRoute>

}];