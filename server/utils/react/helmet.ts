import { helmetContext } from '@/utils/helmet';

export const renderMetaTags = () => {
  const { helmet } = helmetContext;

  return `${helmet.title.toString()}${helmet.meta.toString()}`;
};
