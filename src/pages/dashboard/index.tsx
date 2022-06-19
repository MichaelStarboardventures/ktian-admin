import { PageProps } from '@/pages/home/home.props';
import { request } from '@/utils';
import { Editor } from '@starboard-ventures/pangu.ui.editor';
import { Card, Empty, message } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'umi';

const Dashboard = () => {
  const [data, setData] = useState<PageProps | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await request<PageProps[]>('/api/pages', {
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

  return data ? (
    <Card
      title={data?.title}
      bordered={false}
      extra={<Link to={'/home'}>More</Link>}
    >
      <Editor page data={data?.data || ''} />
    </Card>
  ) : (
    <Empty />
  );
};

export default Dashboard;
