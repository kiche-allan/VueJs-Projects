import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

const DB_USER = process.env.DB_USER || "postgres";
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_NAME = process.env.DB_NAME || "taskflow_pro";
const DB_PASSWORD = process.env.DB_PASSWORD || "password";
const DB_PORT = Number(process.env.DB_PORT || 5432);

const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT,
});

// Ensure target database exists (connects to 'postgres' default DB first)
const ensureDatabaseExists = async () => {
  const adminPool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: "postgres",
    password: DB_PASSWORD,
    port: DB_PORT,
  });
  try {
    const check = await adminPool.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [DB_NAME]
    );
    if (check.rowCount === 0) {
      await adminPool.query(`CREATE DATABASE ${DB_NAME}`);
      console.log(`✅ Database '${DB_NAME}' created`);
    }
  } finally {
    await adminPool.end();
  }
};

// Initialize database tables
export const initDB = async () => {
  try {
    // Create DB if missing
    await ensureDatabaseExists();

    // Users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        avatar_url VARCHAR(500),
        role VARCHAR(50) DEFAULT 'member',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Projects table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        status VARCHAR(50) DEFAULT 'active',
        progress INTEGER DEFAULT 0,
        start_date DATE,
        end_date DATE,
        color VARCHAR(7) DEFAULT '#3b82f6',
        created_by INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Project members table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS project_members (
        id SERIAL PRIMARY KEY,
        project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        role VARCHAR(50) DEFAULT 'member',
        joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(project_id, user_id)
      )
    `);

    // Tasks table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(500) NOT NULL,
        description TEXT,
        status VARCHAR(50) DEFAULT 'todo',
        priority VARCHAR(20) DEFAULT 'medium',
        due_date DATE,
        estimated_hours DECIMAL(5,2),
        actual_hours DECIMAL(5,2),
        position INTEGER DEFAULT 0,
        project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
        assigned_to INTEGER REFERENCES users(id),
        created_by INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Task comments table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS task_comments (
        id SERIAL PRIMARY KEY,
        content TEXT NOT NULL,
        task_id INTEGER REFERENCES tasks(id) ON DELETE CASCADE,
        user_id INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log("✅ Database tables initialized successfully");
  } catch (error) {
    console.error("❌ Database initialization failed:", error);
    throw error;
  }
};

export default pool;
