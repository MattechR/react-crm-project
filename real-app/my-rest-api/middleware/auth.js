const jwt = require("jsonwebtoken");
const config = require("config");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    const payload = jwt.verify(token, config.get("jwtKey"));
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).send("Invalid token.");
  }
}

module.exports = auth;
