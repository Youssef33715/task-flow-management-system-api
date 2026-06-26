const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: { type: String, default: "" },
    status: {
      type: String,
      enum: ["planning", "active", "completed", "cancelled"],
      default: "planning",
    },
    startDate: { type: Date },
    endData: { type: Date },
    workspace: {
      type: mongoose.Schema.Types.ObjectId, //One To Many
      ref: "WorkSpace",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;
