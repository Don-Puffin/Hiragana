import { NextPage } from "next";
import Link from 'next/link';
import link from '../../app/page'

const hiraganaIndex: NextPage = () => {
  return (
    
    <main className="flex flex-col items-center justify-center h-screen space-y-5">
      <div className="space-y-3">
        <h2 className="text-2xl font-bold">Learn Hiragana by choosing a level!</h2>
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 15 }, (_, i) => (
            // make these buttons take a 'link' to populate the alphabet!!
            <Link href={`/hiragana/Levels?alphabet=hiragana&level=${i + 1}`} key={i}>
            {/* <Link href="/hiragana/Levels?alphabet=hiragana" key={i}> */}
              <button className="bg-yellow-700 text-white rounded px-4 py-2">
                Level {i + 1}
              </button>
            </Link>
          ))}
        </div>
      </div>
      <Link href="/game?alphabet=hiragana">
        <button className="bg-green-500 text-white rounded px-4 py-2">
          Game
        </button>
      </Link>
    </main>
  );
}

export default hiraganaIndex;