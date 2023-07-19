import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LeaderboardScreen = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  const [topPlayers, setTopPlayers] = useState([]);

  useEffect(() => {
    // Fetch the top players from the backend API every 5 seconds (adjust as needed)
    const fetchTopPlayers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/leaderboard');
        setTopPlayers(response.data);
      } catch (error) {
        console.log('Error fetching leaderboard:', error);
      }
    };

    // Fetch data immediately and set up periodic fetching
    fetchTopPlayers();
    const interval = setInterval(fetchTopPlayers, 5000); // Fetch every 5 seconds (adjust as needed)

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg2 flex items-center pt-5 flex-col">
      <h1 className="text-5xl font-bold text-white mb-4">Leaderboard</h1>
      <table className="table-auto bg-gray-100">
        <thead>
          <tr>
            <th className="px-4 py-2">Rank</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Score</th>
          </tr>
        </thead>
        <tbody>
          {topPlayers.map((player, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{player.name}</td>
              <td className="border px-4 py-2">{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardScreen;