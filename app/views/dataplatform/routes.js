const routes = [
  {
    path: '/dataplatform',
    name: 'dataplatform',
    icon: 'ico-flag',
    children: [
      {
        path: '/webgl-street',
        name: 'webgl-street',
        component: () => import('./src/street'),
        linkProps: {
          target: '_blank',
        },
      },
      {
        path: '/webgl-room',
        name: 'webgl-room',
        component: () => import('./src/room'),
        linkProps: {
          target: '_blank',
        },
      },
      {
        path: '/webgl-city',
        name: 'webgl-city',
        component: () => import('./src/city'),
        linkProps: {
          target: '_blank',
        },
      },
      {
        path: '/webgl-house',
        name: 'webgl-house',
        component: () => import('./src/house'),
        linkProps: {
          target: '_blank',
        },
      },
      {
        path: '/webgl-car',
        name: 'webgl-car',
        component: () => import('./src/car'),
        linkProps: {
          target: '_blank',
        },
      },
    ],
  },
];

export default routes;
