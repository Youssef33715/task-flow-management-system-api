const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    task: {
      //One To many
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    createdBy: {
      //One To many
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);
const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
