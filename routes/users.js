const userRoutes = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

userRoutes.get("/", async (req, res) => {
  const users = await User.find({});
  if (users.length < 1) {
    return res.json({ error: "No users yet" });
  }
  res.send(users);
});

userRoutes.post("/", async (req, res) => {
  const { username, fullname, email, password } = req.body;
  console.log(req.body);
  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }

  const salt = 10;
  const passwordHash = await bcrypt.hash(password, salt);

  const user = new User({
    username,
    fullname,
    email,
    passwordHash,
  });

  const savedUser = await user.save();
  res.status(201).json({
    message: `${savedUser.username} has been successfully registered !`,
  });
});

module.exports = userRoutes;
