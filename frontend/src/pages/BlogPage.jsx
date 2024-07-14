import React, { useEffect } from 'react';
import BlogPost from '../components/Blog/BlogPost';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogById } from '../features/blogSlice';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import ErrorDraw from '../components/ErrorDraw';
const BlogPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { blog, loading, error } = useSelector((state) => state.blog);

    useEffect(() => {
        dispatch(fetchBlogById(id));
    }, [dispatch, id]);

    useEffect(()=>{
        console.log(blog)
    },[blog])
    
    if(loading){
        return (
            <>
               <Loader/>
            </>
        )
    }
    return (
        <div>
            {
                blog && <BlogPost blog={blog}/>
            }
            <ErrorDraw show={error && true} error={error}/>
        </div>
    );
};

export default BlogPage;
