import { PropsWithChildren } from 'react';

const Modal = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-blue-55 fixed left-0 top-0 flex h-screen w-screen">
      {children}
    </div>
  );
};

export default Modal;
