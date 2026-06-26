const express = require("express");

const {
  getCommentValidator,
  createCommentValidator,
  updateCommentValidator,
  deleteCommentValidator,
} = require("../utils/validators/commentValidator");

const authenService = require("../services/authService");

const {
  getComments,
  getComment,
  updateComment,
  deleteComment,
  createComment,
  setTaskAndUserId,
  createFilterObj,
} = require("../services/commentService");

const router = express.Router({ mergeParams: true });

// Routes
router
  .route("/")
  .get(authenService.protect, createFilterObj, getComments)
  .post(
    authenService.protect,
    authenService.allowedTo("admin", "manager", "member"),
    setTaskAndUserId,
    createCommentValidator,
    createComment,
  );

router
  .route("/:id")
  .get(authenService.protect, getCommentValidator, getComment)
  .put(
    authenService.protect,
    authenService.allowedTo("admin", "manager", "member"),
    updateCommentValidator,
    updateComment,
  )
  .delete(
    authenService.protect,
    authenService.allowedTo("admin", "manager", "member"),
    deleteCommentValidator,
    deleteComment,
  );

module.exports = router;
