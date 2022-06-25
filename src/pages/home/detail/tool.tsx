import { RouteContext } from '@/pages/home/detail/route-context';
import { RouteModal } from '@/pages/home/detail/route-modal';
import { request } from '@/utils';
import {
  ModalForm,
  ModalFormProps,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, Col, message, Row } from 'antd';
import React, { useCallback, useContext } from 'react';
import { history } from 'umi';

const PublishModal: React.FC<ModalFormProps> = ({ trigger }) => {
  const { routes, route } = useContext(RouteContext);

  const onPublish: ModalFormProps['onFinish'] = useCallback(
    async (params) => {
      try {
        await request(route?.id ? `/api/routes/${route.id}` : '/api/routes', {
          method: route?.id ? 'put' : 'post',
          data: {
            routes,
            ...params,
          },
        });

        message.success(route?.id ? 'Edit success' : 'Publish success');
        history.push('/home');

        return true;
      } catch (e) {
        message.error('Publish failure');
        return true;
      }
    },
    [routes],
  );

  return (
    <ModalForm
      trigger={trigger}
      onFinish={onPublish}
      modalProps={{ destroyOnClose: true }}
      request={async () => {
        return route || {};
      }}
    >
      <ProFormText name={'id'} hidden={true} />
      <ProFormText
        name={'name'}
        label={'Page Name'}
        placeholder={'Please input page name'}
      />
      <ProFormSwitch name={'mainPage'} label={'Main Page'} />
    </ModalForm>
  );
};

export const Tool = () => {
  const { setRoutes, routes } = useContext(RouteContext);

  return (
    <Row gutter={[20, 0]} justify={'end'}>
      <Col>
        <RouteModal
          trigger={<Button type={'primary'}>Add</Button>}
          setRoutes={setRoutes}
        />
      </Col>
      <Col>
        <PublishModal
          trigger={
            <Button disabled={!routes.length} type={'primary'}>
              publish
            </Button>
          }
        />
      </Col>
    </Row>
  );
};
