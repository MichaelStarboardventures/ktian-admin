export type PageProps = {
  id: string;
  createTime: Date;
  updateTime: Date;
  data: string;
  mainPage: 0 | 1;
  title: string;
  description: string;
};

export type RouteProps = {
  id: number;
  name: string;
  mainPage: 0 | 1;
  routes: { id: string; name: string; path: string }[];
};
