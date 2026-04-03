import { Navigate } from 'react-router-dom';
import { useAuthStore, selectIsAuthenticated } from '../../store/slices/authStore';

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRole?: string; // TODO: Có thể mở rộng để check role sau
}

/**
 * PrivateRoute Component
 * Bảo vệ routes cần authentication
 * 
 * @example
 * <PrivateRoute>
 *   <DashboardPage />
 * </PrivateRoute>
 */
export function PrivateRoute({ children, requiredRole }: PrivateRouteProps) {
  // Sử dụng selector để tránh re-render toàn bộ component
  const isAuthenticated = useAuthStore(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // TODO: Check requiredRole nếu cần
  if (requiredRole) {
    // const user = useAuthStore(selectUser);
    // if (!hasRequiredRole(user?.role, requiredRole)) {
    //   return <Navigate to="/forbidden" replace />;
    // }
  }

  return <>{children}</>;
}
