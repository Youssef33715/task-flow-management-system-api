const express = require("express");
const uploadFile = require("../middlewares/uploadFileMiddleware");
const {
  getFileAttachmentValidator,
  createFileAttachmentValidator,
  updateFileAttachmentValidator,
  deleteFileAttachmentValidator,
} = require("../utils/validators/fileAttachmentValidator");

const authenService = require("../services/authService");

const {
  getFileAttachments,
  getFileAttachment,
  updateFileAttachment,
  deleteFileAttachment,
  createFileAttachment,
  setTaskAndUserId,
  setFileData,
} = require("../services/fileAttachmentService");

const router = express.Router({ mergeParams: true });

// Routes
router
  .route("/")
  .get(authenService.protect, getFileAttachments)
  .post(
    authenService.protect,
    authenService.allowedTo("admin", "manager", "member"),
    uploadFile.uploadSingleFile("file"),
    setFileData,
    setTaskAndUserId,
    createFileAttachmentValidator,
    createFileAttachment,
  );

router
  .route("/:id")
  .get(authenService.protect, getFileAttachmentValidator, getFileAttachment)
  .put(
    authenService.protect,
    authenService.allowedTo("admin", "manager", "member"),
    updateFileAttachmentValidator,
    updateFileAttachment,
  )
  .delete(
    authenService.protect,
    authenService.allowedTo("admin", "manager", "member"),
    uploadFile.uploadSingleFile("file"),
    setFileData,
    deleteFileAttachmentValidator,
    deleteFileAttachment,
  );

module.exports = router;
