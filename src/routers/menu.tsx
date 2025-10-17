import { lazy, type ReactNode } from 'react';
import { withSuspense } from '../HOC';

const Home = lazy(() => import('../pages/Home/page'));
const About = lazy(() => import('../pages/Home/page'));


export interface menuProps {
  key: string;
  path: string;
  children?: menuProps[];
  element: ReactNode;
}

const menu: menuProps[] = [
  {
    key: '',
    path: '/',
    element: withSuspense(<Home />),
  },
  {
    key: '',
    path: 'about',
    element: withSuspense(<About />),
  },

];

export default menu;
