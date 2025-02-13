const express = require("express");
const router = express.Router();
const connection = require("../db-context/db");

// GET all rooms (including services and promotions)
router.get("/rooms", async (req, res) => {
  try {
    const [rooms] = await connection.query(`
      SELECT r.*, h.name as "Hotel_Name" 
      FROM rooms r 
      JOIN hotel h ON h.id = r.hotelId`);

    const roomsWithDetails = await Promise.all(
      rooms.map(async (room) => {
        const [services] = await connection.query(
          "SELECT s.* FROM services s INNER JOIN room_services rs ON s.id = rs.serviceId WHERE rs.roomId = ?",
          [room.id]
        );
        const [promotions] = await connection.query(
          "SELECT p.* FROM promotions p INNER JOIN room_promotions rp ON p.id = rp.promotionId WHERE rp.roomId = ?",
          [room.id]
        );

        const [device] = await connection.query(
          "SELECT p.* FROM device p INNER JOIN room_device rp ON p.deviceId = rp.deviceId WHERE rp.roomId = ?",
          [room.id]
        );

        return {
          ...room,
          services,
          promotions,
          device,
        };
      })
    );

    res.json(roomsWithDetails);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).send("Server error");
  }
});

// GET room by ID (including services and promotions)
router.get("/rooms/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [room] = await connection.query("SELECT * FROM rooms WHERE id = ?", [
      id,
    ]);

    if (!room.length) {
      return res.status(404).send("Room not found");
    }

    const [services] = await connection.query(
      "SELECT s.* FROM services s INNER JOIN room_services rs ON s.id = rs.serviceId WHERE rs.roomId = ?",
      [id]
    );

    const [promotions] = await connection.query(
      "SELECT p.* FROM promotions p INNER JOIN room_promotions rp ON p.id = rp.promotionId WHERE rp.roomId = ?",
      [id]
    );

    const [device] = await connection.query(
      "SELECT p.* FROM device p INNER JOIN room_device rp ON p.deviceId = rp.deviceId WHERE rp.roomId = ?",
      [id]
    );

    res.json({
      ...room[0],
      services,
      promotions,
      device,
    });
  } catch (error) {
    console.error("Error fetching room:", error);
    res.status(500).send("Server error");
  }
});

// CREATE a new room
router.post("/rooms", async (req, res) => {
  const {
    name,
    description,
    image,
    price,
    location,
    roomtypeId,
    hotelId,
    serviceIds,
    promotionIds,
    statusRooms,
    deviceIds,
  } = req.body;
  let newRoomDbConnection; // Đổi tên biến để tránh xung đột
  try {
    newRoomDbConnection = await connection.getConnection(); // Lấy kết nối từ pool
    await newRoomDbConnection.beginTransaction(); // Bắt đầu transaction

    // Thêm phòng mới
    const [result] = await newRoomDbConnection.query(
      "INSERT INTO rooms (name, description, image, price, location, roomtypeId, hotelId, createdDate,statusRooms, updatedDate) VALUES (?, ?, ?, ?, ?,?, ?, NOW(),?,  NOW())",
      [
        name,
        description,
        image,
        price,
        location,
        roomtypeId,
        hotelId,
        statusRooms,
      ]
    );
    const newRoomId = result.insertId;

    // Thêm các dịch vụ
    if (serviceIds && serviceIds.length > 0) {
      const serviceValues = serviceIds.map((serviceId) => [
        newRoomId,
        serviceId,
      ]);
      await newRoomDbConnection.query(
        "INSERT INTO room_services (roomId, serviceId) VALUES ?",
        [serviceValues]
      );
    }

    // Thêm các khuyến mãi
    if (promotionIds && promotionIds.length > 0) {
      const promotionValues = promotionIds.map((promotionId) => [
        newRoomId,
        promotionId,
      ]);
      await newRoomDbConnection.query(
        "INSERT INTO room_promotions (roomId, promotionId) VALUES ?",
        [promotionValues]
      );
    }

    if (deviceIds && deviceIds.length > 0) {
      const deviceValues = deviceIds.map((deviceId) => [newRoomId, deviceId]);
      await newRoomDbConnection.query(
        "INSERT INTO room_device (roomId, deviceId) VALUES ?",
        [deviceValues]
      );
    }

    await newRoomDbConnection.commit(); // Cam kết transaction
    res.status(201).json({
      id: newRoomId,
      name,
      description,
      image,
      price,
      location,
      roomtypeId,
      hotelId,
    });
  } catch (error) {
    if (newRoomDbConnection) {
      await newRoomDbConnection.rollback(); // Rollback nếu có lỗi
    }
    console.error("Error creating room:", error);
    res.status(500).send("Server error");
  } finally {
    if (newRoomDbConnection) {
      newRoomDbConnection.release(); // Giải phóng kết nối
    }
  }
});

