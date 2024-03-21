//produces the 'bingo card' style grid which users need to select the right answer from.
'use client'

import { kanjiDummyData } from '@/constants/KanjiDummyData';
import { katakanaDummyData } from '@/constants/KatakanaDummyData';
// import hiraganaData from  '../app/hiragana/game/page';

const GameGrid = ({ onButtonClick, currentAlphabet }: {
  
  onButtonClick: (selectedItem: string) => void;
  currentAlphabet: [] | string [];
}) => {

  return (
    <div className="relative">
      <img src="tree grid 2.png" className="h-96 mx-auto" style={{ position: 'relative', zIndex: '1' }} />
      <div className="grid absolute grid-cols-4 gap-0 inset-16 mx-auto h-1/2 w-1/5" style={{ position: 'absolute', zIndex: '2' }}>
        {
            currentAlphabet.map((characterClicked, index) => (
              <button
                key={index}
                // below adds alternating colours to the grid and hover over effects
                className={`font-bold rounded py-2.5 px-4 m-1 text-black hover:font-bold transition-transform hover:transform hover:scale-150`}                // calls characterclicked when button clicked (see hiragana/game/page.tsx )
                // calls characterclicked when button clicked (see hiragana/game/page.tsx )
                onClick={() => onButtonClick(characterClicked)}
              >
                {characterClicked}
              </button>
            ))
}
      </div>
    </div>
  );
}

export default GameGrid;
