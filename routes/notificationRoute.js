const express = require("express");

const {
  getNotificationValidator,
  deleteNotificationValidator,
} = require("../utils/validators/notificationValidator");

const authenService = require("../services/authService");

const {
  getNotifications,
  getNotification,
  deleteNotification,
  getMyNotifications,
  markAsRead,
} = require("../services/notificationService");

const router = express.Router();

// My Notifications
router.get("/my-notifications", authenService.protect, getMyNotifications);

// Mark Notification As Read
router.put(
  "/:id/read",
  authenService.protect,
  getNotificationValidator,
  markAsRead,
);

// Routes
router
  .route("/")
  .get(
    authenService.protect,
    authenService.allowedTo("admin"),
    getNotifications,
  );

router
  .route("/:id")
  .get(authenService.protect, getNotificationValidator, getNotification)
  .delete(
    authenService.protect,
    deleteNotificationValidator,
    deleteNotification,
  );

module.exports = router;
