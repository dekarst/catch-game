import React, { useState } from 'react';
import axios from 'axios';

const GameOverScreen = ({ finalScore, onSubmitScore }) => {
  const [name, setName] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = () => {
    axios.post('http://localhost:5000/api/game/saveScore', {
      name: name,
      score: finalScore,
    })
    .then((response) => {
      console.log(response.data);
      onSubmitScore();
    })
    .catch((error) => {
      console.error(error);
    });
  };

  return (
    <div className="bg2 flex items-center pt-5 flex-col overflow-hidden relative">
      <h1 className="text-5xl font-bold text-white mb-4">Game Over</h1>
      <p className="font-bold text-white mb-4">Your Score: {finalScore}</p>

      <div className="relative">
        <input
          type="text"
          id="default-search"
          className="block w-64 p-4 pl-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter your name"
          value={name}
          onChange={handleNameChange}
        />
        <button
          type="button"
          className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default GameOverScreen;