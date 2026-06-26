// =>Authentication && Authorization
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["admin", "manager", "member"],
      default: "member",
    },
    avatar: {
      type: String,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    passwordResetCode: {
      type: String,
      default: null,
    },
    passwordResetExpires: { type: Date, default: null },
    passwordResetVerified: {
      type: Boolean,
      default: false,
    },
    passwordChangedAt: Date,
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  // Hashing user password
  this.password = await bcrypt.hash(this.password, 12);
  //next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
