const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const gameRoutes = require('./routes/gameRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/game', gameRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});