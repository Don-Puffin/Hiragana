//produces the 'bingo card' style grid which users need to select the right answer from.
'use client'
import { hiraganaDummyData } from '/public/HiraganaDummyData';

const GameGrid = ({ onButtonClick }) => {
  return (
    <div className="grid grid-cols-4 gap-0">
      {/* maps over the dummy data to produce the grid.  */}
      {hiraganaDummyData.map((characterClicked, index) => (
        <button
          key={index}
          // below adds alternating colours to the grid and hover over effects
          className={`font-bold py-2 px-4 m-1 rounded ${index % 2 === 0 ? 'bg-black hover:bg-gray-700 text-white' : 'bg-white hover:bg-gray-200 text-black'}`}
          // calls characterclicked when button clicked (see hiragana/game/page.tsx )
          onClick={() => onButtonClick(characterClicked)}
        >
          {characterClicked}
        </button>
      ))}
    </div>
  );
}

export default GameGrid;