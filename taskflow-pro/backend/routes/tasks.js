import express from "express";
import pool from "../models/database.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Get all tasks
router.get("/", authenticateToken, async (req, res) => {
  try {
    const { project_id, status, assigned_to } = req.query;
    let query = `
      SELECT t.*, u.name as assigned_name, u.avatar_url as assigned_avatar,
             p.name as project_name
      FROM tasks t
      LEFT JOIN users u ON t.assigned_to = u.id
      LEFT JOIN projects p ON t.project_id = p.id
      WHERE 1=1
    `;
    const params = [];
    let paramCount = 1;

    if (project_id) {
      query += ` AND t.project_id = $${paramCount}`;
      params.push(project_id);
      paramCount++;
    }

    if (status) {
      query += ` AND t.status = $${paramCount}`;
      params.push(status);
      paramCount++;
    }

    if (assigned_to) {
      query += ` AND t.assigned_to = $${paramCount}`;
      params.push(assigned_to);
      paramCount++;
    }

    query += " ORDER BY t.position ASC, t.created_at DESC";

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get single task
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT t.*, u.name as assigned_name, u.avatar_url as assigned_avatar,
              p.name as project_name
       FROM tasks t
       LEFT JOIN users u ON t.assigned_to = u.id
       LEFT JOIN projects p ON t.project_id = p.id
       WHERE t.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Get task comments
    const commentsResult = await pool.query(
      `SELECT tc.*, u.name as user_name, u.avatar_url as user_avatar
       FROM task_comments tc
       JOIN users u ON tc.user_id = u.id
       WHERE tc.task_id = $1
       ORDER BY tc.created_at ASC`,
      [id]
    );

    res.json({
      ...result.rows[0],
      comments: commentsResult.rows,
    });
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create task
router.post("/", authenticateToken, async (req, res) => {
  try {
    const {
      title,
      description,
      status,
      priority,
      project_id,
      assigned_to,
      due_date,
      estimated_hours,
    } = req.body;

    if (!title || !project_id) {
      return res
        .status(400)
        .json({ error: "Title and project_id are required" });
    }

    const result = await pool.query(
      `INSERT INTO tasks (title, description, status, priority, project_id, assigned_to, due_date, estimated_hours, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [
        title,
        description,
        status || "todo",
        priority || "medium",
        project_id,
        assigned_to,
        due_date,
        estimated_hours,
        req.user?.id || 1,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update task
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      status,
      priority,
      assigned_to,
      due_date,
      estimated_hours,
      actual_hours,
      position,
    } = req.body;

    const result = await pool.query(
      `UPDATE tasks
       SET title = COALESCE($1, title),
           description = COALESCE($2, description),
           status = COALESCE($3, status),
           priority = COALESCE($4, priority),
           assigned_to = COALESCE($5, assigned_to),
           due_date = COALESCE($6, due_date),
           estimated_hours = COALESCE($7, estimated_hours),
           actual_hours = COALESCE($8, actual_hours),
           position = COALESCE($9, position),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $10
       RETURNING *`,
      [
        title,
        description,
        status,
        priority,
        assigned_to,
        due_date,
        estimated_hours,
        actual_hours,
        position,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete task
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM tasks WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add comment to task
router.post("/:id/comments", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: "Comment content is required" });
    }

    const result = await pool.query(
      `INSERT INTO task_comments (content, task_id, user_id)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [content, id, req.user?.id || 1]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
