"use client";
import { useSearchParams } from "next/navigation"
import { hiraganaDummyData } from "@/constants/HiraganaDummyData"
import { katakanaDummyData } from "@/constants/KatakanaDummyData"
import { kanjiDummyData } from "@/constants/KanjiDummyData"
import Background from "@/components/Backgrounds"
import GameBird from "@/components/gameBird"
import { useState, useEffect } from "react"
import Question from "@/components/Question"
import GameGrid from "@/components/GameGrid"

const identifyAndReturnAlphabet = (alphabet: string) => {
    if (alphabet === "hiragana") {
        return hiraganaDummyData
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

    useEffect(() => {
        if (!alphabet) return;

        const alphabetData = identifyAndReturnAlphabet(alphabet);
        if (!alphabetData) return;

        const englishData = alphabetData.map((character) => character.english);
        setOnlyEnglish(englishData);
        setRemainingCharacters([...englishData]);
    }, [alphabet]);


    useEffect(() => {
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
        console.log("Remaining characters", remainingCharacters);      
    }, [remainingCharacters]);

const handleButtonClick = (characterClicked: string) => {
    console.log("Button clicked", characterClicked);
    console.log(remainingCharacters);

    const pairing = identifyAndReturnAlphabet(alphabet!)?.find((character) => character.english === questionCharacter) as { [key: string]: string };

    if (characterClicked === pairing?.[alphabet!]) {
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
    }
}

    if (remainingCharacters?.length === 0) {
        return (
            <Background>
                <h1 
                    className="h-screen flex justify-center items-center flex-col text-4xl font-bold text-white"
                >                <GameBird state="happy" className="animate animate-bounce"/>

                    Congratulations! You have completed the game!</h1>
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
            <GameGrid currentAlphabet={alphabet} onButtonClick={handleButtonClick} />
        </Background>
    )
}

export default Page;
