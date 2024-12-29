const jwt = require("jsonwebtoken");
const User = require("../models/user");

const errorHandler = (err, req, res, next) => {
  console.log("Error Name: ", err.name);
  console.log("Error Message: ", err.message);

  if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }
  if (err.name === "CastError") {
    return res.status(400).json({ error: "Invalid Id" });
  }
  if (
    err.name === "MongoServerError" &&
    err.message.includes("E11000 duplicate key error")
  ) {
    return res.status(400).json({ error: `expected 'username' to be unique` });
  }
};

const unknownEndPoint = (req, res) => {
  res.status(404).json({ error: "Unknown Endpoint" });
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    req.token = authorization.slice(7);
  } else {
    req.token = null;
  }
  next();
};

const userExtractor = async (req, res, next) => {
  const token = req.token;
  if (!token) {
    return res
      .status(404)
      .json({ error: "Token is required for this operation" });
  }

  const decodedToken = jwt.verify(token, process.env.JSON_KEY);
  if (!decodedToken.id) {
    return res.status(404).json({ error: "Invalid Token" });
  }
  console.log(user);
  if (!user) {
    return res.status(400).json({ error: "No user found" });
  }

  req.user = user;
  next();
};

module.exports = {
  errorHandler,
  unknownEndPoint,
  tokenExtractor,
  userExtractor,
};
