const Blog = require('../models/blog.model');
const User = require('../models/user.model');
const Tag = require('../models/tag.model');
const Category = require('../models/category.model');

// Create a new blog
exports.createBlog = async (req, res) => {
    try {
        const { title, content, author, tags, category } = req.body;
        const image = req.file ? req.file.path : null; // Handle file upload

        // Validate author
        const validAuthor = await User.findById(author);
        if (!validAuthor) {
            return res.status(400).json({ message: 'Invalid author ID' });
        }

        // Validate tags
        const validTags = await Tag.find({ _id: { $in: tags } });
        if (validTags.length !== tags.length) {
            return res.status(400).json({ message: 'One or more invalid tag IDs' });
        }

        // Validate category
        const validCategory = await Category.findById(category);
        if (!validCategory) {
            return res.status(400).json({ message: 'Invalid category ID' });
        }

        const blog = new Blog({ title, content, author, tags, category, image });
        await blog.save();
        res.status(201).json({ message: 'Blog created successfully', blog });
    } catch (error) {
        res.status(500).json({ message: 'Error creating blog', error });
    }
};

// Get all blogs
exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'username').populate('tags', 'name').populate('category', 'name');
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching blogs', error });
    }
};

// Get a single blog by ID
exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
            .populate('author', 'username')
            .populate('tags', 'name')
            .populate('category', 'name');

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching blog', error });
    }
};

// Update a blog by ID
exports.updateBlogById = async (req, res) => {
    try {
        const { title, content, author, tags, category } = req.body;
        const image = req.file ? req.file.path : null; // Handle file upload

        // Validate author
        const validAuthor = await User.findById(author);
        if (!validAuthor) {
            return res.status(400).json({ message: 'Invalid author ID' });
        }

        // Validate tags
        const validTags = await Tag.find({ _id: { $in: tags } });
        if (validTags.length !== tags.length) {
            return res.status(400).json({ message: 'One or more invalid tag IDs' });
        }

        // Validate category
        const validCategory = await Category.findById(category);
        if (!validCategory) {
            return res.status(400).json({ message: 'Invalid category ID' });
        }

        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            { title, content, author, tags, category, image, updatedAt: new Date() },
            { new: true }
        );

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.status(200).json({ message: 'Blog updated successfully', blog });
    } catch (error) {
        res.status(500).json({ message: 'Error updating blog', error });
    }
};

// Delete a blog by ID
exports.deleteBlogById = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting blog', error });
    }
};
