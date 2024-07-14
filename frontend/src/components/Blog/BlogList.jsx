import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const BlogList = ({ blog }) => {
    return (
        <>
            <Card className="blog-list-item shadow" style={{ backgroundColor: 'rgb(113, 44, 249)' }}>
                <Card.Body>
                    <Link to={`/blogs/${blog._id}`}>
                        <Card.Title style={{ color: '#fff',fontSize:'24px' }}>{blog.title}</Card.Title>
                        <Card.Subtitle className="mb-2" style={{ color: 'rgb(232 232 232)',fontSize:'14px' }}>
                            Author: {blog.author.username}
                        </Card.Subtitle>
                    </Link>
                </Card.Body>
            </Card>
        </>
    )
}

export default BlogList;