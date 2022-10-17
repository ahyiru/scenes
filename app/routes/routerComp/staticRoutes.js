import userRoutes from '@app/views/user/routes';

const routes = [
  ...userRoutes,
  {
    path: '/404',
    name: '404',
    component: import('@app/views/404'),
    hideMenu: true,
  },
  {
    path: '/webgl-street',
    name: 'webgl-street',
    component: () => import('@app/views/webgl/street'),
  },
  {
    path: '/webgl-room',
    name: 'webgl-room',
    component: () => import('@app/views/webgl/room'),
  },
  {
    path: '/webgl-city',
    name: 'webgl-city',
    component: () => import('@app/views/webgl/city'),
  },
  {
    path: '/webgl-house',
    name: 'webgl-house',
    component: () => import('@app/views/webgl/house'),
  },
  {
    path: '/webgl-car',
    name: 'webgl-car',
    component: () => import('@app/views/webgl/car'),
  },
];

export default routes;
