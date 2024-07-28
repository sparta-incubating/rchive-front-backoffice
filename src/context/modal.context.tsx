'use client';

import {
  createContext,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

interface ModalContextValue {
  open: (modalElement: ReactElement, closable?: boolean) => void;
  close: () => void;
  backdropClosable: boolean;
}

const initialModalContext: ModalContextValue = {
  open: () => {},
  close: () => {},
  backdropClosable: true,
};

const ModalContext = createContext<ModalContextValue>(initialModalContext);

export const useModalContext = () => {
  if (!ModalContext) throw new Error('Context 범위가 아닙니다.');
  return useContext(ModalContext);
};

export const ModalContextProvider = ({ children }: PropsWithChildren) => {
  const [modal, setModal] = useState<ReactElement | null>(null);
  const [backdropClosable, setBackdropClosable] = useState<boolean>(true);

  const open: ModalContextValue['open'] = useCallback(
    (modalElement: ReactElement, closable = true) => {
      setModal(modalElement);
      setBackdropClosable(closable);
    },
    [],
  );

  const close: ModalContextValue['close'] = useCallback(() => {
    setModal(null);
  }, []);

  const value: ModalContextValue = useMemo(
    () => ({ open, close, backdropClosable }),
    [close, open, backdropClosable],
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
      {modal}
    </ModalContext.Provider>
  );
};