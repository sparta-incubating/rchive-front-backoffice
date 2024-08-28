'use client';

import {
  createContext,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useMemo,
  useState,
} from 'react';

interface ConfirmContextType {
  handleConfirm: (
    confirmElement: ReactElement,
    backdropClosable?: boolean,
  ) => Promise<boolean>;
  handleResult: (confirm: boolean) => void;
  backdropClosable: boolean;
}

const initialContext: ConfirmContextType = {
  handleConfirm: () => Promise.resolve(false),
  handleResult: () => {},
  backdropClosable: true,
};

export const confirmContext = createContext<ConfirmContextType>(initialContext);

export const ConfirmProvider = ({ children }: PropsWithChildren) => {
  const [confirm, setConfirm] = useState<ReactElement | null>(null);
  const [backdropClosable, setBackdropClosable] = useState<boolean>(true);
  const [resolver, setResolver] = useState<
    ((value: boolean | PromiseLike<boolean>) => void) | null
  >(null);

  const handleConfirm: ConfirmContextType['handleConfirm'] = useCallback(
    (confirmElement, backdropClosable = true) => {
      return new Promise<boolean>((resolve) => {
        setResolver(() => resolve);
        setConfirm(confirmElement);
        setBackdropClosable(backdropClosable);
      });
    },
    [],
  );

  const handleResult = useCallback(
    (confirm: boolean) => {
      if (resolver) {
        resolver(confirm);
        setResolver(null);
        setConfirm(null);
      }
    },
    [resolver],
  );

  const value = useMemo(
    () => ({ handleConfirm, handleResult, backdropClosable }),
    [handleConfirm, handleResult, backdropClosable],
  );

  return (
    <confirmContext.Provider value={value}>
      {children}
      {confirm}
    </confirmContext.Provider>
  );
};
