import { PageProps } from '@/pages/home/home.props';
import { request } from '@/utils';
import {
  ModalForm,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-components';
import { Editor } from '@starboard-ventures/pangu.ui.editor';
import { message } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { history } from 'umi';

const useOnPublish = (
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setContent: React.Dispatch<React.SetStateAction<string>>,
) => {
  return useCallback((data: string) => {
    setVisible(true);
    setContent(data);
  }, []);
};

const fetchData = async (
  setData: React.Dispatch<React.SetStateAction<PageProps | null>>,
) => {
  try {
    const {
      location: { query },
    } = history;
    if (!query?.id) return;

    const data = await request(`/api/pages/${query.id}`, {
      method: 'get',
    });

    setData(data);
  } catch (e) {
    setData(null);
  }
};

const Detail = () => {
  const [json, setJson] = useState<PageProps | null>(null);
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState('');
  const onPublish = useOnPublish(setVisible, setContent);

  useEffect(() => {
    const {
      location: { query },
    } = history;

    if (query?.id !== 'create') {
      fetchData(setJson);
    }
  }, []);

  return (
    <>
      <Editor data={json?.data || ''} onPublish={onPublish} />
      <ModalForm
        visible={visible}
        title={'Create Page'}
        initialValues={{
          title: json?.title,
          description: json?.description,
          mainPage: json?.mainPage,
        }}
        modalProps={{
          onCancel() {
            setVisible(false);
          },
          destroyOnClose: true,
        }}
        onFinish={async (values) => {
          try {
            const {
              location: { query },
              goBack,
            } = history;

            if (query?.id === 'create' || !query?.id) {
              await request('/api/pages', {
                method: 'post',
                data: {
                  ...values,
                  data: content,
                  mainPage: Boolean(values.mainPage) ? 1 : 0,
                },
              });

              goBack();
            } else {
              await request(`/api/pages/${query.id}`, {
                method: 'put',
                data: {
                  ...values,
                  data: content,
                  mainPage: Boolean(values.mainPage) ? 1 : 0,
                },
              });
            }

            setVisible(false);
            message.success('Published successfully');
          } catch (e) {
            setContent('Publishing failed');
          }

          return true;
        }}
      >
        <ProFormText
          name={'title'}
          label={'Title'}
          rules={[{ required: true, message: 'Title cannot be empty ' }]}
        />
        <ProFormText
          name={'description'}
          label={'Description'}
          rules={[{ required: true, message: 'Description cannot be empty ' }]}
        />
        <ProFormSwitch name={'mainPage'} label={'MainPage'} />
      </ModalForm>
    </>
  );
};

export default Detail;
