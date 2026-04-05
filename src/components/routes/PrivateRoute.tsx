import { Navigate } from 'react-router-dom';
import { useAuthStore, selectIsAuthenticated, selectUser } from '../../store/slices/authStore';

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRole?: string | string[]; // Single role or array of allowed roles
}

/**
 * Role-based access control helper
 * Check if user has required role
 */
function hasRequiredRole(userRole: string | undefined, requiredRole: string | string[] | undefined): boolean {
  if (!requiredRole) return true; // No role requirement
  if (!userRole) return false; // User has no role

  if (Array.isArray(requiredRole)) {
    return requiredRole.includes(userRole);
  }
  return userRole === requiredRole;
}

/**
 * PrivateRoute Component
 * Bảo vệ routes cần authentication + role-based access control
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
  // Sử dụng selector để tránh re-render toàn bộ component
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const user = useAuthStore(selectUser);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check role-based access
  if (requiredRole && !hasRequiredRole(user?.role, requiredRole)) {
    return <Navigate to="/forbidden" replace />;
  }

  return <>{children}</>;
}