// UPDATE a room
router.put("/rooms/:id", async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    image,
    price,
    location,
    roomtypeId,
    hotelId,
    serviceIds,
    promotionIds,
    statusRooms,
    deviceIds,
  } = req.body;
  let updateRoomDbConnection; // Đổi tên biến để tránh xung đột
  try {
    updateRoomDbConnection = await connection.getConnection(); // Lấy kết nối từ pool
    await updateRoomDbConnection.beginTransaction();

    await updateRoomDbConnection.query(
      "UPDATE rooms SET name = ?, description = ?, image = ?, price = ?, location = ?, roomtypeId = ?,statusRooms = ?, hotelId = ?, updatedDate = NOW() WHERE id = ?",
      [
        name,
        description,
        image,
        price,
        location,
        roomtypeId,
        statusRooms,
        hotelId,
        id,
      ]
    );

    await updateRoomDbConnection.query(
      "DELETE FROM room_services WHERE roomId = ?",
      [id]
    );
    if (serviceIds && serviceIds.length > 0) {
      const serviceValues = serviceIds.map((serviceId) => [id, serviceId]);
      await updateRoomDbConnection.query(
        "INSERT INTO room_services (roomId, serviceId) VALUES ?",
        [serviceValues]
      );
    }

    await updateRoomDbConnection.query(
      "DELETE FROM room_device WHERE roomId = ?",
      [id]
    );
    if (deviceIds && deviceIds.length > 0) {
      const deviceValues = deviceIds.map((deviceId) => [id, deviceId]);
      await updateRoomDbConnection.query(
        "INSERT INTO room_device (roomId, deviceId) VALUES ?",
        [deviceValues]
      );
    }

    await updateRoomDbConnection.query(
      "DELETE FROM room_promotions WHERE roomId = ?",
      [id]
    );
    if (promotionIds && promotionIds.length > 0) {
      const promotionValues = promotionIds.map((promotionId) => [
        id,
        promotionId,
      ]);
      await updateRoomDbConnection.query(
        "INSERT INTO room_promotions (roomId, promotionId) VALUES ?",
        [promotionValues]
      );
    }

    await updateRoomDbConnection.commit();
    res.status(200).send("Room updated successfully");
  } catch (error) {
    if (updateRoomDbConnection) {
      await updateRoomDbConnection.rollback(); // Rollback nếu có lỗi
    }
    console.error("Error updating room:", error);
    res.status(500).send("Server error");
  } finally {
    if (updateRoomDbConnection) {
      updateRoomDbConnection.release(); // Giải phóng kết nối
    }
  }
});

router.post("/rooms/changeStatus", async (req, res) => {
  const { id, status } = req.body;
  console.log("ok");
  try {
    const [result] = await connection.query(
      "UPDATE rooms SET statusRooms = ? WHERE id = ?",
      [status, id]
    );
    res.status(201).json({ code: 200, mess: "Success" });
  } catch (error) {
    console.error("Error creating news:", error);
    res.status(500).send("Server error");
  }
});
// DELETE a room (including services and promotions)
router.delete("/rooms/:id", async (req, res) => {
  const { id } = req.params;
  let deleteRoomDbConnection; // Đổi tên biến để tránh xung đột
  try {
    deleteRoomDbConnection = await connection.getConnection(); // Lấy kết nối từ pool
    await deleteRoomDbConnection.beginTransaction();

    await deleteRoomDbConnection.query(
      "DELETE FROM room_services WHERE roomId = ?",
      [id]
    );
    await deleteRoomDbConnection.query(
      "DELETE FROM room_promotions WHERE roomId = ?",
      [id]
    );
    await deleteRoomDbConnection.query("DELETE FROM rooms WHERE id = ?", [id]);

    await deleteRoomDbConnection.commit();
    res.status(200).send("Room and related data deleted successfully");
  } catch (error) {
    if (deleteRoomDbConnection) {
      await deleteRoomDbConnection.rollback(); // Rollback nếu có lỗi
    }
    console.error("Error deleting room:", error);
    res.status(500).send("Server error");
  } finally {
    if (deleteRoomDbConnection) {
      deleteRoomDbConnection.release(); // Giải phóng kết nối
    }
  }
});

module.exports = router;
