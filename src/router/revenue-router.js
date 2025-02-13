const express = require("express");
const router = express.Router();
const connection = require("../db-context/db");

router.get("/revenue", async (req, res) => {
  try {
    const [rows] = await connection.query(`SELECT 
    DATE_FORMAT(checkInDate, '%Y-%m') AS bookingMonth, 
    SUM(totalFee) AS totalFeeSum
FROM 
    booking
WHERE 
    bookingStatus = 1
GROUP BY 
    bookingMonth
ORDER BY 
    bookingMonth;

`);

    res.json(rows);
  } catch (err) {
    console.error("Error fetching accounts:", err.message);
    res.status(500).json({ message: err.message });
  }
});

router.get("/roomtop", async (req, res) => {
  try {
    const [rows] = await connection.query(`
       SELECT 
    hotel.id AS hotelId,
    hotel.name AS hotelName,
    COUNT(rooms.roomtypeId) AS totalRoomTypes
FROM 
    booking
JOIN 
    rooms ON booking.bookingRoomId = rooms.id AND booking.bookingStatus = 1
JOIN 
    hotel ON rooms.hotelId = hotel.id
GROUP BY 
    hotel.id, hotel.name
ORDER BY 
    totalRoomTypes DESC
LIMIT 5;

  `);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching accounts:", err.message);
    res.status(500).json({ message: err.message });
  }
});

router.post("/revenuewithday", async (req, res) => {
  try {
    const datecheck = req.body.datecheck; // Nhận ngày từ client
    const [rows] = await connection.query(
      `SELECT 
        DATE_FORMAT(checkInDate, '%Y-%m-%d') AS bookingDay, 
        SUM(totalFee) AS totalFeeSum
      FROM 
        booking
      WHERE 
        bookingStatus = 1 
        AND checkInDate = ?
      GROUP BY 
        bookingDay
      ORDER BY 
        bookingDay;`,
      [datecheck]
    );

    res.json(rows);
  } catch (err) {
    console.error("Error fetching data:", err.message);
    res.status(500).json({ message: err.message });
  }
});

router.post("/revenuewithmonth", async (req, res) => {
  try {
    const monthcheck = req.body.monthcheck; // Nhận tháng từ client
    const [rows] = await connection.query(
      `SELECT 
        DATE_FORMAT(checkInDate, '%Y-%m') AS bookingMonth, 
        SUM(totalFee) AS totalFeeSum
      FROM 
        booking
      WHERE 
        bookingStatus = 1 
        AND DATE_FORMAT(checkInDate, '%Y-%m') = ?
      GROUP BY 
        bookingMonth
      ORDER BY 
        bookingMonth;`,
      [monthcheck]
    );

    res.json(rows);
  } catch (err) {
    console.error("Error fetching data:", err.message);
    res.status(500).json({ message: err.message });
  }
});

router.post("/revenueallwithday", async (req, res) => {
  try {
    const datecheck = req.body.datecheck; // Nhận ngày từ client
    const [rows] = await connection.query(
      `SELECT 
        *
      FROM 
        booking
      WHERE 
      bookingStatus = 1 
        AND checkInDate = ?
      ORDER BY 
        checkInDate;`,
      [datecheck]
    );

    res.json(rows);
  } catch (err) {
    console.error("Error fetching data:", err.message);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
