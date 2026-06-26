const asyncHandler = require("express-async-handler");

const factory = require("./handlersFactory");
const FileAttachment = require("../models/fileAttachmentModel");
const { createActivityLog } = require("./activityLogService");
const Task = require("../models/taskModel");
const Project = require("../models/projectModel");
//@ desc Get list of FileAttachment
//@ route Get /api/v1/FileAttachment
// @acess piblic
exports.getFileAttachments = factory.getAll(FileAttachment);
////////////////////////////////////////////
// @desc Get Specific  FileAttachment by id
// @route Get /api/v1/FileAttachment/:id
// @access public
exports.getFileAttachment = factory.getOne(FileAttachment);
///////////////
exports.setTaskAndUserId = (req, res, next) => {
  if (!req.body) req.body = {};

  if (!req.body.task) {
    req.body.task = req.params.taskId;
  }
  req.body.uploadedBy = req.user._id;
  next();
};
//@desc createFileAttachment
//@route post /api/v1/FileAttachment
//@access private
exports.createFileAttachment = asyncHandler(async (req, res) => {
  const fileAttachment = await FileAttachment.create(req.body);

  const task = await Task.findById(fileAttachment.task);

  const project = await Project.findById(task.project);

  await createActivityLog({
    action: "UPLOAD_FILE",
    user: req.user._id,
    workspace: project.workspace,
    description: `${req.user.email} uploaded file ${fileAttachment.fileName} to task ${task.title}`,
  });

  res.status(201).json({
    data: fileAttachment,
  });
});
/////////////////////////////////////////
//@desc Update specific FileAttachment
//@route Put /api/v1/FileAttachment/:id
//@access private
exports.updateFileAttachment = factory.updateOne(FileAttachment);

////////////////////////////////////////////////
//@desc Delete specific FileAttachment
//@route Delete /api/v1/FileAttachment/:id
//@access private
exports.deleteFileAttachment = factory.deleteOne(FileAttachment);
///////////
exports.setFileData = (req, res, next) => {
  if (req.file) {
    req.body.fileName = req.file.originalname;

    req.body.fileUrl = `uploads/${req.file.originalname}`;

    const extension = req.file.originalname.split(".").pop();

    req.body.fileType = extension.toLowerCase();
  }

  next();
};
