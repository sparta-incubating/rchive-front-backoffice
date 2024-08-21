'use client';

import { usePeriodListQuery } from '@/api/profile/useQuery';
import AuthFilterCategory from '@/components/atoms/category/AuthCategory';
import { useAppSelector } from '@/redux/storeConfig';

interface CategoryProps {
  handleCategoryChange: (category: string, value: string) => void;
}

const CategoryFiltered = ({ handleCategoryChange }: CategoryProps) => {
  const { trackRole, trackName } = useAppSelector((state) => state.authSlice);

  const roleCategory = [
    { id: 1, name: 'APM', value: 'APM' },
    { id: 2, name: '수강생', value: 'STUDENT' },
  ];

  const sortCategory = [
    { id: 1, name: '최신순', value: 'DATE_LATELY' },
    { id: 2, name: '가나다순', value: 'NAME_ALPHABETICALLY' },
  ];

  const periodList = usePeriodListQuery(trackName) ?? [];
  const reversPeriod = [...periodList].reverse();
  const periodCategory = reversPeriod?.map((item: number) => ({
    id: item,
    name: `${item}기`,
    value: item.toString(),
  }));

  return (
    <div className="flex flex-row">
      <AuthFilterCategory
        label="직책"
        data={roleCategory}
        setValue={(value) => handleCategoryChange('trackRole', value)}
      />
      {trackRole === 'PM' && (
        <>
          <AuthFilterCategory
            label="최신순"
            data={sortCategory}
            setValue={(value) => handleCategoryChange('sort', value)}
          />
          <AuthFilterCategory
            label="기수"
            data={periodCategory}
            setValue={(value) => handleCategoryChange('searchPeriod', value)}
          />
        </>
      )}
    </div>
  );
};

export default CategoryFiltered;
