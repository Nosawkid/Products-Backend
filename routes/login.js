const loginRoutes = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

loginRoutes.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const isValidPassword =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && isValidPassword)) {
    return res.status(400).json({ error: "Invalid Username or Password" });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.JSON_KEY, {
    expiresIn: "24h",
  });
  res.status(200).json({
    token,
    username: user.username,
    fullname: user.fullname,
    id: user._id,
    isAuthenticated: true,
  });
});

module.exports = loginRoutes;
