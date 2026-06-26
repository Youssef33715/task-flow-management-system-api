const { check } = require("express-validator");

const validatorMiddleware = require("../../middlewares/validatorsMiddleware");

exports.getFileAttachmentValidator = [
  check("id").isMongoId().withMessage("Invalid FileAttachment id format"),

  validatorMiddleware,
];

exports.createFileAttachmentValidator = [
  check("task")
    .notEmpty()
    .withMessage("Task is required")
    .isMongoId()
    .withMessage("Invalid task id format"),

  validatorMiddleware,
];

exports.updateFileAttachmentValidator = [
  check("id").isMongoId().withMessage("Invalid FileAttachment id format"),

  validatorMiddleware,
];

exports.deleteFileAttachmentValidator = [
  check("id").isMongoId().withMessage("Invalid FileAttachment id format"),

  validatorMiddleware,
];
