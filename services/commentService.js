const asyncHandler = require("express-async-handler");

const factory = require("./handlersFactory");
const Task = require("../models/taskModel");

const Comment = require("../models/commentModel");
const Project = require("../models/projectModel");
const { createActivityLog } = require("./activityLogService");
const { createNotification } = require("./notificationService");
//@ desc Get list of comment
//@ route Get /api/v1/commnet
// @acess piblic
exports.getComments = factory.getAll(Comment, [
  { path: "createdBy", select: "name email" },
  { path: "task", select: "title status" },
]);
////////////////////////////////////////////
// @desc Get Specific Comment by id
// @route Get /api/v1/Comment/:id
// @access public
exports.getComment = factory.getOne(Comment, [
  { path: "createdBy", select: "name email" },
  { path: "task", select: "title status" },
]);
////////////
//NestedRoute
//POST /api/v1/tasks/:taskId/comments
exports.setTaskAndUserId = (req, res, next) => {
  if (!req.body.task) req.body.task = req.params.taskId;

  req.body.createdBy = req.user._id;
  next();
};

//@desc createComment
//@route post /api/v1/Comment
//@access private
exports.createComment = asyncHandler(async (req, res) => {
  const comment = await Comment.create(req.body);

  const task = await Task.findById(comment.task);

  const project = await Project.findById(task.project);

  if (
    task.assignedTo &&
    task.assignedTo.toString() !== req.user._id.toString()
  ) {
    await createNotification({
      user: task.assignedTo,
      title: "New Comment",
      message: `${req.user.name} commented on task ${task.title}`,
    });
  }
  await createActivityLog({
    action: "CREATE_COMMENT",
    user: req.user._id,
    workspace: project.workspace,
    description: `${req.user.email} added comment on task ${task.title}`,
  });

  res.status(201).json({
    data: comment,
  });
});
/////////////////////////////////////////
//@desc Update specific Comment
//@route Put /api/v1/Comment/:id
//@access private
exports.updateComment = factory.updateOne(Comment);

////////////////////////////////////////////////
//@desc Delete specific Comment
//@route Delete /api/v1/Comment/:id
//@access private
exports.deleteComment = factory.deleteOne(Comment);
////////////
exports.createFilterObj = (req, res, next) => {
  let filter = {};

  if (req.params.taskId) {
    filter = { task: req.params.taskId };
  }

  req.filterObj = filter;
  next();
};
