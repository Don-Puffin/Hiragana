"use client";
import { useSearchParams } from "next/navigation"
import { hiraganaLevelData } from "@/constants/HiraganaLevelData"
import { katakanaDummyData } from "@/constants/KatakanaDummyData"
import { kanjiDummyData } from "@/constants/KanjiDummyData"
import Background from "@/components/Backgrounds"
import GameBird from "@/components/gameBird"
import { useState, useEffect } from "react"
import Question from "@/components/Question"
import GameGrid from "@/components/GameGrid"

const identifyAndReturnAlphabet = (alphabet: string) => {
    if (alphabet === "hiragana") {
        return hiraganaLevelData
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
            <GameGrid currentAlphabet={[alphabet]} onButtonClick={handleButtonClick} />
        </Background>
    )
}

export default Page;




// 'use client'
// import Image from 'next/image';
// import { useState } from 'react';

// export default function Home() {
//   const [selectedButton, setSelectedButton] = useState<string | null>(null);
//   const [imageSrc, setImageSrc] = useState('/enaga-neutral.png');
//   const correctAnswer = 'a';

//   const handleClick = (button: string) => {
//     setSelectedButton(button);
//     setTimeout(() => {
//       setSelectedButton(null); 
//     }, 1500);


//     if (button === correctAnswer) {
//       setImageSrc('/enaga-happy.png');
//       setTimeout(() => {
//         setImageSrc('/enaga-neutral.png'); 
//       }, 1500); 
//     } else {
//       setImageSrc('/enaga-sad.png');
//       setTimeout(() => {
//         setImageSrc('/enaga-neutral.png'); 
//       }, 1500); 
//       // <- doesn't work, might come back to it later 
//     }
//   };


//   const getButtonStyle = (button: string) => {
//     if (selectedButton === button) {
//       return button === correctAnswer ? 'bg-green-500' : 'bg-red-500';
//     }
//     return 'bg-blue-500 hover:bg-blue-700 text-white';
//   };

//   return (
//     <main className="relative">
//       <div className="flex items-center justify-center bg-cover bg-center bg-no-repeat w-full h-screen" style={{ backgroundImage: 'url("/trees6.png")' }}></div>
//       <div className="absolute bottom-20 left-70">
//         {/* image of enaga-chan */}
//         <img id="enaga" src={imageSrc} alt="Picture of Enaga-Chan" className="z-10"/>
//          {/* image of enaga-chan */}
//       </div>
      
//       {/* question card */}
//       <div className="absolute inset-0 flex items-center justify-center">
//         <div className="w-1/4 h-1/2 bg-white rounded-xl shadow-xl flex flex-col items-center justify-center">      
//           <h2 className="text-lg">Find the pronunciation for:</h2>
//           <div className="text-9xl font-boldmt-8 m-4">あ</div>
//           <div className="flex gap-4 mt-8">
//             {/* question card */}

//             {/* a button code */}
//             <button 
//               className={`py-2 px-8 text-6xl font-bold rounded-xl ${getButtonStyle('a')}`}
//               onClick={() => handleClick('a')}
//             >
//               a
//             </button>
//             {/* a button code */}


//             {/* o button code */}
//             <button 
//               className={`py-2 px-8 text-6xl font-bold rounded-xl ${getButtonStyle('o')}`}
//               onClick={() => handleClick('o')}
//             >
//               o
//             </button>
//              {/* o button code */}
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }
