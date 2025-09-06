const express = require("express");
const pool = require("../db");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const { name, specialization } = req.body;
  const result = await pool.query(
    "INSERT INTO doctors (name, specialization) VALUES ($1, $2) RETURNING *",
    [name, specialization]
  );
  res.json(result.rows[0]);
});

router.get("/", auth, async (req, res) => {
  const result = await pool.query("SELECT * FROM doctors");
  res.json(result.rows);
});

router.get("/:id", auth, async (req, res) => {
  const result = await pool.query("SELECT * FROM doctors WHERE id=$1", [req.params.id]);
  res.json(result.rows[0]);
});

router.put("/:id", auth, async (req, res) => {
  const { name, specialization } = req.body;
  const result = await pool.query(
    "UPDATE doctors SET name=$1, specialization=$2 WHERE id=$3 RETURNING *",
    [name, specialization, req.params.id]
  );
  res.json(result.rows[0]);
});

router.delete("/:id", auth, async (req, res) => {
  await pool.query("DELETE FROM doctors WHERE id=$1", [req.params.id]);
  res.json({ message: "Deleted" });
});

module.exports = router;
