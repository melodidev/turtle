import { useState, useEffect } from "react";
import Boxes from "./components/Boxes";
import Keyboard from "./components/Keyboard";
import GameOver from "./components/GameOver";
import { allWords, allAnswers } from "./wordList"
import "./App.css";

const wordLength = 5;
const rowCount = 6;

function randomWord() {
  return allAnswers[Math.floor(Math.random() * allAnswers.length)].toLowerCase();
}

export default function App() {
  let [isPlaying, setIsPlaying] = useState(true);
  let [isWon, setIsWon] = useState(false);
  let [disabled, setDisabled] = useState(false);
  let [target, setTarget] = useState(randomWord());
  let [guesses, setGuesses] = useState(Array(rowCount).fill(""));
  let [currentGuessIndex, setCurrentGuessIndex] = useState(0);
  console.log(target);

  function handleMove(key) {
    if (disabled) return;
    let guess = guesses[currentGuessIndex];

    if (key == "enter") {
      if (guess.length < wordLength) {
        alert("Not enough letters");
      } else if (guess.length == wordLength) {
        if (allWords.includes(guess)) {
          checkGameEnd();
          setCurrentGuessIndex(currentGuessIndex + 1);
        } else {
          alert("Not in word list");
        }
      }
    } else if (key == "⌫") {
      guess = guess.slice(0, -1);
    } else if (guess.length == wordLength) {
      return;
    } else {
      guess = guess + key;
    }

    const guessesCopy = guesses.map((prevGuess, index) => {
      if (index == currentGuessIndex) {
        return guess;
      }
      return prevGuess;
    });
    setGuesses(guessesCopy);
  }

  function checkGameEnd() {
    if (guesses[currentGuessIndex] == target) {
      setIsPlaying(false);
      setDisabled(true);
      setIsWon(true);
    } else if (currentGuessIndex == rowCount - 1) {
      setIsPlaying(false);
      setDisabled(true);
    }
  }

  function playAgain() {
    setIsPlaying(true);
    setIsWon(false);
    setDisabled(false);
    setGuesses(Array(rowCount).fill(""));
    setCurrentGuessIndex(0);
    setTarget(randomWord());
  }

  function handleKeyPress(event) {
    if (disabled) return;

    let key = event.key.toLowerCase();
    if (key == "backspace") {
      handleMove("⌫");
    } else if (key == "enter") {
      handleMove("enter");
    } else if (key.length === 1 && key >= "a" && key <= "z") {
      handleMove(key);
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className="position-relative">
      {!isPlaying && <GameOver playAgain={playAgain} isWon={isWon} target={target} />}
      <div className="text-center fs-1 text-uppercase m-2 mt-4">Turtle</div>
      {guesses.map((guess, i) => <Boxes key={i} index={i} currentGuessIndex={currentGuessIndex} guess={guess} target={target} />)}
      <Keyboard handleMove={handleMove} target={target} guesses={guesses} currentGuessIndex={currentGuessIndex} />
    </div>
  )
}

