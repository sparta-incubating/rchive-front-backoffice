'use client';

import CategoryContainer from './categoryContainer';
import SelectLabel from './selectLabel';

const OfficeCategory = () => {
  return (
    <>
      ddd
      <section className="mb-8 flex items-center justify-center">
        {/* <SelectBox
          options={options}
          label={''}
          onSelect={handleSelect}
          selectInputVariant={'menubar'}
          className="w-[67px] px-4"
        /> */}
        <div className="flex flex-col">
          <CategoryContainer>
            <SelectLabel>최신순</SelectLabel>
          </CategoryContainer>
          <br />
          <br />
          <CategoryContainer variant="submit">
            <SelectLabel>대기</SelectLabel>
          </CategoryContainer>
        </div>
      </section>
    </>
  );
};
export default OfficeCategory;
