const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

const factory = require("./handlersFactory");
const Task = require("../models/taskModel");
const { createActivityLog } = require("./activityLogService");
const { createNotification } = require("./notificationService");

const User = require("../models/userModel");
const Project = require("../models/projectModel");
const WorkspaceMember = require("../models/workspaceMemberModel");

exports.setCreatedBy = (req, res, next) => {
  req.body.createdBy = req.user._id;
  next();
};

//@ desc Get list of Task
//@ route Get /api/v1/task
// @acess piblic
exports.getTasks = factory.getAll(Task);
////////////////////////////////////////////
// @desc Get Specific task by id
// @route Get /api/v1/task/:id
// @access public
exports.getTask = factory.getOne(Task, [
  { path: "project", select: "title status" },
  { path: "createdBy", select: "name email" },
  { path: "assignedTo", select: "name email" },
]);

//@desc createtask
//@route post /api/v1/task
//@access private///manager
exports.createTask = asyncHandler(async (req, res) => {
  const task = await Task.create(req.body);

  const project = await Project.findById(task.project);

  await createActivityLog({
    action: "CREATE_TASK",
    user: req.user._id,
    workspace: project.workspace,
    description: `${req.user.email} created task ${task.title}`,
  });

  res.status(201).json({
    data: task,
  });
});
/////////////////////////////////////////
//@desc Update specific task
//@route Put /api/v1/task/:id
//@access private/manager
exports.updateTask = factory.updateOne(Task);

////////////////////////////////////////////////
//@desc Delete specific Task
//@route Delete /api/v1/Task/:id
//@access private/manager
exports.deleteTask = factory.deleteOne(Task);
////////////////////////////
//@desc GetMyTasks
//@route get /api/v1/Task
//@access private/memeber

exports.getMyTasks = asyncHandler(async (req, res) => {
  const Tasks = await Task.find({
    assignedTo: req.user._id,
  })
    .populate("project", "title status")
    .populate("createdBy", "name avatar")
    .sort("-createdAt");

  res.status(200).json({
    results: Tasks.length,
    data: Tasks,
  });
});
///////////////////////
//@desc assignTask
//@route put /api/v1/Tasks/:id/assign
//body:assignedTo:"User_id"
//@access private/manager
exports.assignTask = asyncHandler(async (req, res, next) => {
  // Find The Task from Database
  const task = await Task.findById(req.params.id);
  if (!task) {
    return next(new ApiError(`No Task for this id ${req.params.id}`, 404));
  }
  // Find User
  const user = await User.findById(req.body.assignedTo);
  if (!user) {
    return next(new ApiError(`User Not Found`, 404));
  }
  /////////////
  const project = await Project.findById(task.project);
  if (!project) {
    return next(new ApiError("Project not found", 404));
  }

  const member = await WorkspaceMember.findOne({
    workspace: project.workspace,
    user: user._id,
  });

  if (!member) {
    return next(new ApiError("User is not a member of this workspace", 400));
  }
  // 3) Assign Task
  task.assignedTo = user._id;

  // 4) Save
  await task.save();
  await createNotification({
    user: user._id,
    title: "New Task Assigned",
    message: `You have been assigned task: ${task.title}`,
  });
  await createActivityLog({
    action: "ASSIGN_TASK",
    user: req.user._id,
    workspace: project.workspace,
    description: `${req.user.email} assigned task ${task.title} to ${user.email}`,
  });

  res.status(200).json({
    message: "Task assigned successfully",
    data: task,
  });
});
///////
//@desc changeTaskStatus
//@route PUT /tasks/:id/status
//body:{"status": "done"}
//@access private/manager
exports.changeTaskStatus = asyncHandler(async (req, res, next) => {
  //1) Get the Task
  const task = await Task.findById(req.params.id);
  if (!task) {
    return next(new ApiError(`No Task for this id ${req.params.id}`, 404));
  }
  //2)ChangeStatus
  task.status = req.body.status;
  //3) Save
  await task.save();
  await createNotification({
    user: task.createdBy,
    title: "Task Status Updated",
    message: `${req.user.name} changed status of ${task.title} to ${task.status}`,
  });
  const project = await Project.findById(task.project);

  await createActivityLog({
    action: "CHANGE_TASK_STATUS",
    user: req.user._id,
    workspace: project.workspace,
    description: `${req.user.email} changed task ${task.title} status to ${task.status}`,
  });
  //Response
  res.status(200).json({
    message: "Task Status updated",
    data: task,
  });
});
