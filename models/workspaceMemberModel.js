const mongoose = require("mongoose");

const workspaceMemberSchema = new mongoose.Schema(
  {
    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WorkSpace",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["manager", "member"],
      default: "member",
    },
  },
  { timestamps: true },
);
// Unique Index: عشان الـ User يبقى مرة واحدة في الـ Workspace
workspaceMemberSchema.index({ workspace: 1, user: 1 }, { unique: true });

module.exports = mongoose.model("WorkspaceMember", workspaceMemberSchema);
