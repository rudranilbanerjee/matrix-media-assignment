const Comment = require('../models/Comment');

exports.createComment = async (req, res) => {
  const { content, blogPost } = req.body;

  try {
    console.log(req.user.id)

    // req.user is set on authentication middleware checking time
    const commenter = req.user.username;

    const newComment = new Comment({
      content,
      commenter,
      blogPost,
    });

    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ isError:true, error: error.message });
  }
};
