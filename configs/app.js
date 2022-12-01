const app = {
  HOST: process.env.IP || 'http://localhost',
  PORT: process.env.PORT || 4000,
  PRO_PORT: process.env.PRO_PORT || 4001,
  BUILD_DIR: './build',
  PUBLIC_DIR: '../public',
  DEV_ROOT_DIR: '/',
  PRD_ROOT_DIR: '/',
  PROXY: {
    url: 'http://ihuxy.com:9202',
    prefix: '/api',
  },
  MOCK: '127.0.0.1:4002',
  SERVER_PORT: 4003,
  projectName: '...',
  defProject: {
    name: 'scenes',
    _id: '123456',
  },
};

module.exports = app;
