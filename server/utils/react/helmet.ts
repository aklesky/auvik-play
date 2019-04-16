import { helmetContext } from '@/utils/helmet';

export const renderMetaTags = () => {
  const { helmet } = helmetContext as any;

  return `${helmet.title.toString()}${helmet.meta.toString()}`;
};
