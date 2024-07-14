import React, { useState } from 'react';
import ErrorDraw from '../components/ErrorDraw';
import { useDispatch, useSelector } from 'react-redux';
import { createBlog } from '../features/blogSlice';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import Loader from '../components/Loader';
const CreateBlogPage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.blog);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createBlog({ title, content })).then(() => navigate('/'));
    };
    return (<>
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card>
                        <Card.Header className="text-center" style={{backgroundColor:'rgb(113 44 249)',color:'#fff'}}>
                            <h3>Create Blog Post</h3>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formTitle" className='mb-4'>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formContent" className='mb-4'>
                                    <Form.Label>Content</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={5}
                                        placeholder="Enter content"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" block>
                                    {loading ? <Loader type="button" size="sm" inline /> : 'Create Post'}
                                </Button>
                                <ErrorDraw show={error && true} error={error} />
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    </>
    );
};

export default CreateBlogPage;
