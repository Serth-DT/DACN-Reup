const express = require('express');
const router = express.Router();
const db = require('../db-context/db');

// READ - Get all room types
router.get('/roomtypes', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT id, name, description, createdDate, updatedDate FROM roomtypes');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// READ - Get a single room type by ID
router.get('/roomtypes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT id, name, description, createdDate, updatedDate FROM roomtypes WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Room type not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// CREATE - Add a new room type
router.post('/roomtypes', async (req, res) => {
    const { name, description } = req.body;
    try {
        const [result] = await db.query('INSERT INTO roomtypes (name, description, createdDate, updatedDate) VALUES (?, ?, NOW(), NOW())', [name, description]);
        res.status(201).json({ id: result.insertId, name, description });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// UPDATE - Update an existing room type
router.put('/roomtypes/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const [result] = await db.query('UPDATE roomtypes SET name = ?, description = ?, updatedDate = NOW() WHERE id = ?', [name, description, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Room type not found' });
        }
        res.json({ id, name, description });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE - Remove a room type
router.delete('/roomtypes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM roomtypes WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Room type not found' });
        }
        res.json({ message: 'Room type deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
