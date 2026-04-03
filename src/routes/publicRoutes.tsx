import { RouteObject } from 'react-router-dom';
import LandingPage from '../pages/landing';
import { LoginPage } from '../pages/login';
import { RegisterPage } from '../pages/register';
import { ForgotPasswordPage } from '../pages/forgot-password';
import { ResetPasswordPage } from '../pages/reset-password';
import { EmailVerificationPage } from '../pages/email-verification';
import AcceptInvitationPage from '../pages/AcceptInvitation';

/**
 * Public Routes - Không cần authentication
 * 
 * Các routes cần authentication được move sang privateRoutes.tsx
 * và wrapping bởi <PrivateRoute></PrivateRoute>
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
];