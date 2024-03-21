"use client";
import { useSearchParams } from "next/navigation"
import { katakanaDummyData } from "@/constants/KatakanaDummyData"
import {useFetchHiraganaData} from "@/constants/HiraganaDummyData"
import { kanjiDummyData } from "@/constants/KanjiDummyData"
import Background from "@/components/Backgrounds"
import GameBird from "@/components/gameBird"
import { useState, useEffect } from "react"
import Question from "@/components/Question"
import GameGrid from "@/components/GameGrid"


const identifyAndReturnAlphabet = (alphabet: string) => {
    if (alphabet === "hiragana") {
        return 
    } else if (alphabet === "katakana") {
        return katakanaDummyData
    } else if (alphabet === "kanji") {
        return kanjiDummyData
    }
}

const Page = () => {
    const originParams = useSearchParams();
    const alphabet = originParams!.get("alphabet");

    const [onlyEnglish, setOnlyEnglish] = useState<string[]>([])
    const [birdState, setBirdState] = useState<"happy" | "neutral" | "sad">("neutral")
    const [questionCharacter, setQuestionCharacter] = useState<string | undefined | null>("")
    const [remainingCharacters, setRemainingCharacters] = useState<string[]>(); //copy of main array, used to keep track of which characters have not been shown yet
    const [japaneseOnly, setJapaneseOnly] = useState<string[]>([])
    const [combined, setCombined] = useState<{ english: string, japanese: string }[]>([])
    const [incorrectAnswers, setIncorrectAnswers] = useState<string[]>([]); //sets a variable for answers

    const { data , loading, error } = useFetchHiraganaData(`http://localhost:8080/generate-${alphabet}?size=20`) 

    console.log(data)

    useEffect(() => {
        if (!alphabet) return;
        if (!data) return;
        let arr = [] as { english: string, japanese: string }[];
        const arrayOfObjects = Object.entries(data).forEach(([key, value]) => {
            console.log(key, value);
            arr.push({
                english: value,
                japanese: key
            })
        });

        setCombined(arr);
        const japaneseData = arr.map((character) => character.japanese);
        const englishData = arr.map((character) => character.english);
        setOnlyEnglish(englishData);
        setJapaneseOnly(japaneseData);
        setRemainingCharacters(englishData);
    }, [alphabet, data]);


    useEffect(() => {
        console.log(remainingCharacters)
        if (remainingCharacters && remainingCharacters.length > 0) {
            const randomIndex = Math.floor(Math.random() * remainingCharacters.length);
            const newCharacter = remainingCharacters[randomIndex];
            setQuestionCharacter(newCharacter);
        }
    }, [remainingCharacters]);

    const cycleToNextCharacter = (prevCharacter: string) => {
        if (remainingCharacters === undefined) return;
        if (remainingCharacters.length === 0) return;
        const eliminatePrevCharacter = remainingCharacters?.filter((character) => character !== prevCharacter);
        setRemainingCharacters(eliminatePrevCharacter);
    }

    useEffect(() => {
        // console.log("Remaining characters", remainingCharacters);      
    }, [remainingCharacters]);

const handleButtonClick = (characterClicked: string) => {
    console.log("Question character", questionCharacter);
    console.log("Character clicked", characterClicked);

    const pairing = combined?.find((character) => character.english === questionCharacter) as { [key: string]: string };

    console.log("Pairing", pairing)

    if (characterClicked === pairing?.japanese!) {
        setBirdState("happy");
        setTimeout(() => {
            setBirdState("neutral");
        }, 1000);
        cycleToNextCharacter(pairing?.english!);
    } else {
        setBirdState("sad");
        setTimeout(() => {
            setBirdState("neutral");
        }, 1000);
        setIncorrectAnswers(prevIncorrectAnswers => [...prevIncorrectAnswers, questionCharacter]); //sets inccorect answers to the array
    }
}
// end game screen for the birdy boy to be well pleased and shit
if (remainingCharacters?.length === 0) {
    return (
      <Background>
        <h1 className="h-screen flex justify-center items-center flex-col text-4xl font-bold text-white">
          <GameBird state="happy" className="animate animate-bounce"/>
          Congratulations! You have completed the game!
          {incorrectAnswers.length > 0 && (
            <div>
              <h2>Incorrect Answers:</h2>//maps over the incorrect answers array
              <ul>
                {incorrectAnswers.map((answer, index) => (
                  <li key={index}>{answer}</li>
                ))}
              </ul>
            </div>
          )}
        </h1>
      </Background>
    )
  }

    if (!alphabet) return null;

    return (
  <Background>
        <h1 className="text-4xl font-bold text-white text-center">{alphabet}</h1>
            <div className="flex gap-10 items-center justify-center">
            <GameBird state={birdState}/>
            <Question character={questionCharacter} />
            </div>
            <GameGrid currentAlphabet={japaneseOnly} onButtonClick={handleButtonClick} />
        </Background>
        
    )
}

export default Page;
