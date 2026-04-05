import { RouteObject, Navigate } from 'react-router-dom';
import { useAuthStore, selectIsAuthenticated, selectUser } from '../store/slices/authStore';
import { DashboardPage } from '../pages/dashboard';
import TeamManagementPage from '../pages/TeamManagement';
import { PlotManagementPage, PlotMapPage } from '../pages/plot-management';
import { SoilAnalysisPage, AIAnalysisPage } from '../pages/soil-analysis';
import { ChangePasswordPage } from '../pages/change-password';
import { TasksPage } from '../pages/tasks';

// ────────────────────────────────────────────────────────────────────────────
// Component PrivateRoute - Bảo vệ routes cần authentication + role-based access
// ────────────────────────────────────────────────────────────────────────────

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRole?: string | string[]; // Single role or array of allowed roles
}

/**
 * Helper function - Kiểm tra user có role được yêu cầu không
 */
function hasRequiredRole(userRole: string | undefined, requiredRole: string | string[] | undefined): boolean {
  if (!requiredRole) return true; // Không yếu cầu role
  if (!userRole) return false; // User chưa có role

  if (Array.isArray(requiredRole)) {
    return requiredRole.includes(userRole);
  }
  return userRole === requiredRole;
}

/**
 * PrivateRoute Component - Kiểm tra authentication + phân quyền
 * 
 * @example
 * <PrivateRoute requiredRole="owner">
 *   <DashboardPage />
 * </PrivateRoute>
 * 
 * @example
 * <PrivateRoute requiredRole={['owner', 'manager']}>
 *   <TeamManagementPage />
 * </PrivateRoute>
 */
export function PrivateRoute({ children, requiredRole }: PrivateRouteProps) {
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const user = useAuthStore(selectUser);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Kiểm tra role-based access
  if (requiredRole && !hasRequiredRole(user?.role, requiredRole)) {
    return <Navigate to="/forbidden" replace />;
  }

  return children;
}

// ────────────────────────────────────────────────────────────────────────────
// Private Routes - Các route cần authentication
// ────────────────────────────────────────────────────────────────────────────


export const privateRoutes: RouteObject[] = [
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardPage />
      </PrivateRoute>
    ),
  },
  {
    path: '/team-management',
    element: (
      <PrivateRoute requiredRole="owner">
        <TeamManagementPage />
      </PrivateRoute>
    ),
  },
  {
    path: '/plots',
    element: (
      <PrivateRoute requiredRole="owner">
        <PlotManagementPage />
      </PrivateRoute>
    ),
  },
  {
    path: '/map',
    element: (
      <PrivateRoute requiredRole={['owner', 'manager']}>
        <PlotMapPage />
      </PrivateRoute>
    ),
  },
  {
    path: '/soil-analysis',
    element: (
      <PrivateRoute requiredRole={['owner', 'manager']}>
        <SoilAnalysisPage />
      </PrivateRoute>
    ),
  },
  {
    path: '/soil-ai-analysis',
    element: (
      <PrivateRoute requiredRole="owner">
        <AIAnalysisPage />
      </PrivateRoute>
    ),
  },
  {
    path: '/change-password',
    element: (
      <PrivateRoute>
        <ChangePasswordPage />
      </PrivateRoute>
    ),
  },
  {
    path: '/tasks',
    element: (
      <PrivateRoute requiredRole="employee">
        <TasksPage />
      </PrivateRoute>
    ),
  },
];