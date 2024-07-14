const BlogPost = require('../models/BlogPost');
const mongoose = require('mongoose');
const Comment = require('../models/Comment');

exports.createPost = async (req, res) => {
  const { title, content } = req.body;

  try {
    const newPost = new BlogPost({
      title,
      content,
      author: req.user.id,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ isError:true, error: error.message });
  }
};

exports.getPosts = async (req, res) => {
  console.log("Hello")
  try {
    const posts = await BlogPost.find().populate('author', 'username');
    res.json(posts);
  } catch (error) {
    res.status(400).json({ isError:true, error: error.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const postId = new mongoose.Types.ObjectId(req.params.id);

    const result = await BlogPost.aggregate([
      { $match: { _id: postId } },
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'blogPost',
          as: 'comments'
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'author',
          foreignField: '_id',
          as: 'authorDetails'
        }
      },
      { $unwind: '$authorDetails' },
      { $project: { 
          title: 1,
          content: 1,
          createdAt: 1,
          'author._id': '$authorDetails._id',
          'author.username': '$authorDetails.username',
          comments: {
            _id:1,
            content: 1,
            commenter: 1,
            createdAt: 1
          }
        }
      }
    ]);

    if (result.length === 0) {
      return res.status(404).json({ isError:true, error: 'Post not found' });
    }

    res.json(result[0]);
  } catch (error) {
    res.status(400).json({ isError:true, error: error.message });
  }
};

exports.updatePost = async (req, res) => {
  const { title, content } = req.body;

  try {
    const post = await BlogPost.findById(req.params.id);

    console.log(post.author.toString());
    console.log( req.user.id)

    if (post.author.toString() !== req.user.id) {
      return res.status(401).json({ isError:true, message: 'Not authorized' });
    }

    post.title = title;
    post.content = content;

    await post.save();
    res.json({ isSuccess:true , post});
  } catch (error) {
    res.status(400).json({ isError:true, error: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ isError:true, message: 'Post not found' });
    }

    if (post.author.toString() !== req.user.id) {
      return res.status(401).json({ isError:true, message: 'Not authorized' });
    }


    // Delete all the comments which is related this post
    await Comment.deleteMany({ blogPost: post._id });

    // Delete only post
    await BlogPost.deleteOne({ _id: req.params.id });

    res.json({ isSuccess:true, message: 'Post removed' });
  } catch (error) {
    res.status(400).json({ isError:true, error: error.message });
  }
};
