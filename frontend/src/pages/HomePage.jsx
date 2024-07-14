import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs,updateSortedBlogs } from '../features/blogSlice';
import BlogList from '../components/Blog/BlogList';
import { Col, Container, Dropdown, Row } from 'react-bootstrap';

const HomePage = () => {
    const dispatch = useDispatch();
    const { blogs, loading, error } = useSelector((state) => state.blog);
    // const [sortOrder, setSortOrder] = useState('new-to-old');
    useEffect(() => {
        dispatch(fetchBlogs());
    }, [dispatch]);
    const handleSort = (order) => {
        // setSortOrder(order);
        const sortedBlogs = [...blogs].sort((a, b) => {
          if (order === 'new-to-old') {
            return new Date(b.createdAt) - new Date(a.createdAt);
          } else if (order === 'old-to-new') {
            return new Date(a.createdAt) - new Date(b.createdAt);
          } else if (order === 'author-asc') {
            return a.author.username.localeCompare(b.author.username);
          } else if (order === 'author-desc') {
            return b.author.username.localeCompare(a.author.username);
          } else {
            return 0;
          }
        });
        console.log(sortedBlogs);
        dispatch(updateSortedBlogs(sortedBlogs));
    };
    return (<>
        <Container className="mt-4">
            <h2>Blog List</h2>
            <Row className="my-3">
                <Col className="d-flex justify-content-end">
                    <Dropdown>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                            Sort By
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleSort('new-to-old')}>New to Old</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleSort('old-to-new')}>Old to New</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleSort('author-asc')}>Author A-Z</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleSort('author-desc')}>Author Z-A</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
            <Row>
                {blogs.map((blog) => (
                    <BlogList blog={blog} key={blog._id} />
                ))}
            </Row>
        </Container>
    </>
    );
};

export default HomePage;
