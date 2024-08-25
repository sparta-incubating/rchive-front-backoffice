import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AdminId {
  adminId: string;
}

interface PostCheckBoxInitialType {
  adminIds: string[];
}

const initialState: PostCheckBoxInitialType = {
  adminIds: [],
};

const AdminCheckBoxSlice = createSlice({
  name: ' AdminCheckBoxSlice',
  initialState,
  reducers: {
    setAdminId: (state, action: PayloadAction<AdminId>) => {
      const { adminId } = action.payload;
      if (state.adminIds.includes(adminId)) {
        state.adminIds = state.adminIds.filter((id) => id !== adminId);
      } else {
        state.adminIds.push(adminId);
      }
    },
    setAllAdminIds: (
      state,
      action: PayloadAction<{ adminIds: string[]; checked: boolean }>,
    ) => {
      const { adminIds, checked } = action.payload;
      if (checked) {
        state.adminIds = Array.from(new Set([...state.adminIds, ...adminIds]));
      } else {
        state.adminIds = state.adminIds.filter((id) => !adminIds.includes(id));
      }
    },
    clearAdminIds: (state) => {
      state.adminIds = [];
    },
  },
});

export const { setAdminId, setAllAdminIds, clearAdminIds } =
  AdminCheckBoxSlice.actions;
export default AdminCheckBoxSlice.reducer;
