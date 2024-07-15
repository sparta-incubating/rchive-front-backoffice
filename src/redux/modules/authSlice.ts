import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  access: string | null;
}

const initialState: AuthState = {
  access: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<{ access: string }>) => {
      state.access = action.payload.access;
      console.log(state.access, 'aaaa');
    },
    clearTokens: (state) => {
      state.access = null;
    },
  },
});

export const { setTokens, clearTokens } = authSlice.actions;
export default authSlice.reducer;
