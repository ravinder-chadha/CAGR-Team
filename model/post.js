const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, default: null },
  description: { type: String, required: true, default: null },
  image: { type: String, required: true, default: null },
  author: { type: String, required: true, default: null },
  email: { type: String, required: true, default: null },
  likes: { type: Number, default: 0 },
  id : { type: String, required: true, default: null },
  Comments: { type: Array, default: [] },
});

module.exports = mongoose.model("posts", postSchema);
