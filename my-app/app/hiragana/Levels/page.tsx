"use client";
import { useSearchParams } from "next/navigation";
import { hiraganaLevelData } from "@/constants/HiraganaLevelData";
import { katakanaDummyData } from "@/constants/KatakanaDummyData";
import { kanjiDummyData } from "@/constants/KanjiDummyData";
import Background from "@/components/Backgrounds";
import GameBird from "@/components/gameBird";
import { useState, useEffect } from "react";
import Question from "@/components/Question";
import GameGrid from "@/components/GameGrid";

const identifyAndReturnAlphabet = (alphabet: string) => {
  console.log("Identifying and returning alphabet", alphabet);
  if (alphabet === "hiragana") {
    return hiraganaLevelData;
  }
};
const ButtonGroup = ({ handleFirstButtonClick, handleButtonClick, questionCharacter, getRandomCharacter, level }) => {
    const [buttonOrder, setButtonOrder] = useState<"row" | "row-reverse">("row");
  
    useEffect(() => {
      setButtonOrder(Math.random() > 0.5 ? "row" : "row-reverse");
    }, [questionCharacter]); // Update button order whenever questionCharacter changes
  
    return (
      <div style={{ display: "flex", gap: "8px", flexDirection: buttonOrder }}>
        {/* Correct Button */}
        <button className="bg-blue-200" onClick={handleFirstButtonClick}>
          {hiraganaLevelData
            .find((levelData: any) => levelData.level === Number(level))
            ?.hiragana.find(
              (pairing: any) => pairing.english === questionCharacter
            )?.hiragana}
        </button>
  
        {/* Incorrect Button */}
        <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleButtonClick(e.currentTarget.value)}>
          {getRandomCharacter()}
        </button>
      </div>
    );
  };
  
