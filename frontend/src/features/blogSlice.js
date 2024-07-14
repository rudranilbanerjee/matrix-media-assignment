import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../services/api';

export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async () => {
  const response = await axiosInstance.get('/blogs');
  return response.data;
});

export const fetchBlogById = createAsyncThunk('blogs/fetchBlogById', async (id) => {
  const response = await axiosInstance.get(`/blogs/${id}`);
  return response.data;
});

export const createBlog = createAsyncThunk('blogs/createBlog', async (blogData) => {
  const response = await axiosInstance.post('/blogs', blogData);
  return response.data;
});

export const updateBlog = createAsyncThunk('blogs/updateBlog', async ({ id, blogData }) => {
  const response = await axiosInstance.put(`/blogs/${id}`, blogData);
  return response.data;
});

export const deleteBlog = createAsyncThunk('blogs/deleteBlog', async (id) => {
  const response = await axiosInstance.delete(`/blogs/${id}`);
  return response.data;
});

const blogSlice = createSlice({
  name: 'blogs',
  initialState: { blogs: [], blog: null, loading: false, error: null },
  reducers: {
    handleEditBlog: (state, { payload }) => {
      console.log(payload)
      state.blog = { ...state.blog, title: payload.title, content: payload.content };
    },
    clearBlog:(state)=>{
      state.blog=null
    },
    updateSortedBlogs:(state,{payload})=>{
      state.blogs=[...payload];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchBlogById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload;
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs.push(action.payload);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = state.blogs.map((blog) => (blog._id === action.payload._id ? action.payload : blog));
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = state.blogs.filter((blog) => blog._id !== action.payload);
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { handleEditBlog, clearBlog,updateSortedBlogs } = blogSlice.actions;

export default blogSlice.reducer;
