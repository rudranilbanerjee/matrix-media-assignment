import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from '../../features/commentSlice';
import ErrorDraw from '../ErrorDraw';

import { fetchBlogById } from '../../features/blogSlice';
import { Form,Button } from 'react-bootstrap';
const Comment = ({ blogId }) => {
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.comment);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createComment({ content, blogPost: blogId })).then(() => {
      setContent('');
      dispatch(fetchBlogById(blogId));
    });
  };

  return (
    <>
      <Form className="comment-form" onSubmit={handleSubmit}>
        <Form.Group controlId="formComment">
          <Form.Control as="textarea" value={content} onChange={(e) => setContent(e.target.value)} rows={3} placeholder="Write your comment here..." />
        </Form.Group>
        <Button variant="primary" type="submit" className='mt-2'>
          {loading? 'Loading...': 'Submit'}
        </Button>
        <ErrorDraw show={error && true} error={error} />
      </Form>
    </>
  );
};

export default Comment;
