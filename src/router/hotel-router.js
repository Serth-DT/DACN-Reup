const express = require("express");
const router = express.Router();
const db = require("../db-context/db");

// Lấy tất cả các khách sạn
router.get("/hotels", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM hotel");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching hotels:", err.message);
    res.status(500).json({ message: err.message });
  }
});

router.get("/hotels/header", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT DISTINCT hotel.location FROM hotel");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching hotels:", err.message);
    res.status(500).json({ message: err.message });
  }
});

router.get("/hotelsFull", async (req, res) => {
  try {
    // Lấy tất cả các khách sạn
    const [hotels] = await db.query("SELECT * FROM hotel");

    // Kết hợp dữ liệu khách sạn với phòng, dịch vụ và khuyến mãi
    const hotelsWithRoomsAndServices = await Promise.all(
      hotels.map(async (hotel) => {
        // Lấy các phòng của khách sạn
        const [rooms] = await db.query(
          "SELECT * FROM rooms WHERE hotelId = ?",
          [hotel.id]
        );

        // Lấy dịch vụ và khuyến mãi cho từng phòng
        const roomsWithDetails = await Promise.all(
          rooms.map(async (room) => {
            // Lấy dịch vụ cho phòng
            const [services] = await db.query(
              "SELECT s.* FROM services s INNER JOIN room_services rs ON s.id = rs.serviceId WHERE rs.roomId = ?",
              [room.id]
            );

            // Lấy khuyến mãi cho phòng
            const [promotions] = await db.query(
              "SELECT p.* FROM promotions p INNER JOIN room_promotions rp ON p.id = rp.promotionId WHERE rp.roomId = ?",
              [room.id]
            );

            return {
              ...room,
              services,
              promotions,
            };
          })
        );

        return {
          ...hotel,
          rooms: roomsWithDetails,
        };
      })
    );

    res.json(hotelsWithRoomsAndServices);
  } catch (err) {
    console.error("Error fetching hotels:", err.message);
    res.status(500).json({ message: err.message });
  }
});

//lấy danh sách hotel chưa đặt
router.get("/hotelsFull/Data", async (req, res) => {
  try {
    // Lấy tất cả các khách sạn
    const [hotels] = await db.query("SELECT * FROM hotel");

    // Kết hợp dữ liệu khách sạn với phòng, dịch vụ và khuyến mãi
    const hotelsWithRoomsAndServices = await Promise.all(
      hotels.map(async (hotel) => {
        // Lấy các phòng của khách sạn
        const [rooms] = await db.query(
          "SELECT * FROM rooms WHERE hotelId = ? and statusRooms = 0",
          [hotel.id]
        );

        // Lấy dịch vụ và khuyến mãi cho từng phòng
        const roomsWithDetails = await Promise.all(
          rooms.map(async (room) => {
            // Lấy dịch vụ cho phòng
            const [services] = await db.query(
              "SELECT s.* FROM services s INNER JOIN room_services rs ON s.id = rs.serviceId WHERE rs.roomId = ?",
              [room.id]
            );

            // Lấy khuyến mãi cho phòng
            const [promotions] = await db.query(
              "SELECT p.* FROM promotions p INNER JOIN room_promotions rp ON p.id = rp.promotionId WHERE rp.roomId = ?",
              [room.id]
            );

            return {
              ...room,
              services,
              promotions,
            };
          })
        );

        return {
          ...hotel,
          rooms: roomsWithDetails,
        };
      })
    );

    res.json(hotelsWithRoomsAndServices);
  } catch (err) {
    console.error("Error fetching hotels:", err.message);
    res.status(500).json({ message: err.message });
  }
});

// Lấy khách sạn theo ID
router.get("/hotels/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query("SELECT * FROM hotel WHERE id = ?", [id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: "Hotel not found" });
    }
  } catch (err) {
    console.error("Error fetching hotel:", err.message);
    res.status(500).json({ message: err.message });
  }
});

// Thêm mới khách sạn
router.post("/hotels", async (req, res) => {
  const {
    name,
    location,
    rating,
    description,
    totalRooms,
    reviewScore,
    image,
  } = req.body;
  const createdDate = new Date();
  const updatedDate = createdDate;

  try {
    const result = await db.query(
      "INSERT INTO hotel (name, location, rating, description, totalRooms, reviewScore, image, createdDate, updatedDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        name,
        location,
        rating,
        description,
        totalRooms,
        reviewScore,
        image,
        createdDate,
        updatedDate,
      ]
    );
    res.status(201).json({ message: "Hotel created", id: result[0].insertId });
  } catch (err) {
    console.error("Error creating hotel:", err.message);
    res.status(500).json({ message: err.message });
  }
});

// Cập nhật thông tin khách sạn
router.put("/hotels/:id", async (req, res) => {
  const { id } = req.params;
  const {
    name,
    location,
    rating,
    description,
    totalRooms,
    reviewScore,
    image,
  } = req.body;
  const updatedDate = new Date();

  try {
    const result = await db.query(
      "UPDATE hotel SET name = ?, location = ?, rating = ?, description = ?, totalRooms = ?, reviewScore = ?, image = ?, updatedDate = ? WHERE id = ?",
      [
        name,
        location,
        rating,
        description,
        totalRooms,
        reviewScore,
        image,
        updatedDate,
        id,
      ]
    );
    if (result[0].affectedRows > 0) {
      res.json({ message: "Hotel updated" });
    } else {
      res.status(404).json({ message: "Hotel not found" });
    }
  } catch (err) {
    console.error("Error updating hotel:", err.message);
    res.status(500).json({ message: err.message });
  }
});

// Xóa khách sạn
router.delete("/hotels/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("DELETE FROM hotel WHERE id = ?", [id]);
    if (result[0].affectedRows > 0) {
      res.json({ message: "Hotel deleted" });
    } else {
      res.status(404).json({ message: "Hotel not found" });
    }
  } catch (err) {
    console.error("Error deleting hotel:", err.message);
    res.status(500).json({ message: err.message });
  }
});

// Nếu bạn muốn giữ phương thức GET trong client
router.get("/hotels/location/search", async (req, res) => {
  const location = req.query.location; // Lấy location từ query parameter

  if (!location) {
    return res.status(400).json({ message: "Location is required" });
  }

  try {
    const result = await db.query(
      "SELECT * FROM hotel WHERE location LIKE ? LIMIT 5",
      [`%${location}%`] // Sử dụng LIKE để tìm kiếm gần đúng
    );

    res.json(result[0]); // Trả về danh sách khách sạn
  } catch (err) {
    console.error("Error searching hotels:", err.message);
    res.status(500).json({ message: err.message });
  }
});

router.get("/hotels/location/count", async (req, res) => {
  try {
    const result = await db.query(
      ` SELECT location, COUNT(*) AS totalHotels
        FROM hotel
        GROUP BY location; `
    );

    res.json(result[0]); // Trả về danh sách khách sạn
  } catch (err) {
    console.error("Error searching hotels:", err.message);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
