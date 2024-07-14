import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  access: string | null;
  //   refresh: string | null;
}

const initialState: AuthState = {
  access: null,
  //   refresh: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<{ access: string }>) => {
      state.access = action.payload.access;
      //   state.refresh = action.payload.refresh;
      console.log(state.access, 'redux');
    },
    clearTokens: (state) => {
      state.access = null;
      //   state.refresh = null;
    },
  },
});

export const { setTokens, clearTokens } = authSlice.actions;
export default authSlice.reducer;
