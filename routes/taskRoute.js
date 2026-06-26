const commentRoute = require("./commentRoute");
const FileAttachmentRoute = require("./fileAttachmentRoute");
const express = require("express");
const {
  getTaskValidator,
  createTaskValidator,
  updateTaskValidator,
  deleteTaskValidator,
  assignTaskValidator,
  changeStatusValidator,
} = require("../utils/validators/taskValidator");

const authenService = require("../services/authService");

const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  setCreatedBy,
  getMyTasks,
  assignTask,
  changeTaskStatus,
} = require("../services/taskService");

const router = express.Router();
///Nested route
router.use("/:taskId/comments", commentRoute);
router.use("/:taskId/files", FileAttachmentRoute);

// Routes
router.get(
  "/my-tasks",
  authenService.protect,
  authenService.allowedTo("member", "manager"),
  getMyTasks,
);
router
  .route("/")
  .get(authenService.protect, getTasks)
  .post(
    authenService.protect,
    authenService.allowedTo("admin", "manager"),
    setCreatedBy,
    createTaskValidator,
    createTask,
  );
router
  .route("/:id")
  .get(
    authenService.protect,
    authenService.allowedTo("admin", "manager"),
    getTaskValidator,
    getTask,
  )
  .put(
    authenService.protect,
    authenService.allowedTo("admin", "manager"),
    updateTaskValidator,
    updateTask,
  )
  .delete(
    authenService.protect,
    authenService.allowedTo("admin", "manager"),
    deleteTaskValidator,
    deleteTask,
  );
router.put(
  "/:id/assign",
  authenService.protect,
  authenService.allowedTo("admin", "manager"),
  assignTaskValidator,
  assignTask,
);

router.put(
  "/:id/status",
  authenService.protect,
  authenService.allowedTo("member", "manager", "admin"),
  changeStatusValidator,
  changeTaskStatus,
);

module.exports = router;
