const express = require("express");
const router = express.Router();
const connection = require("../db-context/db");
const dayjs = require("dayjs");
const isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
dayjs.extend(isSameOrBefore);
// GET all bookings
router.get("/bookings", async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT * FROM booking");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).send("Server error");
  }
});

// GET booking by ID
router.get("/bookings/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await connection.query(
      "SELECT * FROM booking WHERE id = ?",
      [id]
    );
    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).send("Server error");
  }
});

// CREATE a new booking
router.post("/bookings", async (req, res) => {
  const {
    bookingName,
    userIdBooking,
    bookingPhone,
    checkInDate,
    checkOutDate,
    bookingRoomId,
    bookingStatus,
    paymentStatus,
    paymentMethod,
    surcharge,
    totalFee,
  } = req.body;
  try {
    const [result] = await connection.query(
      `INSERT INTO booking 
      (bookingName, userIdBooking, bookingPhone, checkInDate, checkOutDate, 
      bookingRoomId, bookingStatus, paymentStatus, paymentMethod, surcharge, totalFee) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        bookingName,
        userIdBooking,
        bookingPhone,
        checkInDate,
        checkOutDate,
        bookingRoomId,
        bookingStatus,
        paymentStatus,
        paymentMethod,
        surcharge,
        totalFee,
      ]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).send("Server error");
  }
});

// UPDATE a booking
router.put("/bookings/:id", async (req, res) => {
  const { id } = req.params;
  const {
    bookingName,
    userIdBooking,
    bookingPhone,
    checkInDate,
    checkOutDate,
    bookingRoomId,
    bookingStatus,
    paymentStatus,
    paymentMethod,
    surcharge,
    totalFee,
  } = req.body;
  try {
    await connection.query(
      `UPDATE booking 
      SET bookingName = ?, userIdBooking = ?, bookingPhone = ?, checkInDate = ?, 
      checkOutDate = ?, bookingRoomId = ?, bookingStatus = ?, paymentStatus = ?, 
      paymentMethod = ?, surcharge = ?, totalFee = ?
      WHERE id = ?`,
      [
        bookingName,
        userIdBooking,
        bookingPhone,
        checkInDate,
        checkOutDate,
        bookingRoomId,
        bookingStatus,
        paymentStatus,
        paymentMethod,
        surcharge,
        totalFee,
        id,
      ]
    );
    res.status(200).send("Booking updated successfully");
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).send("Server error");
  }
});

// DELETE a booking
router.delete("/bookings/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await connection.query("DELETE FROM booking WHERE id = ?", [id]);
    res.status(200).send("Booking deleted successfully");
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).send("Server error");
  }
});

// add new booking user
router.post("/bookings/status", async (req, res) => {
  const {
    bookingName,
    userIdBooking,
    bookingPhone,
    checkInDate,
    checkOutDate,
    bookingRoomId,
    bookingStatus,
    paymentStatus,
    paymentMethod,
    surcharge,
    totalFee,
    email,
    score,
  } = req.body.orderDetails;

  if (!req.body.orderDetails || req.body.orderDetails.length === 0) {
    return res.status(500).json({
      EM: `Lỗi khi thống kê doanh thu`,
      EC: 500,
      DT: [],
    });
  }

  const now = dayjs();
  const checkIn = dayjs(checkInDate);
  // try {
  const [rows1] = await connection.query(
    "SELECT * FROM booking where checkInDate = ? and checkOutDate and bookingRoomId = ?",
    [checkInDate, checkOutDate, bookingRoomId]
  );

  console.log(rows1.length);

  if (rows1.length === 0) {
    await connection.query(
      `INSERT INTO booking 
        (bookingName, userIdBooking, bookingPhone, checkInDate, checkOutDate, 
        bookingRoomId, bookingStatus, paymentStatus, paymentMethod, surcharge, totalFee) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        bookingName,
        userIdBooking,
        bookingPhone,
        checkInDate,
        checkOutDate,
        bookingRoomId,
        bookingStatus,
        paymentStatus,
        paymentMethod,
        surcharge,
        totalFee,
      ]
    );

    console.log("checkingGGGG:", dayjs(now).isSame(dayjs(checkInDate), "day"));
    console.log("checkingGGGádasdaddG:", now);
    const [rows] = await connection.query(
      "SELECT * FROM booking where bookingRoomId = ? and checkInDate = ?",
      [bookingRoomId, checkInDate]
    );
    if (rows.length > 0) {
      if (
        rows[0].paymentMethod === 1 &&
        (now.isBefore(checkInDate) ||
          dayjs(now).isSame(dayjs(checkInDate), "day"))
      ) {
        await connection.query(
          "UPDATE rooms SET statusRooms = 1, updatedDate = NOW() WHERE id = ?",
          [bookingRoomId]
        );
      }
      if (rows[0].paymentMethod === 0 && now.isBefore(checkInDate)) {
        await connection.query(
          "UPDATE rooms SET statusRooms = 1, updatedDate = NOW() WHERE id = ?",
          [bookingRoomId]
        );
      }
      if (
        rows[0].paymentMethod === 0 &&
        dayjs(now).isSame(dayjs(checkInDate), "day")
      ) {
        await connection.query(
          "UPDATE rooms SET statusRooms = 3, updatedDate = NOW() WHERE id = ?",
          [bookingRoomId]
        );
      }
      return res.status(200).json({
        EM: `thành công`,
        EC: 200,
        DT: [],
      });
    }
  }
  res.status(500).send("Không tìm thấy phòng này");
  // } catch (error) {
  //   console.error("Error creating booking:", error);
  //   res.status(500).send("Server error");
  // }
});

// GET booking by ID
router.get("/BookingHistory/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await connection.query(
      "SELECT ac.*, b.* FROM booking b JOIN account ac ON ac.id = b.userIdBooking WHERE ac.id = ? ORDER BY b.id DESC",
      [id]
    );
    res.json(rows);
  } catch (error) {
    console.error("Error fetching Booking History:", error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
