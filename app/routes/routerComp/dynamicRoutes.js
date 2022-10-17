export const demoRoutes = {
  path: '/list',
  name: 'list',
  icon: 'ico-flag',
  hideMenu: true,
  component: () => import('@app/views/list'),
};

export const webglRoutes = {
  path: '/webgl',
  name: 'webgl',
  icon: 'ico-flag',
  children: [
    {
      path: '/webgl-street',
      name: 'webgl-street',
      component: () => import('@app/views/webgl/street'),
      linkProps: {
        target: '_blank',
      },
    },
    {
      path: '/webgl-room',
      name: 'webgl-room',
      component: () => import('@app/views/webgl/room'),
      linkProps: {
        target: '_blank',
      },
    },
    {
      path: '/webgl-city',
      name: 'webgl-city',
      component: () => import('@app/views/webgl/city'),
      linkProps: {
        target: '_blank',
      },
    },
    {
      path: '/webgl-house',
      name: 'webgl-house',
      component: () => import('@app/views/webgl/house'),
      linkProps: {
        target: '_blank',
      },
    },
    {
      path: '/webgl-car',
      name: 'webgl-car',
      component: () => import('@app/views/webgl/car'),
      linkProps: {
        target: '_blank',
      },
    },
  ],
};
