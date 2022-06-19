import { ManageProps } from '@/pages/manage/manage.props';
import { request } from '@/utils';
import {
  ModalForm,
  ModalFormProps,
  ProFormCheckbox,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
  RequestOptionsType,
} from '@ant-design/pro-components';
import React, { useRef, useState } from 'react';

type ModalProps = { id?: string } & ModalFormProps;

export const Modal: React.FC<ModalProps> = ({ trigger, onFinish, id }) => {
  const [initialState, setInitialState] = useState<ManageProps | null>(null);
  const formRef = useRef<ProFormInstance>();

  return (
    <ModalForm
      formRef={formRef}
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
        required={true}
        placeholder={'Please input api name'}
      />
      <ProFormSelect
        name={'url'}
        required={true}
        placeholder={'Please select api url'}
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
