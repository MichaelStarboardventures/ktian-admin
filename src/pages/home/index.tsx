import { PageProps } from '@/pages/home/home.props';
import { request } from '@/utils';
import { ProColumns, ProTable } from '@ant-design/pro-table';
import { Button, Checkbox, Col, message, Row } from 'antd';
import moment from 'moment';
import { history } from 'umi';

const columns: ProColumns[] = [
  {
    title: 'title',
    dataIndex: 'title',
  },
  {
    title: 'mainPage',
    dataIndex: 'mainPage',
    render(mainPage) {
      return <Checkbox checked={Boolean(mainPage)} />;
    },
  },
  {
    title: 'description',
    dataIndex: 'description',
  },
  {
    title: 'createTime',
    dataIndex: 'createTime',
    render(text) {
      return moment(text as string).format('YYYY-MM-DD HH:mm:ss');
    },
  },
  {
    title: 'updateTime',
    dataIndex: 'updateTime',
    render(text) {
      return moment(text as string).format('YYYY-MM-DD HH:mm:ss');
    },
  },
  {
    title: 'operate',
    align: 'center',
    width: 200,
    render(text, record, index, action) {
      return (
        <Row gutter={[10, 0]}>
          <Col span={12}>
            <Button
              type={'text'}
              onClick={() => {
                history.push(`/home/detail?id=${record.id}`);
              }}
            >
              edit
            </Button>
          </Col>
          <Col span={12}>
            <Button
              type={'text'}
              onClick={async () => {
                try {
                  await request(`/api/pages/${record.id}`, {
                    method: 'delete',
                  });

                  action?.reload();

                  message.success('Deletion succeeded');
                } catch (e) {
                  message.success('Delete failed');
                }
              }}
            >
              delete
            </Button>
          </Col>
        </Row>
      );
    },
  },
];

const Home = () => {
  return (
    <ProTable<PageProps[]>
      search={false}
      columns={columns}
      toolBarRender={() => [
        <Button
          key={'create'}
          type={'primary'}
          onClick={() => history.push(`/home/detail?id=create`)}
        >
          Create
        </Button>,
      ]}
      request={async () => {
        try {
          const data = await request('/api/pages', {
            method: 'get',
          });

          return {
            data: data.map((ret: PageProps) => ({
              ...ret,
              key: ret.id,
            })),
            success: true,
          };
        } catch (e) {
          return {
            data: [],
            success: false,
          };
        }
      }}
    />
  );
};

export default Home;
