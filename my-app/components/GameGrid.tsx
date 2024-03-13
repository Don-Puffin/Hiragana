'use client'
import { hiraganaDummyData } from '/public/HiraganaDummyData';

const GameGrid = ({ onButtonClick }) => {
  return (
    <div className="grid grid-cols-4 gap-0">
      {hiraganaDummyData.map((characterClicked, index) => (
        <button
          key={index}
          className={`font-bold py-2 px-4 m-1 rounded ${index % 2 === 0 ? 'bg-black hover:bg-gray-700 text-white' : 'bg-white hover:bg-gray-200 text-black'}`}
          onClick={() => onButtonClick(characterClicked)}
        >
          {characterClicked}
        </button>
      ))}
    </div>
  );
}

export default GameGrid;