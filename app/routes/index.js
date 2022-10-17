import {traverItem} from '@huxy/utils';

import staticRoutes from './routerComp/staticRoutes';
import * as dynamicRoutes from './routerComp/dynamicRoutes';

const routers = Object.keys(dynamicRoutes).map(key => dynamicRoutes[key]);

const profileRoutes = {
  path: '/profile',
  name: '个人中心',
  title: '个人中心',
  hideMenu: true,
  component: props => <h1>{<h1>{props.inputPath} is comming...</h1>}</h1>,
};

const allRoutes = [
  {
    path: '/',
    component: () => import('@commons/layout/layout'),
    children: [...routers, profileRoutes],
  },
  ...staticRoutes,
];

const routes = (nameList, routerList) =>
  traverItem((item, parent) => {
    const fullPath = [...parent, item]
      .map(item => item.path)
      .join('')
      .replace('//', '/');
    item.name = nameList?.[fullPath] ?? item.name;
    item.id = item.id ?? routerList?.find(route => route.path === fullPath)?._id;
    /* if (typeof item.componentPath === 'string') {
      item.component = () => import(`@app/views${item.componentPath}`);
    } */
  })(allRoutes);

export default routes;
