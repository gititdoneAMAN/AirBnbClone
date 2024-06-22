const jwt = require("jsonwebtoken");
require("dotenv").config();

async function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    const token = authHeader.split(" ")[1]; // Assuming "Bearer <token>"
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        req.user = decoded.username;
        req.id = decoded.id; // Save the decoded user information in the request object
        next();
      } catch (err) {
        console.error(err);
        return res.status(403).json({ msg: "Invalid token" });
      }
    } else {
      return res.status(403).json({ msg: "Token not provided" });
    }
  } else {
    return res.status(403).json({ msg: "Authorization header not found" });
  }
}

module.exports = {
  verifyToken,
};
