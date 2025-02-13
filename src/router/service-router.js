const express = require('express');
const router = express.Router();
const connection = require('../db-context/db');

// GET all services
router.get('/services', async (req, res) => {
  try {
    const [rows] = await connection.query('SELECT * FROM services');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).send('Server error');
  }
});

// GET service by ID
router.get('/services/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await connection.query('SELECT * FROM services WHERE id = ?', [id]);
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).send('Server error');
  }
});

// CREATE a new service
router.post('/services', async (req, res) => {
  const { name, description, icon,service_price } = req.body;
  try {
    const [result] = await connection.query(
      'INSERT INTO services (name, description,service_price, icon, createdDate, updatedDate) VALUES (?, ?,?, ?, NOW(), NOW())',
      [name, description,service_price, icon]
    );
    res.status(201).json({ id: result.insertId, name, description, icon });
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).send('Server error');
  }
});

// UPDATE a service
router.put('/services/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, icon, service_price } = req.body;
  console.log("req.body: ", req.body)
  try {
    // Cập nhật câu SQL, thêm dấu phẩy giữa các trường
    await connection.query(
      'UPDATE services SET name = ?, description = ?, icon = ?, service_price = ?, updatedDate = NOW() WHERE id = ?',
      [name, description, icon, service_price, id]
    );
    res.status(200).send('Service updated successfully');
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).send('Server error');
  }
});


// DELETE a service
router.delete('/services/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await connection.query('DELETE FROM services WHERE id = ?', [id]);
    res.status(200).send('Service deleted successfully');
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
