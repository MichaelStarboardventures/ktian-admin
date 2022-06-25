import { Content } from '@/pages/home/detail/content';
import { Route, RouteProvider } from '@/pages/home/detail/route-context';
import { Routes } from '@/pages/home/detail/routes';
import { Tool } from '@/pages/home/detail/tool';
import { RouteProps } from '@/pages/home/home.props';
import { Col, Empty, Row } from 'antd';
import { useEffect, useMemo, useState } from 'react';

const useCurrentNode = (routes: Route[], selected?: string) => {
  return useMemo(() => {
    if (!selected || !routes.length) return null;

    return routes?.find((route) => route.id === selected);
  }, [selected, routes]);
};

const Detail = () => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [selected, setSelected] = useState(routes[0]?.id);
  const [update, setUpdate] = useState(0);
  const [route, setRoute] = useState<RouteProps | null>(null);

  const currentNode = useCurrentNode(routes, selected);

  useEffect(() => {
    selected && setUpdate(new Date().getTime());
  }, [selected]);

  return (
    <RouteProvider
      routes={routes}
      setRoutes={setRoutes}
      selected={selected}
      setSelected={setSelected}
      route={route}
      setRoute={setRoute}
    >
      <Row gutter={[0, 20]}>
        <Col span={24}>
          <Tool />
        </Col>
        <Col span={2} style={{ backgroundColor: '#fff' }}>
          <Routes />
        </Col>
        <Col span={22}>
          {routes?.length ? (
            <Content key={update} route={currentNode} />
          ) : (
            <Empty description={'No routes'} />
          )}
        </Col>
      </Row>
    </RouteProvider>
  );
};

export default Detail;
