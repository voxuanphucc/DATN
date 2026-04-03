import { RouteObject } from 'react-router-dom';
import { PrivateRoute } from '../components/routes';
import TeamManagementPage from '../pages/TeamManagement';

/**
 * Private Routes - Cần authentication (được protected bởi PrivateRoute)
 * 
 * Ví dụ:
 * {
 *   path: '/dashboard',
 *   element: <PrivateRoute><DashboardPage /></PrivateRoute>,
 * }
 */
export const privateRoutes: RouteObject[] = [
  {
    path: '/team-management',
    element: (
      <PrivateRoute>
        <TeamManagementPage />
      </PrivateRoute>
    ),
  },
];