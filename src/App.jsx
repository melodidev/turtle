import { useState, useEffect } from "react";
import Boxes from "./components/Boxes";
import Keyboard from "./components/Keyboard";
import GameOver from "./components/GameOver";
import wordList from "./wordList";
import "./App.css";

function randomWord() {
  return wordList[Math.floor(Math.random() * wordList.length)];
}

export default function App() {
  let [isPlaying, setIsPlaying] = useState(true);
  let [isWon, setIsWon] = useState(false);
  let [guess, setGuess] = useState("");
  let [previousGuesses, setPreviousGuesses] = useState([]);
  let [disabled, setDisabled] = useState(false);
  let [target, setTarget] = useState(randomWord());

  function handleKeyPress(event) {
    if (disabled) return;

    let key = event.key;
    if (key == "Backspace") {
      handleMove("⌫");
    } else if (key == "Enter") {
      handleMove("enter");
    } else if (key >= "a" && key <= "z") {
      handleMove(key);
    }
  }

  function handleMove(key) {
    if (disabled) return;

    let wordLength = 5;
    
    if (key == "enter") {
      if (guess.length < wordLength) {
        alert("Not enough letters");
      } else if (guess.length == wordLength) {
        if (wordList.includes(guess)) {
          addToPrevGuesses(guess);
        } else {
          alert("Not in word list");
        }
      }
      return;
    } else if (key == "⌫") {
      setGuess(guess.slice(0, -1));
      return;
    } else if (guess.length == wordLength) {
      return;
    }
    setGuess(prev => `${prev}${key}`)
  }

  function addToPrevGuesses(guess) {
    setPreviousGuesses([...previousGuesses, guess]);
    checkGameEnd();
    setGuess("");
  }

  function checkGameEnd() {
    if (guess == target) {
      setIsPlaying(false);
      setDisabled(true);
      setIsWon(true);
    } else if (previousGuesses.length == 5) {
      setIsPlaying(false);
      setDisabled(true);
    }
  }

  function playAgain() {
    setIsPlaying(true);
    setIsWon(false);
    setDisabled(false);
    setPreviousGuesses([]);
    setTarget(randomWord());
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <>
      <div className="text-center fs-1 text-uppercase m-2">Turtle</div>

      {previousGuesses.map((guess, i) => <Boxes key={`a-${i}`} guess={guess} target={target} />)}
      {(isPlaying || isWon) && (
        <>
          <Boxes guess={guess} />
          {[...Array(5 - previousGuesses.length)].map((e, i) => <Boxes key={`b-${i}`} guess={""} />)}
        </>
      )}
      
      <Keyboard handleMove={handleMove} />

      {!isPlaying && <GameOver playAgain={playAgain} isWon={isWon} target={target} />}
    </>
  )
}

