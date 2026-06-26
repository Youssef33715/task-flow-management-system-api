const { check } = require("express-validator");

const validatorMiddleware = require("../../middlewares/validatorsMiddleware");

exports.getProjectValidator = [
  // 1- rules
  check("id").isMongoId().withMessage(" invalid Project  id format"),
  validatorMiddleware,
];
/////
exports.createProjectValidator = [
  check("title")
    .notEmpty()
    .withMessage("title required")
    .isLength({ min: 3 })
    .withMessage("Too short Project title")
    .isLength({ max: 32 })
    .withMessage("Too long Project title"),
  check("workspace")
    .notEmpty()
    .withMessage("Workspace is required")
    .isMongoId()
    .withMessage("Invalid Workspace id format"),

  check("description")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Description is too long"),
  check("status")
    .optional()
    .isIn(["planning", "active", "completed", "cancelled"])
    .withMessage("Invalid project status"),

  validatorMiddleware,
];
/////
exports.updateProjectValidator = [
  check("id").isMongoId().withMessage("Invalid Project id format"),
  check("title")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Too short title name")
    .isLength({ max: 32 })
    .withMessage("Too long title name"),

  check("status")
    .optional()
    .isIn(["planning", "active", "completed", "cancelled"])
    .withMessage("Invalid project status"),

  check("description")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Description is too long"),

  validatorMiddleware,
];
/////
exports.deleteProjectValidator = [
  check("id").isMongoId().withMessage("Invalid Project id format"),
  validatorMiddleware,
];
