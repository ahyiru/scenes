export const demoRoutes = {
  path: '/webgl',
  name: 'webgl',
  icon: 'ico-flag',
  children: [
    {
      path: '/demo',
      name: 'demo',
      component: props => <h1>three.js demo</h1>,
    },
    {
      path: '/street',
      name: 'street',
      redirect: '/webgl-street',
      linkProps: {
        target: '_blank',
      },
    },
    {
      path: '/room',
      name: 'room',
      redirect: '/webgl-room',
      linkProps: {
        target: '_blank',
      },
    },
    {
      path: '/city',
      name: 'city',
      redirect: '/webgl-city',
      linkProps: {
        target: '_blank',
      },
    },
    {
      path: '/house',
      name: 'house',
      redirect: '/webgl-house',
      linkProps: {
        target: '_blank',
      },
    },
    {
      path: '/car',
      name: 'car',
      redirect: '/webgl-car',
      linkProps: {
        target: '_blank',
      },
    },
  ],
};
