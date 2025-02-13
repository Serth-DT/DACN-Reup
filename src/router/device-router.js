const express = require("express");
const router = express.Router();
const connection = require("../db-context/db");

// GET all devices
router.get("/devices", async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT * FROM device");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching devices:", error);
    res.status(500).send("Server error");
  }
});

router.get("/hotel/devices", async (req, res) => {
  try {
    const [rows] = await connection.query(`
      SELECT h.id hotelId, h.name hotelName, r.id roomsId, r.name roomsName, dv.* FROM device dv
      JOIN room_device rd on rd.deviceId = dv.deviceId
      JOIN rooms r ON r.id = rd.roomId
      JOIN hotel h ON h.id = r.hotelId`);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching devices:", error);
    res.status(500).send("Server error");
  }
});

// GET device by ID
router.get("/devices/:deviceId", async (req, res) => {
  const { deviceId } = req.params;
  try {
    const [rows] = await connection.query(
      "SELECT * FROM device WHERE deviceId = ?",
      [deviceId]
    );
    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching device:", error);
    res.status(500).send("Server error");
  }
});

// CREATE a new device
router.post("/devices", async (req, res) => {
  const { deviceName, deviceType, status, purchaseDate, warrantyPeriod } =
    req.body;
  try {
    const [result] = await connection.query(
      "INSERT INTO device ( deviceName, deviceType, status, purchaseDate, warrantyPeriod) VALUES ( ?, ?, ?, ?, ?)",
      [deviceName, deviceType, status, purchaseDate, warrantyPeriod]
    );
    res.status(201).json({
      deviceId: result.insertId,
      deviceName,
      deviceType,
      status,
      purchaseDate,
      warrantyPeriod,
    });
  } catch (error) {
    console.error("Error creating device:", error);
    res.status(500).send("Server error");
  }
});

// UPDATE a device
router.put("/devices/:deviceId", async (req, res) => {
  const { deviceId } = req.params;
  const { deviceName, deviceType, status, purchaseDate, warrantyPeriod } =
    req.body;
  try {
    await connection.query(
      "UPDATE device SET deviceName = ?, deviceType = ?, status = ?, purchaseDate = ?, warrantyPeriod = ? WHERE deviceId = ?",
      [deviceName, deviceType, status, purchaseDate, warrantyPeriod, deviceId]
    );
    res.status(200).send("Device updated successfully");
  } catch (error) {
    console.error("Error updating device:", error);
    res.status(500).send("Server error");
  }
});

// DELETE a device
router.delete("/devices/:deviceId", async (req, res) => {
  const { deviceId } = req.params;
  try {
    await connection.query("DELETE FROM device WHERE deviceId = ?", [deviceId]);
    res.status(200).send("Device deleted successfully");
  } catch (error) {
    console.error("Error deleting device:", error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
