import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Post = { id: number; title: string; body: string; tags?: string[] };
type PostsState = {
  items: Post[];
  total: number;
  loading: boolean;
  error: string | null;
};

const initialState: PostsState = {
  items: [],
  total: 0,
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    fetchPostsRequest: (
      state,
      _action: PayloadAction<{ limit?: number; skip?: number; q?: string } | undefined>
    ) => {
      state.loading = true;
      state.error = null;
    },
    fetchPostsSuccess: (
      state,
      action: PayloadAction<{ posts: Post[]; total: number }>
    ) => {
      state.loading = false;
      state.items = action.payload.posts;
      state.total = action.payload.total;
    },
    fetchPostsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchPostsRequest, fetchPostsSuccess, fetchPostsFailure } =
  postsSlice.actions;
export default postsSlice.reducer;
