import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', exact: true, redirect: '/dashboard' },
    { path: '/dashboard', component: '@/pages/dashboard/index' },
    { path: '/home', component: '@/pages/home/index' },
    { path: '/home/detail', component: '@/pages/home/detail/index' },
    { path: '/manage', component: '@/pages/manage/index' },
    { path: '/collects', component: '@/pages/collects/index' },
  ],
  fastRefresh: {},
  layout: {},
  proxy: {
    '/api': {
      target: 'http://localhost:3500',
      changeOrigin: true,
    },
  },
});
