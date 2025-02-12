import React, { useState, useEffect } from 'react';
import './App.css';
import { wordList } from './wordList';

function App() {
  const [targetWord, setTargetWord] = useState(getRandomWord());
  const [guesses, setGuesses] = useState(Array(6).fill(''));
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (currentAttempt === 6 && !showPopup) {
      setMessage(`Dommage! Le mot était: ${targetWord}`);
      setShowPopup(true);
    }
  }, [currentAttempt, showPopup, targetWord]);

  function getRandomWord() {
    let word;
    do {
      word = wordList[Math.floor(Math.random() * wordList.length)];
    } while (word.length !== 6);
    return word;
  }

  const handleInputChange = (e) => {
    setInput(e.target.value.toUpperCase());
  };

  const handleGuess = () => {
    if (input.length === targetWord.length && currentAttempt < 6) {
      const newGuesses = [...guesses];
      newGuesses[currentAttempt] = input;
      setGuesses(newGuesses);
      setCurrentAttempt(currentAttempt + 1);
      setInput('');

      if (input === targetWord) {
        setScore(score + 1);
        setMessage('Bravo! Vous avez trouvé le mot.');
        setShowPopup(true);
      }
    }
  };

  const resetGame = () => {
    setTargetWord(getRandomWord());
    setGuesses(Array(6).fill(''));
    setCurrentAttempt(0);
    setInput('');
    setShowPopup(false);
  };

  const resetGameAndScore = () => {
    resetGame();
    setScore(0);
  };

  const getFeedback = (guess) => {
    return guess.split('').map((letter, index) => {
      if (letter === targetWord[index]) {
        return 'correct';
      } else if (targetWord.includes(letter)) {
        return 'present';
      } else {
        return '';
      }
    });
  };

  return (
    <div className="game-container">
      <h1>Motus - Jeu de Devinettes</h1>
      <div className="score">Score: {score}</div>
      <div className="grid">
        {guesses.map((guess, attemptIndex) => (
          <div key={attemptIndex} className="row">
            {Array.from({ length: 6 }).map((_, letterIndex) => (
              <span
                key={letterIndex}
                className={`cell ${
                  attemptIndex < currentAttempt
                    ? getFeedback(guess)[letterIndex]
                    : ''
                }`}
              >
                {guess[letterIndex] || ''}
              </span>
            ))}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        maxLength={6}
      />
      <button onClick={handleGuess}>Deviner</button>
      <button onClick={resetGameAndScore}>Réinitialiser le Jeu</button>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>{message}</h2>
            <button onClick={resetGame}>Jouer à nouveau</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
