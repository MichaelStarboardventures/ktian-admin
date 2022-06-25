import { RouteProps } from '@/pages/home/home.props';
import React from 'react';

export type Route = {
  id: string;
  name: string;
  path: string;
  content: string;
};

type RouteContextProps = {
  routes: Route[];
  setRoutes: React.Dispatch<React.SetStateAction<Route[]>>;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  route: RouteProps | null;
  setRoute: React.Dispatch<React.SetStateAction<RouteProps | null>>;
};

export const RouteContext = React.createContext<RouteContextProps>({
  routes: [],
  selected: '',
  setRoutes: () => {},
  setSelected: () => {},
  setRoute: () => {},
  route: null,
});

export const RouteProvider: React.FC<RouteContextProps> = ({
  children,
  routes,
  selected,
  setRoutes,
  setSelected,
  setRoute,
  route,
}) => {
  return (
    <RouteContext.Provider
      value={{ routes, setRoutes, selected, setSelected, route, setRoute }}
    >
      {children}
    </RouteContext.Provider>
  );
};
