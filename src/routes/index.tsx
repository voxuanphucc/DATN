import { RouteObject } from 'react-router-dom';
import { publicRoutes } from './publicRoutes';
import { privateRoutes, PrivateRoute } from './privateRoutes';

/**
 * Combine tất cả routes
 * publicRoutes: Routes không cần authentication
 * privateRoutes: Routes cần authentication + role-based access
 */
// eslint-disable-next-line react-refresh/only-export-components
export const appRoutes: RouteObject[] = [...publicRoutes, ...privateRoutes];

// Export từng loại routes để dễ quản lý
// eslint-disable-next-line react-refresh/only-export-components
export { publicRoutes, privateRoutes, PrivateRoute };