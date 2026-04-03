import { RouteObject } from 'react-router-dom';

/**
 * Private Routes - Cần authentication (được protected)
 * 
 * TODO: Sẽ thêm routes cần authentication ở đây
 * Ví dụ: Dashboard, User Profile, Settings, etc.
 * 
 * Format:
 * {
 *   path: '/dashboard',
 *   element: <PrivateRoute><DashboardPage /></PrivateRoute>,
 * }
 */
export const privateRoutes: RouteObject[] = [];