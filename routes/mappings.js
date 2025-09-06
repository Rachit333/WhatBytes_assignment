const express = require("express");
const pool = require("../db");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const { patient_id, doctor_id } = req.body;
  const result = await pool.query(
    "INSERT INTO patient_doctor_mappings (patient_id, doctor_id) VALUES ($1, $2) RETURNING *",
    [patient_id, doctor_id]
  );
  res.json(result.rows[0]);
});

router.get("/", auth, async (req, res) => {
  const result = await pool.query("SELECT * FROM patient_doctor_mappings");
  res.json(result.rows);
});

router.get("/:patient_id", auth, async (req, res) => {
  const result = await pool.query(
    "SELECT d.* FROM doctors d JOIN patient_doctor_mappings m ON d.id = m.doctor_id WHERE m.patient_id = $1",
    [req.params.patient_id]
  );
  res.json(result.rows);
});

router.delete("/:id", auth, async (req, res) => {
  await pool.query("DELETE FROM patient_doctor_mappings WHERE id=$1", [req.params.id]);
  res.json({ message: "Deleted" });
});

module.exports = router;
