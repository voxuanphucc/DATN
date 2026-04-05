import { RouteObject } from 'react-router-dom';
import LandingPage from '../pages/landing';
import { LoginPage } from '../pages/login';
import { RegisterPage } from '../pages/register';
import { ForgotPasswordPage } from '../pages/forgot-password';
import { ResetPasswordPage } from '../pages/reset-password';
import { EmailVerificationPage } from '../pages/email-verification';
import AcceptInvitationPage from '../pages/AcceptInvitation';
import { ForbiddenPage } from '../pages/forbidden';
import { NotFoundPage } from '../pages/not-found';

/**
 * Public Routes - Không cần authentication
 * 
 * Chỉ chứa routes public:
 * - Landing page
 * - Login/Register
 * - Password reset
 * - Email verification
 * - Accept invitation (token-based access)
 * - Forbidden page (for RBAC access denied)
 * - 404 Not Found page (wildcard catch-all)
 * 
 * Các routes khác được move sang privateRoutes.tsx
 */
export const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
  },
  {
    path: '/reset-password',
    element: <ResetPasswordPage />,
  },
  {
    path: '/verify-email',
    element: <EmailVerificationPage />,
  },
  {
    path: '/accept-invitation',
    element: <AcceptInvitationPage />,
  },
  {
    path: '/forbidden',
    element: <ForbiddenPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];