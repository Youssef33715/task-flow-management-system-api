const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Too short task title"],
      maxlength: [100, "Too long task title"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [2000, "Too long description"],
    },
    status: {
      type: String,
      enum: ["todo", "in_progress", "review", "done"],
      default: "todo",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "medium",
    },
    dueDate: {
      type: Date,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId, //
      ref: "Project",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Task must be have a creator"],
    },
  },
  { timestamps: true },
);
TaskSchema.index({ assignedTo: 1 });
TaskSchema.index({ project: 1 });
TaskSchema.index({ status: 1 });
const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;
