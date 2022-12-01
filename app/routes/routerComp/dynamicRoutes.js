const demoRoutes = {
  path: '/list',
  name: 'list',
  icon: 'ico-flag',
  hideMenu: true,
  component: () => import('@app/views/list'),
};

const profileRoutes = {
  path: '/profile',
  name: '个人中心',
  title: '个人中心',
  hideMenu: true,
  component: props => <h1>{<h1>{props.inputPath} is comming...</h1>}</h1>,
};

export default [demoRoutes, profileRoutes];
