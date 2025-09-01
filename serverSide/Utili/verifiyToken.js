const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    console.log("req.headers:", req.headers);
    console.log("req.cookies:", req.cookies);

    const authHeader = req.headers.authorization;
    const tokenFromHeader = authHeader && authHeader.split(" ")[1];
    const tokenFromCookie = req.cookies?.token;

    const token = tokenFromHeader || tokenFromCookie;

    console.log("Token received:", token);

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decodedToken = jwt.verify(token, "hdhdhdhdh");
    req.user = decodedToken;

    next();
  } catch (error) {
    console.log("error", error);
    res.status(401).json({ message: "Invalid token" });
  }
};

const verifyUser  = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.role?.toLowerCase() === "user") {
      next();
    } else {
      res.status(403).json({ message: "You are not authorized" });
    }
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role?.toLowerCase() === "admin") {
      next();
    } else {
      res.status(403).json({ message: "You are not authorized" });
    }
  });
};

module.exports = { verifyToken, verifyUser , verifyAdmin };