//Routes
const authRoute = require("./authRoute");
const workSpaceRoute = require("./workspaceRoute");
const workSpaceMemberRoute = require("./workspaceMemberRoute");
const projectRoute = require("./projectRoute");
const TaskRoute = require("./taskRoute");
const notificationRoute = require("./notificationRoute");
const dashboardRoute = require("./dashboardRoute");

const mountRoutes = (app) => {
  //Mount Routes
  app.use("/api/v1/auth", authRoute);
  app.use("/api/v1/workspaces", workSpaceRoute);
  app.use("/api/v1/workspacesMember", workSpaceMemberRoute);
  app.use("/api/v1/project", projectRoute);
  app.use("/api/v1/task", TaskRoute);
  app.use("/api/v1/notifications", notificationRoute);
  app.use("/api/v1/dashboard", dashboardRoute);
};
module.exports = mountRoutes;
