const express = require("express");
const router = express.Router();
const connection = require("../db-context/db");

// GET all comments
router.get("/comments", async (req, res) => {
  try {
    const [rows] = await connection.query(`SELECT 
    acc.id AS account_id,
    acc.role as role,
    acc.userName AS account_userName,
    acc.email AS account_email,
    acc.phoneNumber AS account_phoneNumber,
    cmt.id AS comment_id,
    cmt.comment AS comment_text,
    cmt.rating AS comment_rating,
    cmt.is_removed AS comment_is_removed,
    htl.id AS hotel_id,
    htl.name AS hotel_name,
    htl.location AS hotel_address,
    rm.id AS room_id
FROM 
    comments cmt
JOIN 
    account acc ON cmt.userId = acc.id
JOIN 
    hotel htl ON cmt.hotelId = htl.id
JOIN 
    rooms rm ON cmt.roomId = rm.id;
`);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).send("Server error");
  }
});

// GET comment by ID
router.get("/comments/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await connection.query(
      "SELECT * FROM comments WHERE id = ?",
      [id]
    );
    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching comment:", error);
    res.status(500).send("Server error");
  }
});

// CREATE a new comment
router.post("/comments", async (req, res) => {
  const { userName, roomId, hotelName, rating, comment, is_removed } = req.body;
  try {
    const [result_hotel] = await connection.query(
      `select * from hotel where name = ?`,
      [hotelName]
    );

    const [result_account] = await connection.query(
      `select * from account where userName = ?`,
      [userName]
    );

    console.log(result_account);
    console.log(result_hotel);
    console.log(req.body);

    const [result] = await connection.query(
      "INSERT INTO comments (userId, roomId, hotelId, rating, comment, is_removed) VALUES (?, ?, ?, ?, ?, ?)",
      [
        result_account[0].id,
        roomId,
        result_hotel[0].id,
        rating,
        comment,
        is_removed,
      ]
    );
    res.status(201).json({
      id: result.insertId,
      userId: result_account[0].id,
      roomId,
      hotelId: result_hotel[0].id,
      rating,
      comment,
      is_removed,
    });
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).send("Server error");
  }
});

// UPDATE a comment
router.put("/comments/:id", async (req, res) => {
  const { id } = req.params;
  const { userName, roomId, hotelName, rating, comment, is_removed } = req.body;
  try {
    const [result_hotel] = await connection.query(
      `select * from hotel where name = ?`,
      [hotelName]
    );

    const [result_account] = await connection.query(
      `select * from account where userName = ?`,
      [userName]
    );

    await connection.query(
      "UPDATE comments SET userId = ?, roomId = ?, hotelId = ?, rating = ?, comment = ?, is_removed = ? WHERE id = ?",
      [
        result_account[0].id,
        roomId,
        result_hotel[0].id,
        rating,
        comment,
        is_removed,
        id,
      ]
    );
    res.status(200).send("Comment updated successfully");
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).send("Server error");
  }
});

// DELETE a comment
router.delete("/comments/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await connection.query("DELETE FROM comments WHERE id = ?", [id]);
    res.status(200).send("Comment deleted successfully");
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
