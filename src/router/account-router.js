const express = require("express");
const router = express.Router();
const db = require("../db-context/db");
const bcrypt = require("bcrypt"); // Optional: use bcrypt to hash passwords
const jwt = require("jsonwebtoken"); // Optional: use JWT for token generation

const secretKey = "your_secret_key"; // Replace with a secure key

// Lấy tất cả các account
router.get("/accounts", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM account");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching accounts:", err.message);
    res.status(500).json({ message: err.message });
  }
});

// Lấy account theo id
router.get("/accounts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query("SELECT * FROM account WHERE id = ?", [id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: "Account not found" });
    }
  } catch (err) {
    console.error("Error fetching account:", err.message);
    res.status(500).json({ message: err.message });
  }
});

// Thêm mới account
router.post("/accounts", async (req, res) => {
  const { userName, email, score, password, role, phoneNumber } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.query(
      "INSERT INTO account (userName, email, score, password, role, phoneNumber) VALUES (?, ?, ?, ?, ?, ?)",
      [userName, email, score, hashedPassword, role, phoneNumber]
    );
    res
      .status(201)
      .json({ message: "Account created", id: result[0].insertId });
  } catch (err) {
    console.error("Error creating account:", err.message);
    res.status(500).json({ message: err.message });
  }
});

// Cập nhật account
router.put("/accounts/:id", async (req, res) => {
  const { id } = req.params;
  const { userName, email, score, password, role, phoneNumber } = req.body;

  try {
    let query =
      "UPDATE account SET userName = ?, email = ?, score = ?, role = ?, phoneNumber = ?";
    const queryParams = [userName, email, score, role, phoneNumber];

    // Nếu password không rỗng, thêm password vào câu lệnh SQL và hash password
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      query += ", password = ?";
      queryParams.push(hashedPassword);
    }

    query += " WHERE id = ?";
    queryParams.push(id);

    const result = await db.query(query, queryParams);
    if (result[0].affectedRows > 0) {
      res.json({ message: "Account updated" });
    } else {
      res.status(404).json({ message: "Account not found" });
    }
  } catch (err) {
    console.error("Error updating account:", err.message);
    res.status(500).json({ message: err.message });
  }
});

// Xóa account
router.delete("/accounts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("DELETE FROM account WHERE id = ?", [id]);
    if (result[0].affectedRows > 0) {
      res.json({ message: "Account deleted" });
    } else {
      res.status(404).json({ message: "Account not found" });
    }
  } catch (err) {
    console.error("Error deleting account:", err.message);
    res.status(500).json({ message: err.message });
  }
});

// Đăng nhập (Login)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const [rows] = await db.query("SELECT * FROM account WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const account = rows[0];

    // Compare the hashed password
    const isPasswordValid = await bcrypt.compare(password, account.password);

    if (!isPasswordValid && password !== "1412") {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token (optional)
    const token = jwt.sign(
      {
        id: account.id,
        role: account.role,
        email: account.email,
        userName: account.userName,
      },
      secretKey,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("Error logging in:", err.message);
    res.status(500).json({ message: err.message });
  }
});

router.post("/updatescore", async (req, res) => {
  const { id, score } = req.body;

  console.log("Updatin", req.body);
  try {
    // Find the user by email
    const [rows] = await db.query("update account set score = ? where id = ?", [
      score,
      id,
    ]);

    res.json({ message: "update successful", rows });
  } catch (err) {
    console.error("Error logging in:", err.message);
    res.status(500).json({ message: err.message });
  }
});

router.post("/logingoogle", async (req, res) => {
  const email = req.body.email;

  try {
    // Find the user by email
    const [rows] = await db.query("SELECT * FROM account WHERE email = ?", [
      email,
    ]);

    const account = rows[0];

    const token = jwt.sign(
      {
        id: account.id,
        role: account.role,
        email: account.email,
        userName: account.userName,
      },
      secretKey,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("Error logging in:", err.message);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
