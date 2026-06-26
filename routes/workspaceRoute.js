const express = require("express");
const {
  getWorkspaceValidator,
  createWorkspaceValidator,
  updateWorkspaceValidator,
  deleteWorkspaceValidator,
} = require("../utils/validators/workspaceValidator");

const authenService = require("../services/authService");

const {
  getWorkspaces,
  getWorkspace,
  updateWorkspace,
  deleteWorkspace,
  createWorkspace,
  setCreatedBy,
} = require("../services/workspaceService");

const router = express.Router();

// Routes
router
  .route("/")
  .get(authenService.protect, getWorkspaces)
  .post(
    authenService.protect,
    authenService.allowedTo("admin"),
    setCreatedBy,
    createWorkspaceValidator,
    createWorkspace,
  );
router
  .route("/:id")
  .get(authenService.protect, getWorkspaceValidator, getWorkspace)
  .put(
    authenService.protect,
    authenService.allowedTo("admin"),
    updateWorkspaceValidator,
    updateWorkspace,
  )
  .delete(
    authenService.protect,
    authenService.allowedTo("admin"),
    deleteWorkspaceValidator,
    deleteWorkspace,
  );
module.exports = router;
