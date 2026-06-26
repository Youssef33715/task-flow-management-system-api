const { check } = require("express-validator");

const validatorMiddleware = require("../../middlewares/validatorsMiddleware");

exports.getCommentValidator = [
  // 1- rules
  check("id").isMongoId().withMessage(" invalid Comment  id format"),
  validatorMiddleware,
];
/////
exports.createCommentValidator = [
  check("content")
    .notEmpty()
    .withMessage("content required")
    .isLength({ min: 3 })
    .withMessage("Too short comment content")
    .isLength({ max: 1000 })
    .withMessage("Too long comment content"),
  check("task")
    .notEmpty()
    .withMessage("task is required")
    .isMongoId()
    .withMessage("task invalid id format"),

  validatorMiddleware,
];
/////
exports.updateCommentValidator = [
  check("id").isMongoId().withMessage("Invalid Comment id format"),
  check("content")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Too short content name")
    .isLength({ max: 1000 })
    .withMessage("Too long content name"),

  validatorMiddleware,
];
/////
exports.deleteCommentValidator = [
  check("id").isMongoId().withMessage("Invalid content id format"),
  validatorMiddleware,
];
////////
exports.getTaskCommentValidator = [
  check("taskId").isMongoId().withMessage("Invalid task id format"),
  validatorMiddleware,
];
