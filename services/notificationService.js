const asyncHandler = require("express-async-handler");
const Notification = require("../models/notificationModel");
const factory = require("./handlersFactory");

exports.getNotifications = factory.getAll(Notification);
/////////////
exports.getNotification = factory.getOne(Notification);
////////
exports.deleteNotification = factory.deleteOne(Notification);
//////////
//(Helper Function)
exports.createNotification = async ({ user, title, message }) => {
  return await Notification.create({
    user,
    title,
    message,
  });
};
///////////////
exports.getMyNotifications = asyncHandler(async (req, res) => {
  console.log("Current User => ", req.user._id);

  const notifications = await Notification.find({
    user: req.user._id,
  }).sort("-createdAt");

  console.log("Notifications => ", notifications);

  res.status(200).json({
    results: notifications.length,
    data: notifications,
  });
});
/////////
exports.markAsRead = asyncHandler(async (req, res, next) => {
  const notification = await Notification.findById(req.params.id);

  if (!notification) {
    return next(
      new ApiError(`No Notification for this id ${req.params.id}`, 404),
    );
  }
  if (notification.user.toString() !== req.user._id.toString()) {
    return next(
      new ApiError("You are not authorized to access this notification", 403),
    );
  }
  notification.isRead = true;

  await notification.save();

  res.status(200).json({
    message: "Notification marked as read",
    data: notification,
  });
});
