import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comments: null,
  loading: false,
  error: false,
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    startPostComment: (state) => {
      state.loading = true;
    },
    postCommentFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    getComments: (state, action) => {
      state.comments = action.payload;
    },
  },
});

export const { startPostComment, postCommentFailure, getComments } =
  commentSlice.actions;

export default commentSlice.reducer;
