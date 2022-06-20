import { CollectsProps } from '@/pages/collects/collects.props';
import { request } from '@/utils';
import {
  ModalForm,
  ModalFormProps,
  ProFormText,
} from '@ant-design/pro-components';
import React, { memo, useState } from 'react';

type ModalProps = { id?: number } & ModalFormProps;

const ModalComponent: React.FC<ModalProps> = ({ id, trigger, onFinish }) => {
  const [initialState, setInitialState] = useState<CollectsProps | null>(null);

  return (
    <ModalForm
      title={id ? 'Edit' : 'Create'}
      trigger={trigger}
      initialValues={{ ...initialState, id }}
      onFinish={onFinish}
      modalProps={{
        destroyOnClose: true,
      }}
      request={async () => {
        try {
          if (!id)
            return {
              data: null,
              success: false,
            };

          const data = await request(`/api/components/${id}`, {
            method: 'get',
          });

          setInitialState(data);

          return {
            data,
            success: true,
          };
        } catch (e) {
          return {
            data: null,
            success: false,
          };
        }
      }}
    >
      <ProFormText name={'id'} hidden={true} />
      <ProFormText
        name={'name'}
        placeholder={'Please input name'}
        rules={[
          {
            required: true,
            message: 'Please input name',
          },
        ]}
      />
      <ProFormText
        name={'type'}
        placeholder={'Please input type'}
        rules={[
          {
            required: true,
            message: 'Please input type',
          },
        ]}
      />
    </ModalForm>
  );
};

export const Modal = memo(ModalComponent, (prev, next) => prev.id === next.id);
