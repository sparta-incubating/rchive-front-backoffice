import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import QueryProvider from '@/provider/queryProvider/queryProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '르카이브',
  description: '내일배움캠프 학습자료를 모아서 볼 수 있는 아카이브 서비스',
};

export default function HTMLLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <html lang="ko">
        <body className={inter.className}>{children}</body>
      </html>
    </QueryProvider>
  );
}
