const express = require('express');
const leaderboardController = require('../controllers/leaderboardController');

const router = express.Router();

// Route to get the leaderboard data
router.get('/', leaderboardController.getLeaderboard);

module.exports = router;