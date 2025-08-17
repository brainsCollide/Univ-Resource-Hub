const mongoose = require("mongoose");

const ResourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  type: { 
    type: String, 
    required: true, 
    enum: ["link", "file", "video", "text", "blog"]  // Add "blog" as a new type
  },
  author: {type: String},
  url: { type: String },        // For link, video
  filePath: { type: String },   // For file
  content: { type: String },    // For text and blog
  category: { type: String },
  coverImage: { type: String }, // (optional) for blog thumbnail
  tags: [{ type: String }],     // (optional) for blog tags
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("Resource", ResourceSchema);