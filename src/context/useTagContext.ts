import { useContext } from 'react';
import { TagContext } from './tag.context';

export const useTagContext = () => {
  const context = useContext(TagContext);
  if (!context) {
    throw new Error('TagContext 범위 밖입니다.');
  }
  return context;
};
