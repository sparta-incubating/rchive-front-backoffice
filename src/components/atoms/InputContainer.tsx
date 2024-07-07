import React, { PropsWithChildren } from 'react';

const InputContainer = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex h-[84px] w-[360px] items-center rounded-xl border bg-blue-50 p-5">
      {children}
    </div>
  );
};

export default InputContainer;
