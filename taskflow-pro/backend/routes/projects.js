import express from "express";
import pool from "../models/database.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Get all projects for user
router.get("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `
      SELECT p.*, 
             COUNT(t.id) as task_count,
             COUNT(t.id) FILTER (WHERE t.status = 'completed') as completed_tasks
      FROM projects p
      LEFT JOIN project_members pm ON p.id = pm.project_id
      LEFT JOIN tasks t ON p.id = t.project_id
      WHERE pm.user_id = $1
      GROUP BY p.id
      ORDER BY p.created_at DESC
    `,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Internal server error" });
  }g
});

// Get single project with details
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const projectId = req.params.id;
    const userId = req.user.id;

    // Check if user has access to project
    const memberCheck = await pool.query(
      "SELECT * FROM project_members WHERE project_id = $1 AND user_id = $2",
      [projectId, userId]
    );

    if (memberCheck.rows.length === 0) {
      return res.status(403).json({ error: "Access denied" });
    }

    const projectResult = await pool.query(
      "SELECT * FROM projects WHERE id = $1",
      [projectId]
    );

    const membersResult = await pool.query(
      `
      SELECT u.id, u.name, u.email, u.avatar_url, pm.role
      FROM project_members pm
      JOIN users u ON pm.user_id = u.id
      WHERE pm.project_id = $1
    `,
      [projectId]
    );

    const tasksResult = await pool.query(
      `
      SELECT t.*, u.name as assigned_name, u.avatar_url as assigned_avatar
      FROM tasks t
      LEFT JOIN users u ON t.assigned_to = u.id
      WHERE t.project_id = $1
      ORDER BY t.position ASC
    `,
      [projectId]
    );

    res.json({
      ...projectResult.rows[0],
      members: membersResult.rows,
      tasks: tasksResult.rows,
    });
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create new project
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { name, description, start_date, end_date, color } = req.body;
    const userId = req.user.id;

    const result = await pool.query(
      `INSERT INTO projects (name, description, start_date, end_date, color, created_by)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [name, description, start_date, end_date, color, userId]
    );

    // Add creator as project admin
    await pool.query(
      "INSERT INTO project_members (project_id, user_id, role) VALUES ($1, $2, $3)",
      [result.rows[0].id, userId, "admin"]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
