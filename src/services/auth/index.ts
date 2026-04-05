/**
 * ════════════════════════════════════════════════════════════════════════════
 * Auth Services - Central Export
 * ════════════════════════════════════════════════════════════════════════════
 * 
 * Export tất cả auth services để dùng trong components và hooks
 * 
 * @example
 * import { loginService, registerService } from '@/services/auth';
 */

export { loginService } from './login';
export { registerService } from './register';
export { verifyEmailService } from './verify';
export { refreshTokenService } from './refresh';
export { axiosInstance } from './base';
export type { ApiResponse } from './base';

/**
 * Namespace để access tất cả services
 * @example
 * import { authServices } from '@/services/auth';
 * authServices.login.login(data);
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const authServices = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  login: async (data: any) => {
    const { loginService } = await import('./login');
    return loginService.login(data);
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: async (data: any) => {
    const { registerService } = await import('./register');
    return registerService.register(data);
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  verify: async (data: any) => {
    const { verifyEmailService } = await import('./verify');
    return verifyEmailService.verify(data);
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  refresh: async (data: any) => {
    const { refreshTokenService } = await import('./refresh');
    return refreshTokenService.refresh(data);
  },
};
