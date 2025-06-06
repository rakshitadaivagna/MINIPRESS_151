import express from "express";
import Blog from "../models/Blog.js";

const router = express.Router();

// ✅ Add new blog
router.post("/add", async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json({ message: "Blog added successfully", blog });
  } catch (err) {
    console.error("Add Blog Error:", err);
    res.status(500).json({ error: "Failed to add blog" });
  }
});

// ✅ Get all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    console.error("Get Blogs Error:", err);
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

// ✅ Get blog by ID
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (err) {
    console.error("Get Blog by ID Error:", err);
    res.status(500).json({ error: "Failed to fetch blog" });
  }
});

// ✅ Delete blog (admin)
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Blog.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.error("Delete Blog Error:", err);
    res.status(500).json({ error: "Failed to delete blog" });
  }
});

// ✅ Update blog (admin)
router.put("/edit/:id", async (req, res) => {
  try {
    const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json({ message: "Blog updated successfully", blog: updated });
  } catch (err) {
    console.error("Update Blog Error:", err);
    res.status(500).json({ error: "Failed to update blog" });
  }
});

export default router;
