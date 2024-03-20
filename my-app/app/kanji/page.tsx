// // 1. Ensure only go through each 'character' once so we can end game (otherwise be infinitely asked all characters)
// // 2. Set questionCharacter - 'character' (in bigger box on left) -> pulls from 'remainingCharacters'
// // 3. remainingCharacters is a filtered copy of the main HirganaDummyData array, filtering out characters already used (see step 1)
// // 4. When clicked -if wrong answer - bird is unhappy, if right answer -> bird is happy (returns to 'normal face' after 1 second)
// // 5. If correct character found (characterClicked === questionCharacter), remainingCharacters checks if any left (i.e. if completed game).
// // 6. If game completed - bird state is happy and bouncing animation occurs


// 'use client'
// import { useState, useEffect } from 'react'
// import { NextPage } from "next";
// import Background from "@/components/Backgrounds"
// import KanjiGameGrid from "@/components/KanjiGameGrid"
// import Question from "@/components/Question"
// import GameBird from "@/components/gameBird"
// import { kanjiDummyData } from "@/constants/KanjiDummyData";

// const onlyEnglish = kanjiDummyData.map((character) => character.english); //creates an array of only the english characters from the main array

// const kanjiGame  : NextPage = () => {
//   const [remainingCharacters, setRemainingCharacters] = useState(onlyEnglish); //copy of main array, used to keep track of which characters have not been shown yet
//   const [questionCharacter, setQuestionCharacter] =useState<string | undefined>(undefined); //sets the character in the big box that user needs to find
//   const [birdState, setBirdState] = useState<'happy' | 'neutral' | 'sad'>('neutral') //image of bird - set to neutral 
//   const [gameIsComplete, setGameIsComplete] =useState<boolean>(false)


  

//   useEffect(() => {
//     const randomCharacter = getNewCharacter()
//     console.log(randomCharacter)
//     setQuestionCharacter(randomCharacter)
//   },[])

 
//   const gameComplete = () => {
//     setGameIsComplete(true) //prop for gameBird - triggers bouncing
//     setBirdState("happy") //sets bird to happy face
//     //need more logic to restart the game
//   }

//   const getNewCharacter = () => {
//     if (remainingCharacters.length === 0) { //checks if game is over, completed all characters
//       gameComplete();
//       setRemainingCharacters(onlyEnglish); //resets array which tracks how many characters are left. Ready for next game
//       return;
//     }
//     const randomIndex = Math.floor(Math.random() * remainingCharacters.length); //if still characters left - chooses a random one to show in big box
//     const newCharacter = remainingCharacters[randomIndex];//sets new character (to be shown) to the random index above
//     setRemainingCharacters(remainingCharacters.filter((_, index) => index !== randomIndex)); //sets remainCharacters to a new array, with the random index removed - i.e. removed the character from the list of remaining possible characters
//     return newCharacter;
//   }

//   const handleButtonClick = (characterClicked: string) => {
//     console.log(characterClicked)
//     console.log(questionCharacter)


//     const indexOfAnswer = kanjiDummyData.findIndex((character) => character.english === questionCharacter) //finds the index of the character in the main array
//     const indexOfGuess = kanjiDummyData.findIndex((character) => character.kanji === characterClicked) //finds the index of the character in the main array

//     console.log(indexOfAnswer)
//     console.log(indexOfGuess)



//     if (indexOfAnswer === indexOfGuess) { //checks if user is correct, whether character user clicked from the main grid was same as one in the big box.
//     // if yes, bird is happy for 1000ms the returns to neutral. 
//     console.log("correct")
//       setBirdState('happy')
//       setTimeout(() => {
//         setBirdState('neutral');
//         const newCharacter = getNewCharacter();
//         setQuestionCharacter(newCharacter); // if user is correct, gets a new character
//       },1000)
//     } else {
//       console.log("incorrect")
//       setBirdState("sad")
//       setTimeout(() => setBirdState('neutral'),1000)
//     }
//   };
  
//   return (
//     <Background>
//       <main className="min-h-screen flex items-center justify-center">
//         <GameBird state={birdState} className = {gameIsComplete ? 'animate-bounce' : ""} />
//         <Question character={questionCharacter} />
//         <KanjiGameGrid onButtonClick={handleButtonClick} />
//       </main>
//     </Background>
//   );
// }

// export default kanjiGame;