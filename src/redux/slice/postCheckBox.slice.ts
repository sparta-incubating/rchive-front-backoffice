import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PostId {
  postId: number;
}

interface PostCheckBoxInitialType {
  postIds: number[];
}

const initialState: PostCheckBoxInitialType = {
  postIds: [],
};

const PostCheckBoxSlice = createSlice({
  name: 'postCheckBoxSlice',
  initialState,
  reducers: {
    setPostId: (state, action: PayloadAction<PostId>) => {
      const { postId } = action.payload;
      if (state.postIds.includes(postId)) {
        state.postIds = state.postIds.filter((id) => id !== postId);
      } else {
        state.postIds.push(postId);
      }
    },
    setAllPostIds: (
      state,
      action: PayloadAction<{ postIds: number[]; checked: boolean }>,
    ) => {
      const { postIds, checked } = action.payload;
      if (checked) {
        state.postIds = Array.from(new Set([...state.postIds, ...postIds]));
      } else {
        state.postIds = state.postIds.filter((id) => !postIds.includes(id));
      }
    },
    clearPostIds: (state) => {
      state.postIds = [];
    },
  },
});

export const { setPostId, setAllPostIds, clearPostIds } =
  PostCheckBoxSlice.actions;
export default PostCheckBoxSlice.reducer;
