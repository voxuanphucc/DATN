
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { appRoutes } from './routes';
function AppRoutes() {
  const routes = useRoutes(appRoutes);
  return routes;
}
export function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>);

}