import { useNavigate } from "react-router-dom";
import Comment from "./Comment";
import CommentList from "./CommentList";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog } from "../../features/blogSlice";
import { Container, Card } from 'react-bootstrap';
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useState } from "react";
import EditBlogPage from "../../pages/EditBlogPage";
const BlogPost = ({ blog }) => {
    const { title, content, author, comments } = blog;
    const navigate = useNavigate();
    const { data } = useSelector((state) => state.auth);
    const dispatch = useDispatch()
    const [showEditBlog,setShowEditBlog] = useState(false);
    const editBlog = () => {
        setShowEditBlog(true);
    }
    const handleCloseEditPopup=()=>{
        setShowEditBlog(false);
    }
    const deleteABlog = () => {
        dispatch(deleteBlog(blog._id)).then(() => {
            navigate(`/`)
        });
    }
    return (
        <>
            <Container className="mt-4">
                <Card className="blog-card shadow">
                    <Card.Body>
                        <Card.Title className="blog_title mb-3">
                            <span style={{ fontSize: '24px', color: 'rgb(113 44 249)',marginTop:'8px' }}>{title}</span>
                            <div className="d-flex ustify-content-center align-items-center">
                                {blog.author._id === data.userId && <button onClick={editBlog} className="icon_btn"><FaEdit/></button>}
                                {blog.author._id === data.userId && <button onClick={deleteABlog} className="icon_btn"><MdDeleteOutline/></button>}
                            </div>
                        </Card.Title>
                        <Card.Subtitle style={{ fontSize: '14px' }} className="mb-2 text-muted">Author: {author.username}</Card.Subtitle>
                        <Card.Text className="blog_content mt-3">{content}</Card.Text>
                    </Card.Body>
                </Card>

                <h4 className="mt-4">Comments</h4>
                <div className="comments-list">
                    {comments.map((comment) => (
                        <CommentList key={comment._id} comment={comment} />
                    ))}
                </div>

                <h4 className="mt-4">Add a Comment</h4>
                <Comment blogId={blog._id} />
            </Container>
            <EditBlogPage show={showEditBlog} handleClose={handleCloseEditPopup} blogTitle={title} blogContent={content}/>
        </>
    )
}

export default BlogPost;