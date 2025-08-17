const express = require('express');
const router = express.Router();
const {
    searchResources,
    createResource,
    getResources,
    getResourceById,
    updateResource,
    deleteResource,
} = require('../controller/resource');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// Public Routes
router.get("/search", searchResources);
router.get('/', getResources);
router.get('/:id', getResourceById);

// Private Routes (Only Authenticated Users)
router.post('/', authMiddleware, adminMiddleware, createResource);
router.put('/:id', authMiddleware, adminMiddleware, updateResource);
router.delete('/:id', authMiddleware, adminMiddleware, deleteResource);

module.exports = router;
