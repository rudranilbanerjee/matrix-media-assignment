import { Card } from "react-bootstrap";

const CommentList = ({ comment }) => {
    const { content, commenter, createdAt } = comment;
    return (
        <>
            <Card className="comment-card mb-2">
                <Card.Body>
                    <Card.Subtitle className="mb-2" style={{fontSize:'12px',color:'rgb(113 44 249)'}}>{commenter} <span style={{color:'gray'}}>{new Date(createdAt).toLocaleString()}</span></Card.Subtitle>
                    <Card.Text style={{fontSize:'18px'}}>{content}</Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}

export default CommentList;