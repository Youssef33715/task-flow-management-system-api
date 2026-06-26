const mongoose = require("mongoose");

const FileAttachmentSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
      trim: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      required: true,
      enum: ["pdf", "docx", "jpg", "jpeg", "png"],
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fileSize: {
      type: Number,
    },
  },
  { timestamps: true },
);
FileAttachmentSchema.index({ task: 1 });

const FileAttachment = mongoose.model("FileAttachment", FileAttachmentSchema);
module.exports = FileAttachment;
