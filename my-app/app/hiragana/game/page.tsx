'use client'
import { useState, useEffect } from 'react'
import { NextPage } from "next";
import NavBar from "/components/NavBar";
import Background from "/components/Backgrounds"
import GameGrid from "/components/GameGrid"
import Question from "/components/Question"
import GameBird from "/components/gameBird"
import { hiraganaDummyData } from "@/public/HiraganaDummyData";

const hiraganaGame  : NextPage = () => {
  const [remainingCharacters, setRemainingCharacters] = useState([...hiraganaDummyData]);
  const [questionCharacter, setQuestionCharacter] = useState(null);
  const [birdState, setBirdState] = useState('neutral')
  const [gameIsComplete, setGameIsComplete] =useState(false)

  useEffect(() => {
    setQuestionCharacter(getNewCharacter())
  },[])

 
  const gameComplete = () => {
    console.log("game complete");
    setGameIsComplete(true)
    setBirdState("happy")
    console.log(gameIsComplete)
    //need more logic to restart the game
  }

  const getNewCharacter = () => {
    if (remainingCharacters.length === 0) {
      gameComplete();
      setRemainingCharacters([...hiraganaDummyData]);
      return;
    }
    const randomIndex = Math.floor(Math.random() * remainingCharacters.length);
    const newCharacter = remainingCharacters[randomIndex];
    setRemainingCharacters(remainingCharacters.filter((_, index) => index !== randomIndex));
    return newCharacter;
  }

  const handleButtonClick = (characterClicked) => {
    if (characterClicked === questionCharacter) {
      console.log("correct");
      setBirdState('happy')
      setTimeout(() => {
        setBirdState('neutral');
        setQuestionCharacter(getNewCharacter());
      },1000)
    } else {
      console.log("incorrect")
      setBirdState("sad")
      setTimeout(() => setBirdState('neutral'),1000)
    }
  };
  
  return (
    <Background>
      <NavBar />
      <main className="min-h-screen flex items-center justify-center">
        <GameBird state={birdState} className = {gameIsComplete ? 'animate-bounce' : ""} />
        <Question character={questionCharacter} />
        <GameGrid onButtonClick={handleButtonClick} />
      </main>
    </Background>
  );
}

export default hiraganaGame;