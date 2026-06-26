const ActivityLog = require("../models/activityLogModel");

exports.createActivityLog = async ({
  action,
  user,
  workspace,
  description,
}) => {
  return await ActivityLog.create({
    action,
    user,
    workspace,
    description,
  });
};
