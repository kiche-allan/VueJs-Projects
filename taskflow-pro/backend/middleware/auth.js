import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Access token required" });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ error: "JWT secret not configured" });
    }

    const decoded = jwt.verify(token, secret);
    req.user = { id: decoded.id, email: decoded.email, name: decoded.name };
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
