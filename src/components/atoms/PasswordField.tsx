import React, { PropsWithChildren } from 'react';

const PasswordField = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex h-[177px] w-[360px] flex-col rounded-xl border bg-blue-50 p-5">
      {children}
    </div>
  );
};

export default PasswordField;
