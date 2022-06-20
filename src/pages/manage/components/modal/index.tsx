import { ManageProps } from '@/pages/manage/manage.props';
import { request } from '@/utils';
import {
  ModalForm,
  ModalFormProps,
  ProFormCheckbox,
  ProFormSelect,
  ProFormText,
  RequestOptionsType,
} from '@ant-design/pro-components';
import React, { memo, useState } from 'react';

type ModalProps = { id?: string } & ModalFormProps;

const ModalComponent: React.FC<ModalProps> = ({ trigger, onFinish, id }) => {
  const [initialState, setInitialState] = useState<ManageProps | null>(null);

  return (
    <ModalForm
      title={id ? 'Edit' : 'Create'}
      trigger={trigger}
      onFinish={onFinish}
      modalProps={{
        destroyOnClose: true,
      }}
      initialValues={{ ...initialState, custom: 1 }}
      request={async () => {
        if (!id) return { data: null, success: false };

        try {
          const data = await request(`/api/apis/${id}`, {
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
      <ProFormText name={'custom'} hidden={true} />
      <ProFormText
        name={'name'}
        placeholder={'Please input api name'}
        rules={[
          {
            required: true,
            message: 'Please input api name',
          },
        ]}
      />
      <ProFormSelect
        name={'url'}
        required={true}
        placeholder={'Please select api url'}
        rules={[
          {
            required: true,
            message: 'Please input api url',
          },
        ]}
        request={async () => {
          try {
            const apis: ManageProps[] = await request('/api/apis', {
              method: 'get',
            });

            return apis?.map((api) => ({
              label: api.name,
              value: api.url,
            })) as RequestOptionsType[];
          } catch (e) {
            return [];
          }
        }}
      />
      <ProFormCheckbox.Group
        name={'components'}
        rules={[
          {
            required: true,
            message: 'Select at least one component',
          },
        ]}
        request={async () => {
          try {
            const data: { name: string; type: string }[] = await request(
              '/api/components',
              {
                method: 'get',
              },
            );

            return data?.map((ret) => ({
              label: ret.name,
              value: ret.type,
            }));
          } catch (e) {
            return [];
          }
        }}
      />
    </ModalForm>
  );
};

export const Modal = memo(ModalComponent, (prev, next) => prev.id === next.id);
