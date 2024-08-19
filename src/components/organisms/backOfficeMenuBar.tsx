'use client';

import MenubarLogout from '@/components/atoms/menubarLogout';
import Spacer from '@/components/atoms/spacer';
import MenubarLinks from '@/components/organisms/menubarLinks';
import SelectBox from '@/components/organisms/selectBox';
import { SelectOptionType } from '@/types/signup.types';

const options: SelectOptionType[] = [
  { value: '0', label: '르탄이의 바로 가기', selected: false },
  { value: '1', label: '옵션1', selected: false },
  { value: '2', label: '옵션2', selected: false },
  { value: '3', label: '옵션3', selected: false },
];

const BackOfficeMenuBar = () => {
  const handleSelect = (value: SelectOptionType['value']) => {
    console.log(value, 'value');
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
      <MenubarLinks />

      <Spacer className="h-16" />

      {/* logout */}
      <MenubarLogout>로그아웃</MenubarLogout>
    </aside>
  );
};

export default BackOfficeMenuBar;
