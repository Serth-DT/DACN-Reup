const express = require('express');
const router = express.Router();
const connection = require('../db-context/db');

// GET all news
router.get('/news', async (req, res) => {
    try {
        const [rows] = await connection.query('SELECT * FROM news');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).send('Server error');
    }
});

// GET news by ID
router.get('/news/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await connection.query('SELECT * FROM news WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).send('News not found');
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).send('Server error');
    }
});

// CREATE a new news
router.post('/news', async (req, res) => {
    const { topic, title, newsImage, description } = req.body;
    try {
        const [result] = await connection.query(
            'INSERT INTO news (topic, title, newsImage, description) VALUES (?, ?, ?, ?)',
            [topic, title, newsImage, description]
        );
        res.status(201).json({ id: result.insertId, topic, title, newsImage, description });
    } catch (error) {
        console.error('Error creating news:', error);
        res.status(500).send('Server error');
    }
});

// UPDATE a news
router.put('/news/:id', async (req, res) => {
    const { id } = req.params;
    const { topic, title, newsImage, description } = req.body;
    try {
        const [result] = await connection.query(
            'UPDATE news SET topic = ?, title = ?, newsImage = ?, description = ? WHERE id = ?',
            [topic, title, newsImage, description, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).send('News not found');
        }

        res.status(200).send('News updated successfully');
    } catch (error) {
        console.error('Error updating news:', error);
        res.status(500).send('Server error');
    }
});

// DELETE a news
router.delete('/news/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await connection.query('DELETE FROM news WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).send('News not found');
        }

        res.status(200).send('News deleted successfully');
    } catch (error) {
        console.error('Error deleting news:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;