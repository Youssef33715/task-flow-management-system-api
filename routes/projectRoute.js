const express = require("express");
const {
  getProjectValidator,
  createProjectValidator,
  updateProjectValidator,
  deleteProjectValidator,
} = require("../utils/validators/projectValidator");

const authenService = require("../services/authService");

const {
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  createProject,
  setCreatedBy,
} = require("../services/projectService");

const router = express.Router();

// Routes
router
  .route("/")
  .get(authenService.protect, getProjects)
  .post(
    authenService.protect,
    authenService.allowedTo("admin", "manager"),
    setCreatedBy,
    createProjectValidator,
    createProject,
  );
router
  .route("/:id")
  .get(authenService.protect, getProjectValidator, getProject)
  .put(
    authenService.protect,
    authenService.allowedTo("admin", "manager"),
    updateProjectValidator,
    updateProject,
  )
  .delete(
    authenService.protect,
    authenService.allowedTo("admin", "manager"),
    deleteProjectValidator,
    deleteProject,
  );
module.exports = router;
