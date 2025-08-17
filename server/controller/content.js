const Content = require('../model/Content');

// Get all content
const getAllContent = async (req, res) => {
    try {
        const content = await Content.find();
        res.status(200).json(content);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get content by ID
const getContentById = async (req, res) => {
    try {
        const content = await Content.findById(req.params.id);
        if (!content) {
            return res.status(404).json({ message: 'Content not found' });
        }
        res.status(200).json(content);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new content
const createContent = async (req, res) => {
    const { title, body } = req.body;
    const newContent = new Content({ title, body });

    try {
        const savedContent = await newContent.save();
        res.status(201).json(savedContent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update content by ID
const updateContent = async (req, res) => {
    const { title, body } = req.body;

    try {
        const updatedContent = await Content.findByIdAndUpdate(
            req.params.id,
            { title, body },
            { new: true }
        );

        if (!updatedContent) {
            return res.status(404).json({ message: 'Content not found' });
        }

        res.status(200).json(updatedContent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete content by ID
const deleteContent = async (req, res) => {
    try {
        const deletedContent = await Content.findByIdAndDelete(req.params.id);

        if (!deletedContent) {
            return res.status(404).json({ message: 'Content not found' });
        }

        res.status(200).json({ message: 'Content deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllContent,
    getContentById,
    createContent,
    updateContent,
    deleteContent,
};
