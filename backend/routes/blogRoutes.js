const express = require('express');
const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} = require('../controllers/blogController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getPosts).post(protect, createPost);
router
  .route('/:id')
  .get(protect,getPostById)
  .put(protect, updatePost)
  .delete(protect, deletePost);

module.exports = router;
