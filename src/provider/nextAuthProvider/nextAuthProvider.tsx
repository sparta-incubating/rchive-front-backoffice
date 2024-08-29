'use client';

import { SessionProvider } from 'next-auth/react';
import { PropsWithChildren } from 'react';

const NextAuthProvider = ({ children }: PropsWithChildren) => {
  return (
    <SessionProvider basePath={'/api/backoffice/auth'}>
      {children}
    </SessionProvider>
  );
};

export default NextAuthProvider;
