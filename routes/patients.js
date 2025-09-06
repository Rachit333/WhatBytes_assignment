const express = require("express");
const pool = require("../db");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const { name, age, condition } = req.body;
  const result = await pool.query(
    "INSERT INTO patients (user_id, name, age, condition) VALUES ($1, $2, $3, $4) RETURNING *",
    [req.user.id, name, age, condition]
  );
  res.json(result.rows[0]);
});

router.get("/", auth, async (req, res) => {
  const result = await pool.query("SELECT * FROM patients WHERE user_id = $1", [req.user.id]);
  res.json(result.rows);
});

router.get("/:id", auth, async (req, res) => {
  const result = await pool.query("SELECT * FROM patients WHERE id = $1 AND user_id = $2", [
    req.params.id,
    req.user.id,
  ]);
  res.json(result.rows[0]);
});

router.put("/:id", auth, async (req, res) => {
  const { name, age, condition } = req.body;
  const result = await pool.query(
    "UPDATE patients SET name=$1, age=$2, condition=$3 WHERE id=$4 AND user_id=$5 RETURNING *",
    [name, age, condition, req.params.id, req.user.id]
  );
  res.json(result.rows[0]);
});

router.delete("/:id", auth, async (req, res) => {
  await pool.query("DELETE FROM patients WHERE id=$1 AND user_id=$2", [req.params.id, req.user.id]);
  res.json({ message: "Deleted" });
});

module.exports = router;
