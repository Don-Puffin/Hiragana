import { NextPage } from "next";
import Link from 'next/link';
import NavBar from "../components/NavBar";

const landingPage: NextPage = () => {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <NavBar />
      <div className="text-blue-500 text-2xl mb-5">Front page of the game!</div>
      <Link href="/hiragana">
        <button className="bg-gray-200 p-2 m-2">Hiragana game</button>
      </Link>
      <Link href="/katakana">
        <button className="bg-gray-200 p-2 m-2">Katakana game</button>
      </Link>
      <Link href="/kanji">
        <button className="bg-gray-200 p-2 m-2">Kanji game</button>
      </Link>
    </main>
  );
}

export default landingPage;