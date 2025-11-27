import express from "express";
import pool from "../models/database.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Get all users
router.get("/", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email, avatar_url, role FROM users"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
