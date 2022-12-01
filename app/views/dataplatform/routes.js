const routes = [
  {
    path: '/dataplatform',
    name: 'dataplatform',
    icon: 'ico-flag',
    children: [
      {
        path: '/bigdata',
        name: 'bigdata',
        component: () => import('./src/bigdata'),
        linkProps: {
          target: '_blank',
        },
      },
    ],
  },
];

export default routes;
