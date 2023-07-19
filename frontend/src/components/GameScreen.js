import React, { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';

const ITEM_SPEED = 50;
const CATCHER_WIDTH = 100;
const ITEM_WIDTH = 100;
const ITEM_TYPES = ['p1', 'p2', 'p3', 'p4', 'e1', 'e2'];

const GameScreen = ({ onGameOver }) => {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [items, setItems] = useState([]);
  const [catcherPosition, setCatcherPosition] = useState(window.innerWidth / 2);

  const debouncedSetItems = debounce(setItems, 1);

  useEffect(() => {
    if (secondsLeft > 0 && !gameOver) {
      const timer = setInterval(() => {
        setSecondsLeft((prevSeconds) => prevSeconds - 1);
        dropItems();
      }, 500);

      return () => clearInterval(timer);
    } else if (secondsLeft === 0 && !gameOver) {
      setGameOver(true);
      onGameOver(score);
    }
  }, [secondsLeft, gameOver, onGameOver, score]);

  useEffect(() => {
    generateItems();
  }, []);

  const generateItems = () => {
    const newItems = Array.from({ length: 10 }, (_, index) => {
      const randomType = ITEM_TYPES[Math.floor(Math.random() * ITEM_TYPES.length)];
      return {
        id: index + 1,
        type: randomType,
        top: getRandomTopPosition(), // Randomize the top position
        left: getRandomPosition(),
      };
    });

    setItems(newItems);
  };

  const getRandomTopPosition = () => {
    // Function to get a random top position for item generation
    return -Math.floor(Math.random() * 400); // Adjust the range (-400) based on how high you want the items to appear
  };

  const getRandomPosition = () => {
    // Function to get a random position for item generation
    // Adjust the width of the container where items are dropping for accuracy
    return Math.floor(Math.random() * (window.innerWidth - 100));
  };

  const dropItems = () => {
    setItems((prevItems) =>
      prevItems.map((item) => ({
        ...item,
        top: item.top + ITEM_SPEED,
      }))
    );
  };

  const handleMouseMove = (event) => {
    const newPosition = event.clientX - CATCHER_WIDTH / 2;
    // Ensure the catcher stays within the game screen
    if (newPosition >= 0 && newPosition <= window.innerWidth - CATCHER_WIDTH) {
      setCatcherPosition(newPosition);
    }
  };

  const catchItems = () => {
    const catcherTop = window.innerHeight - 100;
    const catcherLeft = catcherPosition;
    const catcherRight = catcherLeft + CATCHER_WIDTH;
    const catcherBottom = catcherTop + 20; // Assuming the catcher's height is 20

    const updatedItems = items.filter((item) => {
      const itemTop = item.top;
      const itemLeft = item.left;
      const itemRight = itemLeft + ITEM_WIDTH;
      const itemBottom = itemTop + ITEM_WIDTH;

      // Check for vertical overlap between the catcher and the item
      if (itemBottom >= catcherTop && itemTop <= catcherBottom) {
        // Check for horizontal overlap between the catcher and the item
        if (itemLeft <= catcherRight && itemRight >= catcherLeft) {
          // Collision occurred, item is caught
          if (item.type === 'p1' || item.type === 'p2' /* Add more positive item types... */) {
            setScore((prevScore) => prevScore + 50);
          } else if (item.type === 'e1' || item.type === 'e2' /* Add more negative item types... */) {
            setScore((prevScore) => prevScore - 100);
          }

          return false; // Remove the caught item from the "items" state
        }
      }
      return true; // Keep the item in the "items" state
    });

    debouncedSetItems(updatedItems);
  };

  useEffect(() => {
    // Check for item collision on each render
    if (items.length > 0) {
      catchItems();
    }
  }, [items, catcherPosition]);

  useEffect(() => {
    // Add event listener for mouse movement
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      // Remove event listener on component unmount
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="bg2 flex items-center pt-5 flex-col overflow-hidden relative">
      <h1 className="text-5xl font-bold text-white mb-4">Game Screen</h1>
      <p className="font-bold text-white mb-1">Time Left: {secondsLeft} seconds</p>
      <p className="font-bold text-white mb-4">Score: {score}</p>
      <div
        style={{
          position: 'absolute',
          top: window.innerHeight - 100,
          left: catcherPosition,
          width: CATCHER_WIDTH,
          height: 20,
          background: 'white',
          border: '1px solid black'
        }}
      />
      {items.map((item) => (
        <img
          key={item.id}
          src={`assets/${item.type}.png`}
          alt={`Item ${item.id}`}
          style={{ position: 'absolute', top: item.top, left: item.left }}
          width={ITEM_WIDTH}
        />
      ))}
    </div>
  );
};

export default GameScreen;