const playerModel = require('../models/playerModel');

const gameController = {
  savePlayerScore: (req, res) => {
    const { name, score } = req.body;

    if (!name || !score) {
      return res.status(400).json({ error: 'Name and score are required fields.' });
    }

    // Save the player's score to the database
    playerModel.addPlayer(name, score, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to save player score.' });
      }

      return res.status(200).json({ message: 'Player score saved successfully.' });
    });
  },
};

module.exports = gameController;