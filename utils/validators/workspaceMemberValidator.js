const { check } = require("express-validator");

const validatorMiddleware = require("../../middlewares/validatorsMiddleware");

exports.getWorkspaceMemberValidator = [
  // 1- rules
  check("id").isMongoId().withMessage("WorkspaceMember  id format"),
  validatorMiddleware,
];
/////
exports.createWorkspaceMemberValidator = [
  check("workspace")
    .notEmpty()
    .withMessage("Workspace is required")
    .isMongoId()
    .withMessage("Invalid Workspace id format"),
  check("user")
    .notEmpty()
    .withMessage("User is required")
    .isMongoId()
    .withMessage("invalid User id"),
  check("role")
    .optional()
    .isIn(["manager", "member"])
    .withMessage("Invalid role"),

  validatorMiddleware,
];
/////
exports.updateWorkspaceMemberValidator = [
  check("id").isMongoId().withMessage("Invalid WorkspaceMember id format"),
  check("role").optional().isIn(["manager", "member"]),
  validatorMiddleware,
];
/////
exports.deleteWorkspaceMemberValidator = [
  check("id").isMongoId().withMessage("Invalid WorkspaceMember id format"),
  validatorMiddleware,
];
