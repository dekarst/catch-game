import React, { useState } from 'react';
import StartMenu from './components/StartMenu';
import GameScreen from './components/GameScreen';
import GameOverScreen from './components/GameOverScreen';
import LeaderboardScreen from './components/LeaderboardScreen';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('start');
  const [finalScore, setFinalScore] = useState(0);

  const handleStartGame = () => {
    setCurrentScreen('game');
  };

  const handleGameOver = (score) => {
    setFinalScore(score);
    setCurrentScreen('gameOver');
  };

  const handleLeaderboard = () => {
    setCurrentScreen('leaderboard');
  };

  const handleLeaderboardBack = () => {
    setCurrentScreen('start');
  };

  const handleSubmitScore = (name, score) => {
    // Code to submit the player's name and score to the backend API goes here
    setCurrentScreen('leaderboard');
  };

  return (
    <div>
      {currentScreen === 'start' && (
        <StartMenu onStartGame={handleStartGame} onLeaderboard={handleLeaderboard} />
      )}
      {currentScreen === 'game' && <GameScreen onGameOver={handleGameOver} />}
      {currentScreen === 'gameOver' && (
        <GameOverScreen finalScore={finalScore} onSubmitScore={handleSubmitScore} />
      )}
      {currentScreen === 'leaderboard' && (
        <LeaderboardScreen onBack={handleLeaderboardBack} />
      )}
    </div>
  );
};

export default App;