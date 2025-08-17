const Resource = require('../model/Resource');

// @desc    Upload a new resource
// @route   POST /api/resources
// @access  Private (Admins & Professors only)


const searchResources = async (req, res) => {
    try {
      const { query } = req.query;
  
      if (!query) {
        return res.status(400).json({ message: "Search query is required" });
      }
  
      const resources = await Resource.find({
        $or: [
          { title: { $regex: query, $options: "i" } },  // Case-insensitive search
          { category: { $regex: query, $options: "i" } },
          { uploader: { $regex: query, $options: "i" } },
          { tags: { $in: [query] } }, // If tags are an array
        ],
      });
  
      res.json(resources);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

const createResource = async (req, res) => {
    try {
        const { title, description, type, url, filePath, content, category } = req.body;

        // Validate the type and required fields
        if (!["link", "file", "video", "text", "blog"].includes(type)) {
            return res.status(400).json({ message: "Invalid resource type" });
        }
        if (type === "link" || type === "video") {
            if (!url) return res.status(400).json({ message: "URL is required for this type" });
        }
        if (type === "file") {
            if (!filePath) return res.status(400).json({ message: "File path is required for file type" });
        }
        if (type === "text") {
            if (!content) return res.status(400).json({ message: "Content is required for text type" });
        }

        const resource = new Resource({
            title,
            description,
            type,
            url,
            filePath,
            content,
            category,
            createdBy: req.user.id,  // ✅ Ensure the correct field
        });

        await resource.save();
        res.status(201).json({ message: "Resource created successfully", resource });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// @desc    Get all resources
// @route   GET /api/resources
// @access  Public
const getResources = async (req, res) => {
    try {
        const resources = await Resource.find().populate("createdBy", "name email");
        res.status(200).json(resources);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single resource by ID
// @route   GET /api/resources/:id
// @access  Public
const getResourceById = async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id)
            .populate('createdBy', 'name email');  // Updated from 'uploadedBy' to 'createdBy'

        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        res.status(200).json(resource);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a resource
// @route   PUT /api/resources/:id
// @access  Private (Only Admins & Uploader)
const updateResource = async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);

        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        if (resource.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        Object.assign(resource, req.body);
        await resource.save();

        res.status(200).json({ message: 'Resource updated successfully', resource });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// @desc    Delete a resource
// @route   DELETE /api/resources/:id
// @access  Private (Only Admins & Uploader)
const deleteResource = async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);

        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        if (resource.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        await resource.deleteOne();

        res.status(200).json({ message: 'Resource deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    searchResources,
    createResource,
    getResources,
    getResourceById,
    updateResource,
    deleteResource,
};
