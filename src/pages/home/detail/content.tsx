import { Route, RouteContext } from '@/pages/home/detail/route-context';
import { Editor } from '@starboard-ventures/pangu.ui.editor';
import React, { useContext } from 'react';

type ContentProps = { route?: Route | null };

export const Content: React.FC<ContentProps> = ({ route }) => {
  const { routes } = useContext(RouteContext);

  return (
    <Editor
      data={route?.content}
      onNodesChange={(query) => {
        const content = query.serialize();

        routes.forEach((ret) => {
          if (ret.id === route?.id) {
            ret.content = content;
          }
        });
      }}
    />
  );
};
