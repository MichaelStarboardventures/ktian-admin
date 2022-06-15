import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', redirect: '/dashboard' },
    { path: '/dashboard', component: '@/pages/dashboard/index' },
    { path: '/home', component: '@/pages/home/index' },
    { path: '/home/detail', component: '@/pages/home/detail/index' },
  ],
  fastRefresh: {},
  layout: {},
  proxy: {
    '/api': {
      target: 'http://localhost:3002',
      changeOrigin: true,
    },
  },
});
