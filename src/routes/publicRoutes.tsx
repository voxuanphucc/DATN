import { RouteObject } from 'react-router-dom';
import { LandingPage } from '../pages/LandingPage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';
import { ResetPasswordPage } from '../pages/ResetPasswordPage';
import { EmailVerificationPage } from '../pages/EmailVerificationPage';
export const publicRoutes: RouteObject[] = [
{
  path: '/',
  element: <LandingPage />
},
{
  path: '/login',
  element: <LoginPage />
},
{
  path: '/register',
  element: <RegisterPage />
},
{
  path: '/forgot-password',
  element: <ForgotPasswordPage />
},
{
  path: '/reset-password',
  element: <ResetPasswordPage />
},
{
  path: '/verify-email',
  element: <EmailVerificationPage />
}];