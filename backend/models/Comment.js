const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  commenter: { type: String, required: true },
  blogPost: { type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost', required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Comment', commentSchema);
