import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '르카이브',
  description: '내일배움캠프 학습자료를 모아서 볼 수 있는 아카이브 서비스',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
