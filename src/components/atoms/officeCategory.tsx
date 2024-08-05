'use client';

import FilterCategory from './category/filterCategory';
import PermissionCategory from './category/permissionCategory';

const OfficeCategory = () => {
  return (
    <div className="flex flex-row">
      <FilterCategory />
      <PermissionCategory />
    </div>
  );
};
export default OfficeCategory;
