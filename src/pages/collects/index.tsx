import { CollectsProps } from '@/pages/collects/collects.props';
import { Modal } from '@/pages/collects/components/modal';
import { request } from '@/utils';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-table';
import { Button, Col, message, Row } from 'antd';
import moment from 'moment';
import React, { useCallback, useRef } from 'react';

const Collects = () => {
  const actionRef = useRef<ActionType>();

  const onFinish = useCallback(
    async (
      params: Record<string, any>,
      action: React.MutableRefObject<ActionType | undefined>,
      id?: number,
    ) => {
      try {
        await request(id ? `/api/components/${id}` : `/api/components`, {
          method: id ? 'put' : 'post',
          data: { ...params },
        });

        message.success(id ? 'Edit Success' : 'Create Success');
        action?.current?.reload();

        return true;
      } catch (e) {
        message.error(id ? 'Edit failure' : 'Create failure');
        return true;
      }
    },
    [],
  );

  const columns: ProColumns[] = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'CreateTime',
      dataIndex: 'createTime',
      render(text) {
        return moment(text as string).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: 'UpdateTime',
      dataIndex: 'updateTime',
      render(text) {
        return moment(text as string).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: 'Operate',
      align: 'center',
      width: 220,
      render(text, record) {
        return (
          <Row justify={'space-between'}>
            <Col>
              <Modal
                id={record.id}
                trigger={<Button type={'text'}>edit</Button>}
                onFinish={(params) => onFinish(params, actionRef, record.id)}
              />
            </Col>
            <Col>
              <Button
                type={'text'}
                onClick={async () => {
                  try {
                    await request(`/api/components/${record.id}`, {
                      method: 'delete',
                    });

                    message.success('Delete successfully');
                    actionRef?.current?.reload();
                  } catch (e) {
                    message.success('Delete failure');
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

  return (
    <ProTable
      actionRef={actionRef}
      columns={columns}
      search={false}
      toolBarRender={() => [
        <Modal
          key={'create'}
          trigger={<Button type={'primary'}>Create</Button>}
          onFinish={(params) => onFinish(params, actionRef)}
        />,
      ]}
      request={async () => {
        try {
          const data: CollectsProps[] = await request('/api/components', {
            method: 'get',
          });

          return {
            data: data.map((ret) => {
              ret.key = ret.id + '';

              return ret;
            }),
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

export default Collects;
