const playerModel = require('../models/playerModel');

const leaderboardController = {
  getLeaderboard: (req, res) => {
    // Get the top 100 players from the database
    playerModel.getAllPlayers((err, players) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch leaderboard data.' });
      }

      return res.status(200).json(players);
    });
  },
};

module.exports = leaderboardController;