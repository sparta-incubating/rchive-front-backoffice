'use client';

import MenubarLogout from '@/components/atoms/menubarLogout';
import Spacer from '@/components/atoms/spacer';
import MenubarLinks from '@/components/organisms/menubarLinks';
import SelectBox from '@/components/organisms/selectBox';
import { AppDispatch } from '@/redux/config/storeConfig';
import { clearTokens } from '@/redux/modules/authSlice';
import { Links } from '@/types/menubar.types';
import { SelectOptionType } from '@/types/signup.types';
import { useDispatch } from 'react-redux';

const options: SelectOptionType[] = [
  { value: '0', label: '르탄이의 바로 가기', selected: false },
  { value: '1', label: '옵션1', selected: false },
  { value: '2', label: '옵션2', selected: false },
  { value: '3', label: '옵션3', selected: false },
];

const links: Links[] = [
  { href: '/admin', title: '권한 관리' },
  { href: '/posts/write', title: '게시물 작성' },
  { href: '/posts', title: '게시물 관리' },
  { href: '/profile', title: '프로필 관리' },
];

const BackOfficeMenuBar = () => {
  const handleSelect = (value: SelectOptionType['value']) => {
    console.log({ value });
  };

  const dispatch = useDispatch<AppDispatch>();

  const Logout = () => {
    // client.delete('/api/v1/users/logout');
    dispatch(clearTokens());
    localStorage.removeItem('token');
  };

  return (
    <aside className="w-[292px] bg-black text-white">
      {/* header */}
      <section className="h-36 py-10">
        <div className="mx-auto max-w-[174px]">
          <h1 className="text-2xl font-bold">르탄이의 아카이브 </h1>
          <h1 className="text-2xl font-bold">BackOffice</h1>
        </div>
      </section>

      {/* selectBox */}
      <section className="mb-8 flex items-center justify-center">
        <SelectBox
          options={options}
          label={''}
          onSelect={handleSelect}
          selectInputVariant={'menubar'}
          className="w-[256px] bg-primary-400 px-4"
        />
      </section>

      {/* nav */}
      <MenubarLinks links={links} />

      <Spacer className="h-16" />
      {/* logout */}
      <MenubarLogout onClick={Logout}>로그아웃</MenubarLogout>
    </aside>
  );
};

export default BackOfficeMenuBar;
