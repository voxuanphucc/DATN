import { RouteObject } from 'react-router-dom';
import LandingPage from '../pages/landing';
import { LoginPage } from '../pages/login';
import { RegisterPage } from '../pages/register';
import { ForgotPasswordPage } from '../pages/forgot-password';
import { ResetPasswordPage } from '../pages/reset-password';
import { EmailVerificationPage } from '../pages/email-verification';
import AcceptInvitationPage from '../pages/acceptInvitation';
import { PlotManagementPage, PlotMapPage } from '../pages/plot-management';
import { SoilAnalysisPage, AIAnalysisPage } from '../pages/soil-analysis';
import TeamManagementPage from '../pages/TeamManagement';

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
  {
    path: '/plots',
    element: <PlotManagementPage />,
  },
  {
    path: '/map',
    element: <PlotMapPage />,
  },
  {
    path: '/soil-analysis',
    element: <SoilAnalysisPage />,
  },
  {
    path: '/soil-ai-analysis',
    element: <AIAnalysisPage />,
  },
  {
    path: '/team-management',
    element: <TeamManagementPage />,
  },
];