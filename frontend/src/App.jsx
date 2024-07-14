import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BlogPage from './pages/BlogPage';
import CreateBlogPage from './pages/CreateBlogPage';
import EditBlogPage from './pages/EditBlogPage';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { clearBlog } from './features/blogSlice';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const currentPath = location.pathname;
    // If the current path is not '/blogs/:id', run the clearBlog function
    if (!currentPath.startsWith('/blogs/')) {
      dispatch(clearBlog());
    }
  }, [location, dispatch]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/create-blog" element={<PrivateRoute><CreateBlogPage /></PrivateRoute>} />
        <Route path="/blogs/:id" element={<PrivateRoute><BlogPage /></PrivateRoute>} />
      </Routes>
    </>
  )
}

export default App
