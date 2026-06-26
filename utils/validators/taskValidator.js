const { check } = require("express-validator");

const validatorMiddleware = require("../../middlewares/validatorsMiddleware");
exports.getTaskValidator = [
  check("id").isMongoId().withMessage("Invalid Task id format"),
  validatorMiddleware,
];
/////
exports.createTaskValidator = [
  check("title")
    .notEmpty()
    .withMessage("title required")
    .isLength({ min: 3 })
    .withMessage("Too short Task title")
    .isLength({ max: 100 })
    .withMessage("Too long Task title"),
  check("project")
    .notEmpty()
    .withMessage("project is required")
    .isMongoId()
    .withMessage("Invalid project id format"),

  check("description")
    .optional()
    .isLength({ max: 2000 })
    .withMessage("Description is too long"),
  check("status")
    .optional()
    .isIn(["todo", "in_progress", "review", "done"])
    .withMessage("Invalid Task status"),
  check("priority")
    .optional()
    .isIn(["low", "medium", "high", "critical"])
    .withMessage("Invalid task priority"),
  check("assignedTo")
    .optional()
    .isMongoId()
    .withMessage("Invalid assigned user id format"),
  check("dueDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid due date format"),

  validatorMiddleware,
];
/////
exports.updateTaskValidator = [
  check("id").isMongoId().withMessage("Invalid Task id format"),
  check("title")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Too short title name")
    .isLength({ max: 100 })
    .withMessage("Too long title name"),

  check("status")
    .optional()
    .isIn(["todo", "in_progress", "review", "done"])
    .withMessage("Invalid Task status"),

  check("description")
    .optional()
    .isLength({ max: 2000 })
    .withMessage("Description is too long"),
  check("priority")
    .optional()
    .isIn(["low", "medium", "high", "critical"])
    .withMessage("Invalid task priority"),
  check("assignedTo")
    .optional()
    .isMongoId()
    .withMessage("Invalid assigned user id format"),
  check("dueDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid due date format"),
  validatorMiddleware,
];
/////
exports.deleteTaskValidator = [
  check("id").isMongoId().withMessage("Invalid Task id format"),
  validatorMiddleware,
];
////////////
exports.changeStatusValidator = [
  check("id").isMongoId().withMessage("Invalid Task id format"),
  check("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["todo", "in_progress", "review", "done"])
    .withMessage("Invalid task status"),
  validatorMiddleware,
];
///////////////////

exports.assignTaskValidator = [
  check("id").isMongoId().withMessage("Invalid Task id format"),
  check("assignedTo")
    .notEmpty()
    .withMessage("Assigned user is required")
    .isMongoId()
    .withMessage("Invalid assigned user id format"),
  validatorMiddleware,
];
