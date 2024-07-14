const express = require('express');
const { createComment } = require('../controllers/commentController');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');

router.post('/', protect, createComment);

module.exports = router;
