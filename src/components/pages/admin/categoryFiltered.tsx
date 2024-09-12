'use client';

import { usePeriodListQuery } from '@/api/profile/useQuery';
import AuthFilterCategory from '@/components/atoms/category/AuthCategory';
import { useAppSelector } from '@/redux/storeConfig';
import { useState } from 'react';

interface CategoryProps {
  handleCategoryChange: (category: string, value: string) => void;
}

const CategoryFiltered = ({ handleCategoryChange }: CategoryProps) => {
  const { trackName, trackRole } = useAppSelector((state) => state.authSlice);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const roleCategory = [
    { id: 1, name: '전체', label: '직책', value: '' },
    { id: 2, name: 'APM', label: 'APM', value: 'APM' },
    { id: 3, name: '수강생', label: '수강생', value: 'STUDENT' },
  ];

  const sortCategory = [
    { id: 1, name: '최신순', label: '최신순', value: 'DATE_LATELY' },
    {
      id: 2,
      name: '가나다순',
      label: '가나다순',
      value: 'NAME_ALPHABETICALLY',
    },
  ];

  const periodList = usePeriodListQuery(trackName) ?? [];
  const periodItem = periodList?.map((item: number) => ({
    id: item,
    name: `${item}기`,
    value: item.toString(),
    label: `${item}기`,
  }));

  const periodCategory = [
    { id: 1, name: '전체', label: '기수', value: '' },
    ...periodItem,
  ];

  const handleCategoryClick = (category: string) => {
    setActiveCategory((prev) => (prev === category ? null : category));
  };

  return (
    <div className="flex flex-row gap-[10px]">
      {trackRole === 'PM' ? (
        <>
          <div>
            <AuthFilterCategory
              label="직책"
              data={roleCategory}
              isOpen={activeCategory === 'trackRole'}
              setValue={(value) => {
                handleCategoryChange('trackRole', value);
                handleCategoryClick('trackRole');
              }}
              onClick={() => handleCategoryClick('trackRole')}
            />
          </div>
          <div>
            <AuthFilterCategory
              label="기수"
              data={periodCategory}
              isOpen={activeCategory === 'searchPeriod'}
              setValue={(value) => {
                handleCategoryChange('searchPeriod', value);
                handleCategoryClick('searchPeriod');
              }}
              onClick={() => handleCategoryClick('searchPeriod')}
            />
          </div>
          <div>
            <AuthFilterCategory
              label="최신순"
              data={sortCategory}
              isOpen={activeCategory === 'sort'}
              setValue={(value) => {
                handleCategoryChange('sort', value);
                handleCategoryClick('sort');
              }}
              onClick={() => handleCategoryClick('sort')}
            />
          </div>
        </>
      ) : (
        <div>
          <AuthFilterCategory
            label="최신순"
            data={sortCategory}
            isOpen={activeCategory === 'sort'}
            setValue={(value) => {
              handleCategoryChange('sort', value);
              handleCategoryClick('sort');
            }}
            onClick={() => handleCategoryClick('sort')}
          />
        </div>
      )}
    </div>
  );
};

export default CategoryFiltered;
