const { check, body } = require("express-validator");

const validatorMiddleware = require("../../middlewares/validatorsMiddleware");

exports.getWorkspaceValidator = [
  // 1- rules
  check("id").isMongoId().withMessage("Workspace  id format"),
  validatorMiddleware,
];
/////
exports.createWorkspaceValidator = [
  check("name")
    .notEmpty()
    .withMessage("Workspace required")
    .isLength({ min: 3 })
    .withMessage("Too short Workspace name")
    .isLength({ max: 32 })
    .withMessage("Too long Workspace name"),
  check("description")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Description is too long"),

  validatorMiddleware,
];
/////
exports.updateWorkspaceValidator = [
  check("id").isMongoId().withMessage("Invalid Workspace id format"),
  check("name")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Too short Workspace name")
    .isLength({ max: 32 })
    .withMessage("Too long Workspace name"),

  validatorMiddleware,
];
/////
exports.deleteWorkspaceValidator = [
  check("id").isMongoId().withMessage("Invalid Workspace id format"),
  validatorMiddleware,
];
