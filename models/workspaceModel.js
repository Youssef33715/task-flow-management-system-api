const mongoose = require("mongoose");

const workspaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: { type: String, default: "" },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, //Relations=>One To many
  },
  { timestamps: true },
);

const WorkSpace = mongoose.model("WorkSpace", workspaceSchema);
module.exports = WorkSpace;
