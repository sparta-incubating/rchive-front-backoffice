import { PostContentType } from '@/types/posts.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PostListType {
  posts: PostContentType[];
}

const initialState: PostListType = {
  posts: [],
};

const PostsSlice = createSlice({
  name: 'postsSlice',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<PostContentType[]>) => {
      state.posts = action.payload;
    },
    updateIsOpen: (
      state,
      action: PayloadAction<{ postIds: number[]; isOpen: boolean }>,
    ) => {
      const { postIds, isOpen } = action.payload;
      state.posts = state.posts.map((post) =>
        postIds.includes(post.postId)
          ? {
              ...post,
              isOpened: isOpen,
            }
          : post,
      );
    },
  },
});

export const { setPosts, updateIsOpen } = PostsSlice.actions;
export default PostsSlice.reducer;
