import { Route, RouteContext } from '@/pages/home/detail/route-context';
import { RouteModal } from '@/pages/home/detail/route-modal';
import { request } from '@/utils';
import { FormOutlined } from '@ant-design/icons';
import { Col, List, Row } from 'antd';
import React, { useCallback, useContext, useEffect } from 'react';
import { history } from 'umi';

const RenderItem = ({
  item,
  setRoutes,
  selected,
  setSelected,
}: {
  item: Route;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  setRoutes: React.Dispatch<React.SetStateAction<Route[]>>;
}) => {
  const isSelected = item.id === selected;

  return (
    <List.Item
      onClick={() => setSelected(item.id)}
      style={{
        backgroundColor: isSelected ? '#1890ff' : undefined,
        color: isSelected ? '#fff' : undefined,
      }}
    >
      <Row
        justify={'space-between'}
        style={{
          width: '100%',
          padding: '0px 15px',
        }}
      >
        <Col>{item.name}</Col>
        <Col>
          {isSelected && (
            <RouteModal
              trigger={<FormOutlined />}
              setRoutes={setRoutes}
              route={item}
            />
          )}
        </Col>
      </Row>
    </List.Item>
  );
};

export const Routes: React.FC = () => {
  const { routes, setRoutes, selected, setSelected, setRoute } =
    useContext(RouteContext);

  const fetchData = useCallback(async () => {
    try {
      const {
        location: { query },
      } = history;
      if (query?.id === 'create') return;

      const res = await request(`/api/routes/${query?.id}`, { method: 'get' });

      setRoute(res);
      setRoutes(res?.routes);
    } catch (e) {}
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (routes?.length) setSelected(routes[0]?.id);
  }, [routes]);

  return (
    <>
      <List
        style={{ height: '100%' }}
        dataSource={routes}
        renderItem={(item) => {
          return (
            <RenderItem
              item={item}
              setRoutes={setRoutes}
              setSelected={setSelected}
              selected={selected}
            />
          );
        }}
      />
    </>
  );
};
