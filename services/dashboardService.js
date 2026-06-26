const asyncHandler = require("express-async-handler");

const Workspace = require("../models/workspaceModel");
const Project = require("../models/projectModel");
const Task = require("../models/taskModel");
const ActivityLog = require("../models/activityLogModel");

exports.getDashboardStats = asyncHandler(async (req, res) => {
  const totalWorkspaces = await Workspace.countDocuments();

  const totalProjects = await Project.countDocuments();

  const totalTasks = await Task.countDocuments();

  const completedTasks = await Task.countDocuments({
    status: "done",
  });

  const pendingTasks = await Task.countDocuments({
    status: { $ne: "done" },
  });
  const overdueTasks = await Task.countDocuments({
    dueDate: { $lt: new Date() },
    status: { $ne: "done" },
  });
  const recentActivities = await ActivityLog.find()
    .populate("user", "name email")
    .sort("-createdAt")
    .limit(5);
  const tasksByStatus = await Task.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);
  const tasksByPriority = await Task.aggregate([
    {
      $group: {
        _id: "$priority",
        count: { $sum: 1 },
      },
    },
  ]);
  res.status(200).json({
    totalWorkspaces,
    totalProjects,
    totalTasks,
    completedTasks,
    pendingTasks,
    overdueTasks,
    recentActivities,
    tasksByStatus,
    tasksByPriority,
  });
});
