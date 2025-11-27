import express from "express";

const router = express.Router();

// Placeholder auth routes
router.post("/login", async (req, res) => {
  res.json({ message: "Login endpoint - implement authentication" });
});

router.post("/register", async (req, res) => {
  res.json({ message: "Register endpoint - implement authentication" });
});

export default router;
