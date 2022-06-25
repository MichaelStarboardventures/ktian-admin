import { Route } from '@/pages/home/detail/route-context';
import { request } from '@/utils';
import { Empty, message } from 'antd';
import { useCallback, useEffect, useState } from 'react';

type RouteProps = {
  id: number;
  name: string;
  routes: Route[];
  mainPage: 0 | 1;
};

const Dashboard = () => {
  const [data, setData] = useState<RouteProps | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await request<RouteProps[]>('/api/routes', {
        method: 'get',
        params: {
          mainPage: 1,
        },
      });

      setData(res[0] || null);
    } catch (e) {
      message.error('Request page failed');
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return data ? 'hello' : <Empty />;
};

export default Dashboard;
