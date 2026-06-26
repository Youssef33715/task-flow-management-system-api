const { check } = require("express-validator");

const validatorMiddleware = require("../../middlewares/validatorsMiddleware");

exports.getNotificationValidator = [
  check("id").isMongoId().withMessage("Invalid Notification id format"),

  validatorMiddleware,
];
exports.deleteNotificationValidator = [
  check("id").isMongoId().withMessage("Invalid Notification id format"),

  validatorMiddleware,
];
