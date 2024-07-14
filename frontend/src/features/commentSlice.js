import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../services/api';
export const createComment = createAsyncThunk('comments/createComment', async (commentData) => {
  const response = await axiosInstance.post('/comments', commentData);
  return response.data;
});

const commentSlice = createSlice({
  name: 'comments',
  initialState: { comments: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.push(action.payload);
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default commentSlice.reducer;
