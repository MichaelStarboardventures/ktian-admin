import { Route } from '@/pages/home/detail/route-context';
import {
  ModalForm,
  ModalFormProps,
  ProFormText,
} from '@ant-design/pro-components';
import React from 'react';

type RouteModalProps = {
  setRoutes: React.Dispatch<React.SetStateAction<Route[]>>;
  route?: Route;
} & ModalFormProps;

export const RouteModal: React.FC<RouteModalProps> = ({
  trigger,
  setRoutes,
  route,
}) => {
  return (
    <ModalForm
      title={route ? 'Create' : 'Add'}
      trigger={trigger}
      request={async () => {
        return route || { name: '', path: '' };
      }}
      modalProps={{ destroyOnClose: true }}
      onFinish={async (params) => {
        if (route) {
          setRoutes((data) => {
            return data.map((ret) => {
              if (ret.id === route.id) {
                ret.name = params.name;
                ret.path = params.path;
              }

              return ret;
            });
          });
        } else {
          setRoutes(
            (data) =>
              [
                ...data,
                { ...params, id: new Date().getTime() + '' },
              ] as unknown as Route[],
          );
        }

        return true;
      }}
    >
      <ProFormText name={'id'} hidden={true} />
      <ProFormText
        name={'name'}
        label={'Route name'}
        rules={[{ required: true, message: 'Please input route name' }]}
      />
      <ProFormText
        name={'path'}
        label={'Route path'}
        rules={[{ required: true, message: 'Please input route path' }]}
      />
      <ProFormText name={'content'} hidden={true} />
    </ModalForm>
  );
};
