const express = require("express");

const authenService = require("../services/authService");

const { getDashboardStats } = require("../services/dashboardService");

const router = express.Router();

router.get(
  "/stats",
  authenService.protect,
  authenService.allowedTo("admin", "manager"),
  getDashboardStats,
);

module.exports = router;
