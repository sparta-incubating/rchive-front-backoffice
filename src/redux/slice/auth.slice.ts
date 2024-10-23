import { RootState } from '@/redux/storeConfig';
import { trackRole } from '@/types/auth.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface authInitialType {
  accessToken: string;
  trackName: string;
  trackLabel: string;
  trackRole: trackRole;
  period: string;
}

const initialState: authInitialType = {
  accessToken: '',
  trackName: '' as string,
  trackLabel: '' as string,
  trackRole: 'USER' as trackRole,
  period: '0',
};

const AuthSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<authInitialType>) => {
      state.accessToken = action.payload.accessToken;
      state.trackName = action.payload.trackName;
      state.trackLabel = action.payload.trackLabel;
      state.trackRole = action.payload.trackRole;
      state.period = action.payload.period;
    },
  },
});

export const { setAuth } = AuthSlice.actions;
export const selectAuth = (state: RootState) => state;
export default AuthSlice.reducer;
