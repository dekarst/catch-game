import React from 'react';

const StartMenu = ({ onStartGame, onLeaderboard }) => {
  return (
    <div className="bg1 flex justify-center items-center flex-col">
      <h1 className="text-5xl font-bold text-white mb-4">Catch Game</h1>
      <button
        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mb-2"
        onClick={onStartGame}
      >
        Start Game
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mb-2"
        onClick={onLeaderboard}
      >
        Leaderboard
      </button>
    </div>
  );
};

export default StartMenu;