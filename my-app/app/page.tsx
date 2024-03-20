import { NextPage } from "next";
import Link from 'next/link';

const items = [
  {
    id: 1,
    title: 'Hiragana',
    link: 'hiragana',
    bgImage: "https://images.unsplash.com/photo-1623779334493-6a6cdddb517c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGlyYWdhbmF8ZW58MHx8MHx8fDA%3D",
  }, 
  {
    id: 2,
    title: 'Katakana',
    link: 'katakana',
    bgImage: "https://images.unsplash.com/photo-1665562011653-e8bfc3ca6602?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 3,
    title: 'Kanji',
    link: 'kanji',
    bgImage: "https://images.unsplash.com/photo-1486303954368-398fea0e72cd?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
]

const GameCard = ({ title, link, bgImage }: {
  title: string,
  link: string,
  bgImage: string
}) => {
  return (
    <Link className="bg-gray-200 p-2 m-2 h-96 w-96 text-white rounded-lg shadow-lg flex items-center justify-center text-4xl font-bold transform transition duration-500 hover:scale-110 cursor-pointer"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex', // Use flexbox layout
        alignItems: 'center', // Center vertically
        justifyContent: 'center', // Center horizontally
        textDecoration: 'none', // Removes underline on hover
        textShadow: '2px 2px 4px #000000'
      }}
      href={`/game?alphabet=${link}`}
    >
      {title}
    </Link>
  );
};

const landingPage: NextPage = () => {
  return (
    <main className="flex items-center justify-center h-screen">
      {
        items.map(item => (
          <GameCard key={item.id} title={item.title} link={item.link} 
            bgImage={item.bgImage}
          />
        ))
      }
    </main>
  );
}

export default landingPage;