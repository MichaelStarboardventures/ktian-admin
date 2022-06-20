import { BasicLayoutProps } from '@ant-design/pro-layout';

export const layout = (): BasicLayoutProps => {
  return {
    route: {
      routes: [
        {
          name: 'Dashboard',
          path: '/dashboard',
        },
        {
          name: 'Home',
          path: '/home',
        },
        {
          name: 'Manage',
          path: '/manage',
        },
        {
          name: 'Collects',
          path: '/collects',
        },
      ],
    },
  };
};
