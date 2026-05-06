import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Comment = { id: number; body: string; user?: { username?: string } };
type CommentsState = {
  byPostId: Record<number, Comment[]>;
  loading: boolean;
  error: string | null;
};

const initialState: CommentsState = {
  byPostId: {},
  loading: false,
  error: null,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    fetchCommentsRequest: (state, _action: PayloadAction<number>) => {
      state.loading = true;
      state.error = null;
    },
    fetchCommentsSuccess: (
      state,
      action: PayloadAction<{ postId: number; comments: Comment[] }>
    ) => {
      state.loading = false;
      state.byPostId[action.payload.postId] = action.payload.comments;
    },
    fetchCommentsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchCommentsRequest, fetchCommentsSuccess, fetchCommentsFailure } =
  commentsSlice.actions;
export default commentsSlice.reducer;
