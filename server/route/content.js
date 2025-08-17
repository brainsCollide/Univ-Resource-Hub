const express = require('express');
const router = express.Router();
const { getAllContent, getContentById, createContent, updateContent, deleteContent } = require('../controller/content');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');


//public routes
router.get('/', getAllContent);
router.get('/:id', authMiddleware, getContentById);

// Private Routes (Only Authenticated Users)
router.post('/',authMiddleware, adminMiddleware, createContent);
router.put('/:id', authMiddleware, adminMiddleware, updateContent);
router.delete('/:id',authMiddleware, adminMiddleware ,deleteContent);

module.exports = router;