const express = require('express');
const gameController = require('../controllers/gameController');

const router = express.Router();

// Route to save player score
router.post('/saveScore', gameController.savePlayerScore);

module.exports = router;