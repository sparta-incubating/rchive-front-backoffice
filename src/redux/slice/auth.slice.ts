import { RootState } from '@/redux/storeConfig';
import { trackRole } from '@/types/auth.types';
import { TrackType } from '@/types/posts.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface authInitialType {
  accessToken: string;
  trackName: TrackType;
  trackRole: trackRole;
  period: string;
}

const initialState: authInitialType = {
  accessToken: '',
  trackName: '' as TrackType,
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
      state.trackRole = action.payload.trackRole;
      state.period = action.payload.period;
    },
  },
});

export const { setAuth } = AuthSlice.actions;
export const selectAuth = (state: RootState) => state;
export default AuthSlice.reducer;
