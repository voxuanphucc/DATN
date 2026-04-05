import { RouteObject } from 'react-router-dom';
import { PrivateRoute } from '../components/routes';
import { DashboardPage } from '../pages/dashboard';
import TeamManagementPage from '../pages/TeamManagement';
import { PlotManagementPage, PlotMapPage } from '../pages/plot-management';
import { SoilAnalysisPage, AIAnalysisPage } from '../pages/soil-analysis';
import { ChangePasswordPage } from '../pages/change-password';
import { TasksPage } from '../pages/tasks';


export const privateRoutes: RouteObject[] = [
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardPage />
      </PrivateRoute>
    ),
  },
  {
    path: '/team-management',
    element: (
      <PrivateRoute requiredRole="owner">
        <TeamManagementPage />
      </PrivateRoute>
    ),
  },
  {
    path: '/plots',
    element: (
      <PrivateRoute requiredRole="owner">
        <PlotManagementPage />
      </PrivateRoute>
    ),
  },
  {
    path: '/map',
    element: (
      <PrivateRoute requiredRole={['owner', 'manager']}>
        <PlotMapPage />
      </PrivateRoute>
    ),
  },
  {
    path: '/soil-analysis',
    element: (
      <PrivateRoute requiredRole={['owner', 'manager']}>
        <SoilAnalysisPage />
      </PrivateRoute>
    ),
  },
  {
    path: '/soil-ai-analysis',
    element: (
      <PrivateRoute requiredRole="owner">
        <AIAnalysisPage />
      </PrivateRoute>
    ),
  },
  {
    path: '/change-password',
    element: (
      <PrivateRoute>
        <ChangePasswordPage />
      </PrivateRoute>
    ),
  },
  {
    path: '/tasks',
    element: (
      <PrivateRoute requiredRole="employee">
        <TasksPage />
      </PrivateRoute>
    ),
  },
];