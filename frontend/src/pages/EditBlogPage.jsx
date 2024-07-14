import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleEditBlog, updateBlog } from '../features/blogSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import ErrorDraw from '../components/ErrorDraw';
const EditBlogPage = ({show, handleClose, blogTitle, blogContent}) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.blog);

  const [title, setTitle] = useState(blogTitle);
  const [content, setContent] = useState(blogContent);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateBlog({ id, blogData: { title, content } })).then((data) => {
      console.log(data)
      if(data.payload.isSuccess){
        handleClose();
        dispatch(handleEditBlog(data.payload.post));
      }
    });
  };

  return (<>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Blog</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formContent" className="mt-3">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Enter content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            {loading ? 'Loading...' : 'Update'}
          </Button>
          <ErrorDraw show={ error && true} error={error}/>
        </Form>
      </Modal.Body>
    </Modal>
  </>
  );
};

export default EditBlogPage;
