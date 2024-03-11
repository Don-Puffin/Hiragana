'use client'
import Image from 'next/image';
import { useState } from 'react';
import NavBar from '/components/NavBar';

export default function Home() {
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState('/enaga-neutral.png');
  const correctAnswer = 'a';

  const handleClick = (button: string) => {
    setSelectedButton(button);
    setTimeout(() => {
      setSelectedButton(null); 
    }, 1500);


    if (button === correctAnswer) {
      setImageSrc('/enaga-happy.png');
      setTimeout(() => {
        setImageSrc('/enaga-neutral.png'); 
      }, 1500); 
    } else {
      setImageSrc('/enaga-sad.png');
      setTimeout(() => {
        setImageSrc('/enaga-neutral.png'); 
      }, 1500); 
      // <- doesn't work, might come back to it later 
    }
  };


  const getButtonStyle = (button: string) => {
    if (selectedButton === button) {
      return button === correctAnswer ? 'bg-green-500' : 'bg-red-500';
    }
    return 'bg-blue-500 hover:bg-blue-700 text-white';
  };

  return (
    <main className="relative">
      <NavBar />
      <div className="flex items-center justify-center bg-cover bg-center bg-no-repeat w-full h-screen" style={{ backgroundImage: 'url("/trees6.png")' }}></div>
      <div className="absolute bottom-20 left-70">
        {/* image of enaga-chan */}
        <img id="enaga" src={imageSrc} alt="Picture of Enaga-Chan" className="z-10"/>
         {/* image of enaga-chan */}
      </div>
      
      {/* question card */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-1/4 h-1/2 bg-white rounded-xl shadow-xl flex flex-col items-center justify-center">      
          <p className="text-lg">Find the pronunciation for:</p>
          <div className="text-9xl font-boldmt-8 m-4">あ</div>
          <div className="flex gap-4 mt-8">
            {/* question card */}

            {/* a button code */}
            <button 
              className={`py-2 px-8 text-6xl font-bold rounded-xl ${getButtonStyle('a')}`}
              onClick={() => handleClick('a')}
            >
              a
            </button>
            {/* a button code */}


            {/* o button code */}
            <button 
              className={`py-2 px-8 text-6xl font-bold rounded-xl ${getButtonStyle('o')}`}
              onClick={() => handleClick('o')}
            >
              o
            </button>
             {/* o button code */}
          </div>
        </div>
      </div>
    </main>
  );
}
