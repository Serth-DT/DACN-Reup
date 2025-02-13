const express = require('express');
const router = express.Router();
const connection = require('../db-context/db'); // Đường dẫn đến tệp kết nối cơ sở dữ liệu của bạn

// GET tất cả các khuyến mãi
router.get('/promotions', async (req, res) => {
  try {
    const [rows] = await connection.query('SELECT * FROM promotions');
    res.json(rows);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách khuyến mãi:', error);
    res.status(500).send('Lỗi máy chủ');
  }
});

// GET khuyến mãi theo ID
router.get('/promotions/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await connection.query('SELECT * FROM promotions WHERE id = ?', [id]);
    res.json(rows[0]);
  } catch (error) {
    console.error('Lỗi khi lấy khuyến mãi:', error);
    res.status(500).send('Lỗi máy chủ');
  }
});

// Tạo một khuyến mãi mới
router.post('/promotions', async (req, res) => {
  const { name, discount, description, startDate, endDate } = req.body;
  try {
    const [result] = await connection.query(
      'INSERT INTO promotions (name, discount, description, startDate, endDate, createdDate, updatedDate) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
      [name, discount, description, startDate, endDate]
    );
    res.status(201).json({ id: result.insertId, name, discount, description, startDate, endDate });
  } catch (error) {
    console.error('Lỗi khi tạo khuyến mãi:', error);
    res.status(500).send('Lỗi máy chủ');
  }
});

// Cập nhật khuyến mãi
router.put('/promotions/:id', async (req, res) => {
  const { id } = req.params;
  const { name, discount, description, startDate, endDate } = req.body;
  try {
    await connection.query(
      'UPDATE promotions SET name = ?, discount = ?, description = ?, startDate = ?, endDate = ?, updatedDate = NOW() WHERE id = ?',
      [name, discount, description, startDate, endDate, id]
    );
    res.status(200).send('Khuyến mãi đã được cập nhật thành công');
  } catch (error) {
    console.error('Lỗi khi cập nhật khuyến mãi:', error);
    res.status(500).send('Lỗi máy chủ');
  }
});

// Xóa khuyến mãi
router.delete('/promotions/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await connection.query('DELETE FROM promotions WHERE id = ?', [id]);
    res.status(200).send('Khuyến mãi đã được xóa thành công');
  } catch (error) {
    console.error('Lỗi khi xóa khuyến mãi:', error);
    res.status(500).send('Lỗi máy chủ');
  }
});

module.exports = router;
