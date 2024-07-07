import { PropsWithChildren } from 'react';

const SignupContainer = ({ children }: PropsWithChildren) => {
  return (
    <div className="m-auto flex h-auto w-[408px] flex-col items-center rounded-xl bg-white">
      {children}
    </div>
  );
};

export default SignupContainer;
