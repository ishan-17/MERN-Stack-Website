const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Please enter email address" });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(403)
        .json({ message: "User with this email address already exists" });
    }
    const user = await User.create({ email });
    await user.save();
    return res.json({ message: "User Signup Success", data: user });
  } catch (error) {
    console.log("error", error);
    return res
      .status(500)
      .json({ message: error.message, status: error.status });
  }
});

router.post("/user-details", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Please enter email address" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(403).json({ message: "User does not exist" });
    }
    return res.json({
      message: "User details fetched successfully",
      data: user,
    });
  } catch (error) {
    console.log("error", error);
    return res
      .status(500)
      .json({ message: error.message, status: error.status });
  }
});

module.exports = router;
