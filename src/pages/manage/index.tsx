import { Modal } from '@/pages/manage/components/modal';
import { ManageProps } from '@/pages/manage/manage.props';
import { request } from '@/utils';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-table';
import { Button, Col, message, Row, Tag } from 'antd';
import { useCallback, useRef } from 'react';

const Manage = () => {
  const actionRef = useRef<ActionType>();

  const onFinish = useCallback(
    async (params: Record<string, any>, id?: string) => {
      try {
        await request(id ? `/api/apis/${id}` : `/api/apis`, {
          method: id ? 'put' : 'post',
          data: {
            ...params,
          },
        });

        actionRef?.current?.reload();

        return true;
      } catch (e) {
        return true;
      }
    },
    [],
  );

  const deleteApi = useCallback(async (id: string) => {
    try {
      await request(`/api/apis/${id}`, { method: 'delete' });
      message.success('Delete success');

      actionRef?.current?.reload();
    } catch (e) {
      message.error('Delete fail');
    }
  }, []);

  const columns: ProColumns[] = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'ApiUrl',
      dataIndex: 'url',
    },
    {
      title: 'Type',
      dataIndex: 'custom',
    },
    {
      title: 'Components',
      dataIndex: 'components',
      render(text) {
        return (text as string[])?.map((ret) => <Tag key={ret}>{ret}</Tag>);
      },
    },
    {
      title: 'Operate',
      align: 'center',
      width: 300,
      render(text, record) {
        return (
          <Row justify={'space-between'}>
            <Col>
              <Button type={'text'}>preview</Button>
            </Col>
            <Col>
              <Modal
                id={record.id}
                onFinish={(params) => onFinish(params, record.id)}
                trigger={<Button type={'text'}>edit</Button>}
              />
            </Col>
            <Col>
              <Button type={'text'} onClick={() => deleteApi(record.id)}>
                delete
              </Button>
            </Col>
          </Row>
        );
      },
    },
  ];

  return (
    <ProTable
      actionRef={actionRef}
      columns={columns}
      search={false}
      toolBarRender={() => [
        <Modal
          onFinish={(params) => onFinish(params)}
          trigger={
            <Button key={'add'} type={'primary'}>
              Add
            </Button>
          }
        />,
      ]}
      request={async () => {
        try {
          const data: ManageProps[] = await request('/api/apis', {
            method: 'get',
            params: { custom: 1 },
          });

          return {
            data:
              data.map((ret) => {
                ret.key = ret.id + '';

                return ret;
              }) || [],
            success: true,
          };
        } catch (error) {
          message.error('request manage error');
          return {
            data: [],
            success: false,
          };
        }
      }}
    />
  );
};

export default Manage;
