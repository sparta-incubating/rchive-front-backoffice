'use client';

import FilterCategory from './category/filterCategory';
import PermissionCategory from './category/permissionCategory';

const OfficeCategory = () => {
  return (
    <>
      <section className="mb-8 flex items-center justify-center">
        <div className="flex flex-col">
          <PermissionCategory />
          <br /> <br /> <br /> <br /> <br />
          <FilterCategory />
        </div>
      </section>
    </>
  );
};
export default OfficeCategory;
