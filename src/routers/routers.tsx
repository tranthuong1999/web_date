import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import App from '../App';
import menu, { type menuProps } from './menu';
import NotFound from '../pages/NotFound/page';

const renderRouter = (menuRender: menuProps[]): RouteObject[] => {
  return menuRender.map(({ path, element, children }: menuProps): RouteObject => {
    if (children && children.length > 0) {
      return {
        path,
        element,
        children: renderRouter(children),
      };
    }

    return {
      path,
      element,
    };
  });
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: renderRouter(menu),
    errorElement: <NotFound />,
  },
]);

export default router;
