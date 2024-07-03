'use client';

import { PropsWithChildren, useRef } from 'react';
import { AppStore, store } from '@/redux/storeConfig';
import { Provider } from 'react-redux';

const StoreProvider = ({ children }: PropsWithChildren) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = store();
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
