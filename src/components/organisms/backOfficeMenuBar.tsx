'use client';

import MenubarLogout from '@/components/atoms/menubarLogout';
import Spacer from '@/components/atoms/spacer';
import MenubarLinks from '@/components/organisms/menubarLinks';
import Link from 'next/link';

const BackOfficeMenuBar = () => {
  const handleGoArchive = () => {
    window.open('https://dev.rchive.kr', '_blank');
  };

  return (
    <aside className="w-[292px] bg-black text-white">
      {/* header */}
      <section className="h-32 py-10">
        <div className="mx-auto max-w-[174px]">
          <Link href="/admin">
            <h1 className="text-2xl font-bold">르탄이의 백오피스 </h1>
          </Link>
        </div>
      </section>

      {/* selectBox */}
      <section className="mb-8 flex items-center justify-center">
        <button onClick={handleGoArchive}>
          <p className="h-[67px] w-[256px] rounded-xl bg-primary-400 px-4 py-5 text-center text-[18px] font-semibold">
            르탄이의 아카이브 바로 가기
          </p>
        </button>
      </section>

      {/* nav */}
      <MenubarLinks />

      <Spacer className="h-16" />

      {/* logout */}
      <MenubarLogout>로그아웃</MenubarLogout>
    </aside>
  );
};

export default BackOfficeMenuBar;
