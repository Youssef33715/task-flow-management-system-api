const express = require("express");
const {
  getWorkspaceMemberValidator,
  createWorkspaceMemberValidator,
  updateWorkspaceMemberValidator,
  deleteWorkspaceMemberValidator,
} = require("../utils/validators/workspaceMemberValidator");

const authenService = require("../services/authService");

const {
  getWorkspaceMember,
  getWorkspacesMembers,
  createWorkspaceMember,
  updateWorkspaceMember,
  deleteWorkspaceMember,
} = require("../services/workspaceMemberService");

const router = express.Router();

// Routes
router
  .route("/")
  .get(
    authenService.protect,
    authenService.allowedTo("admin"),
    getWorkspacesMembers,
  )
  .post(
    authenService.protect,
    authenService.allowedTo("admin"),
    createWorkspaceMemberValidator,
    createWorkspaceMember,
  );
router
  .route("/:id")
  .get(authenService.protect, getWorkspaceMemberValidator, getWorkspaceMember)
  .put(
    authenService.protect,
    authenService.allowedTo("admin"),
    updateWorkspaceMemberValidator,
    updateWorkspaceMember,
  )
  .delete(
    authenService.protect,
    authenService.allowedTo("admin"),
    deleteWorkspaceMemberValidator,
    deleteWorkspaceMember,
  );
module.exports = router;
