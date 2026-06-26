const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dbConnection = require("./config/database");
const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/errorMiddleware");
const mountRoutes = require("./routes/index");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");

dotenv.config({ path: "config.env" });

//connect with db
dbConnection();
//express app
const app = express();

//Middlewares
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(helmet());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use("/api", limiter);
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode:${process.env.NODE_ENV}`);
}
// Mount Routes
mountRoutes(app);

app.get("/", (req, res) => {
  res.json({ message: "TaskFlow API Running" });
});
// Global error handling middleware
app.use(globalError);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