const Page = () => {
  const originParams = useSearchParams();
  const alphabet = originParams!.get("alphabet");
  const level = originParams!.get("level");
  console.log(alphabet);
  console.log(level);

  const LevelData = hiraganaLevelData.find(
    (levelData: any) => levelData.level === Number(level)
  );
  console.log(LevelData);

  const [onlyEnglish, setOnlyEnglish] = useState<string[]>([]);
  const [birdState, setBirdState] = useState<"happy" | "neutral" | "sad">(
    "neutral"
  );
  const [questionCharacter, setQuestionCharacter] = useState<
    string | undefined | null
  >("");
  const [remainingCharacters, setRemainingCharacters] = useState<string[]>([]);

  useEffect(() => {
    if (!alphabet) return;

    const alphabetData = identifyAndReturnAlphabet(alphabet);
    if (!alphabetData) return;
    const getLevel = alphabetData.find(
      (levelData: any) => levelData.level === Number(level)
    );
    console.log(getLevel);

    const englishData = getLevel?.hiragana.map(
      (pairing: any) => pairing.english
    );
    console.log(englishData);
    if (!englishData || englishData.length === 0) {
      // Handle case when there are no characters for the specified alphabet and level
      console.log("No characters found for the specified alphabet and level.");
      return;
    }
    setOnlyEnglish(englishData);
    console.log(englishData);
    setRemainingCharacters(englishData);
  }, [alphabet, level]);

  useEffect(() => {
    console.log("Remaining characters", remainingCharacters);
    if (remainingCharacters?.length !== 0) {
      const randomIndex = Math.floor(
        Math.random() * remainingCharacters.length
      );
      const newCharacter = remainingCharacters[randomIndex];
      setQuestionCharacter(newCharacter);
    }
  }, [remainingCharacters]);

  const cycleToNextCharacter = (prevCharacter: string) => {
    console.log("Cycling to next character");
    if (remainingCharacters === undefined) return;
    if (remainingCharacters.length === 0) return;
    const eliminatePrevCharacter = remainingCharacters?.filter(
      (character) => character !== prevCharacter
    );
    setRemainingCharacters(eliminatePrevCharacter);
  };

  useEffect(() => {
    console.log("Remaining characters", remainingCharacters);
  }, [remainingCharacters]);

  const handleFirstButtonClick = () => {
    console.log("First Button clicked");
    setBirdState("happy"); // Set bird state to "happy" when the first button is clicked
    setTimeout(() => {
      setBirdState("neutral");
      cycleToNextCharacter(questionCharacter); // Move the array onward after setting bird state
    }, 1000);
  };

  const handleButtonClick = (characterClicked: string | undefined) => {
    console.log("Button clicked", characterClicked);
    console.log(remainingCharacters);
    console.log(questionCharacter);
    console.log(characterClicked);

const handleFirstButtonClick = () => {
  console.log("First Button clicked");
  setBirdState("happy"); // Set bird state to "happy" when the first button is clicked
  setTimeout(() => {
    setBirdState("neutral");
    cycleToNextCharacter(questionCharacter); // Move the array onward after setting bird state
  }, 1000);
};

    // const arrayToCheck = identifyAndReturnAlphabet(alphabet!)?.map((level))

    const getArrayOfCorrespondingLevel = hiraganaLevelData.find(
      (levelData: any) => levelData.level === level
    );
    console.log(getArrayOfCorrespondingLevel);
    const charactersArrayOfCorrespondingLevel =
      getArrayOfCorrespondingLevel?.hiragana;
    console.log(charactersArrayOfCorrespondingLevel);
    const pairing = charactersArrayOfCorrespondingLevel?.find(
      (pairing: any) => pairing.english === questionCharacter
    );
    console.log(pairing);

    if (characterClicked === pairing?.hiragana) {
        console.log("Correct!");
        setBirdState("happy");
        setTimeout(() => {
          setBirdState("neutral");
        }, 1000);
        cycleToNextCharacter(pairing?.english);
      } else {
        console.log("Incorrect!");
        setBirdState("sad");
        setTimeout(() => {
          setBirdState("neutral");
        }, 1000);
      }
  };

  console.log(
    hiraganaLevelData
      .find((levelData: any) => levelData.level === Number(level))
      ?.hiragana.find((pairing: any) => pairing.english === questionCharacter)
      ?.hiragana
  );

  const getRandomCharacter = () => {
    const levelData = hiraganaLevelData.find(
      (levelData: any) => levelData.level === Number(level)
    );
    if (!levelData) return ""; // Ensure level data is found

    const characters = levelData.hiragana.filter(
      (pairing: any) => pairing.english !== questionCharacter
    );
    if (characters.length === 0) return ""; // Ensure there are characters to choose from

    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex].hiragana;
  };

  // Use the character level as needed
  // console.log(`The character ${pairing?.hiragana} is in level ${characterLevel}.`);

  if (remainingCharacters?.length === 0) {
    return (
        <Background>
        <h1 className="h-screen flex justify-center items-center flex-col font-bold text-white">
          <GameBird state="happy" className="absolute animate animate-bounce z-10  mb-80"/>
          <div className="absolute mt-80 w-1/4 h-1/2 bg-white p-12 rounded-xl drop-shadow-xl text-center">
            <h2 className="text-green-600 text-4xl">Good work!</h2>
            <br/>
            <h2 className="text-black text-xl mt-4">You have completed the lesson!</h2>
            <br/>
              <h2 className="text-black text-xl">Study more, or try the game!</h2>
            <button className=" text-white text-2xl drop-shadow-lg mt-10 bg-green-600 hover:bg-white hover:border-green-600 hover:text-green-600 border-2 border-green-600 p-2 rounded-lg" onClick={() => window.location.reload()}>Play Again!</button>
            <br/>
            <a href="/hiragana" className="flex bg-yellow-700 py-1 mt-12 hover:bg-white hover:border-yellow-700 hover:text-yellow-700 border-yellow-700 border-2 rounded-lg cursor-pointer justify-center items-center text-center font-bold text-md text-white">Return to Hiragana Lessons!</a>

          </div>

        </h1>
      </Background>
    );
  }

  if (!alphabet) return <div>No alphabet</div>;
  if (!level) return <div>No level</div>;
  if (!onlyEnglish) return <div>No onlyEnglish</div>;
  if (!questionCharacter) return <div>No questionCharacter</div>;
  if (!remainingCharacters)
    return (
      <div>
        <h1>no remaining characters</h1>
      </div>
    );
  if (!birdState) return <div>No birdState</div>;

  return (
    <Background>
        <br/>
  <h1 className="text-4xl font-bold text-white text-center">Let's study {alphabet}</h1>
  <br/><br/><br/>
  <div className="flex gap-10 mt-20 items-center justify-center">
  <GameBird state={birdState} className=" absolute mr-80 mt-40 z-10" />
  <div id="question-card" className="relative ml-80 shadow-xl bg-white rounded-xl h-96 w-1/4 flex items-center justify-center">
  <div className="w-full h-full flex flex-col items-center justify-start">
    <h2 className="text-2xl mt-10 mb-12">Find the Hiragana for:</h2>
    <h2 className="text-6xl font-bold">{questionCharacter}</h2>
        <div
          style={{
            display: " flex",
            gap: "8px",
            flexDirection: Math.random() > 0.5 ? "row" : "row-reverse",
          }}
        >
          {/* Correct Button */}
          
          <button 
            className="mt-12 px-8 py-4 text-4xl rounded-lg drop-shadow-lg bg-gray-100 hover:bg-gray-200"
            onClick={handleFirstButtonClick}
          >
            {hiraganaLevelData
              .find((levelData: any) => levelData.level === Number(level))
              ?.hiragana.find((pairing: any) => pairing.english === questionCharacter)
              ?.hiragana}
          </button>

          {/* Incorrect Button */}
          <button
                      className="mt-12 px-8 py-4 text-4xl rounded-lg drop-shadow-lg bg-gray-100 hover:bg-gray-200"

            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              handleButtonClick(e.currentTarget.value)
            }
          >
            {getRandomCharacter()}
          </button>
          
        </div>
        <a href="/hiragana" className="flex bg-yellow-700 py-1 px-2 hover:bg-white border-yellow-700 hover:text-yellow-700 border-2 rounded-lg  mt-8 cursor-pointer items-center font-bold text-md text-white">Return to Hiragana Lessons!</a>

      </div>
      
    </div>
    
    
  </div>
</Background>

  );
};

export default Page;
