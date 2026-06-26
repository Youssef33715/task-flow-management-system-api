const mongoose = require("mongoose");

const ActivityLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
      enum: [
        "CREATE_WORKSPACE",
        "UPDATE_WORKSPACE",
        "DELETE_WORKSPACE",

        "CREATE_PROJECT",
        "UPDATE_PROJECT",
        "DELETE_PROJECT",

        "CREATE_TASK",
        "UPDATE_TASK",
        "DELETE_TASK",
        "ASSIGN_TASK",
        "CHANGE_TASK_STATUS",

        "CREATE_COMMENT",
        "UPDATE_COMMENT",
        "DELETE_COMMENT",

        "UPLOAD_FILE",
        "DELETE_FILE",
      ],
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WorkSpace",
      required: true,
    },

    description: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true },
);

ActivityLogSchema.index({ workspace: 1 });
ActivityLogSchema.index({ user: 1 });
ActivityLogSchema.index({ createdAt: -1 });

module.exports = mongoose.model("ActivityLog", ActivityLogSchema);
