import userRoutes from '@app/views/user/routes';
import webglRoutes from '@app/views/webgl/routes';

const routes = [
  ...userRoutes,
  {
    path: '/404',
    name: '404',
    component: import('@app/views/404'),
    hideMenu: true,
  },
  ...webglRoutes,
];

export default routes;
