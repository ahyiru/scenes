const routes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    icon: 'ico-flag',
    children: [
      {
        path: '/monitor',
        name: 'monitor',
        component: () => import('./src/monitor'),
        linkProps: {
          target: '_blank',
        },
      },
    ],
  },
];

export default routes;
