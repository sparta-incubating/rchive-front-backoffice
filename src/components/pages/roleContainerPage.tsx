import { PropsWithChildren } from 'react';

const RoleContainerPage = ({ children }: PropsWithChildren) => {
  return <div className="flex h-screen w-screen bg-blue-55">{children}</div>;
};
export default RoleContainerPage;
