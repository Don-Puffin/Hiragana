import { NextPage } from "next";
import Link from 'next/link';

const hiraganaIndex: NextPage = () => {
  return (
    
    <main className="flex flex-col items-center justify-center h-screen space-y-5">
      <div className="space-y-3">
        <h2 className="text-2xl font-bold">Learn</h2>
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 15 }, (_, i) => (
            <Link href="/hiragana/quiz" key={i}>
              <button className="bg-blue-500 text-white rounded px-4 py-2">
                Level {i + 1}
              </button>
            </Link>
          ))}
        </div>
      </div>
      <Link href="/hiragana/game">
        <button className="bg-blue-500 text-white rounded px-4 py-2">
          Game
        </button>
      </Link>
    </main>
  );
}

export default hiraganaIndex;