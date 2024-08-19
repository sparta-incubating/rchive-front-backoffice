'use client';

import AuthFilterCategory from '@/components/atoms/category/AuthCategory';

interface CategoryProps {
  trackRole: string;
  handleCategoryChange: (category: string, value: string) => void;
}

const CategoryFiltered = ({
  trackRole,
  handleCategoryChange,
}: CategoryProps) => {
  const roleCategory = [
    { id: 1, name: 'APM', value: 'APM' },
    { id: 2, name: '수강생', value: 'STUDENT' },
  ];

  const sortCategory = [
    { id: 1, name: '최신순', value: 'DATE_LATELY' },
    { id: 2, name: '가나다순', value: 'NAME_ALPHABETICALLY' },
  ];

  const periodCategory = [
    { id: 1, name: '1기', value: '1' },
    { id: 2, name: '2기', value: '2' },
  ];

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
