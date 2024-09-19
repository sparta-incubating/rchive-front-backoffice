import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AdminItem {
  email: string;
  period: number;
}

interface PostCheckBoxInitialType {
  selectedItems: AdminItem[];
}

const initialState: PostCheckBoxInitialType = {
  selectedItems: [],
};

const AdminCheckBoxSlice = createSlice({
  name: 'AdminCheckBoxSlice',
  initialState,
  reducers: {
    selectItem: (state, action: PayloadAction<AdminItem>) => {
      const { email, period } = action.payload;
      const index = state.selectedItems.findIndex(
        (item) => item.email === email && item.period === period,
      );
      if (index === -1) {
        state.selectedItems.push({ email, period });
      } else {
        state.selectedItems.splice(index, 1);
      }
    },
    selectAllItems: (
      state,
      action: PayloadAction<{
        adminIds: AdminItem[];
        period: string;
        checked: boolean;
      }>,
    ) => {
      const { adminIds, checked } = action.payload;
      if (checked) {
        const newItems = adminIds.filter(
          (admin) =>
            !state.selectedItems.some(
              (item) =>
                item.email === admin.email && item.period === admin.period,
            ),
        );
        state.selectedItems = [...state.selectedItems, ...newItems];
      } else {
        state.selectedItems = state.selectedItems.filter(
          (item) =>
            !adminIds.some(
              (admin) =>
                admin.email === item.email && admin.period === item.period,
            ),
        );
      }
    },
    clearSelectedItems: (state) => {
      state.selectedItems = [];
    },
  },
});

export const { selectItem, selectAllItems, clearSelectedItems } =
  AdminCheckBoxSlice.actions;
export default AdminCheckBoxSlice.reducer;
