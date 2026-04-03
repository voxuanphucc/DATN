import { RouteObject } from 'react-router-dom';
import { publicRoutes } from './publicRoutes';
import { privateRoutes } from './privateRoutes';

/**
 * Combine tất cả routes
 * publicRoutes: Routes không cần authentication (tạm thời)
 * privateRoutes: Routes cần authentication (để trống, sẽ thêm sau)
 */
export const appRoutes: RouteObject[] = [...publicRoutes, ...privateRoutes];

// Export từng loại routes để dễ quản lý
export { publicRoutes, privateRoutes };