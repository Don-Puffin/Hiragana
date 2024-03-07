'use client'
import Image from 'next/image'
import Cat from '../components/bird'

export default function Home() {
  return (
    <main style={{ position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'center', transform: 'scale(0.9)' }}>
        <Image 
          src="/BackgroundCastle.jpg"  
          alt="BackgroundCastle" 
          width={1920}
          height={1080}
        />
      </div>
      <div style={{ position: 'absolute', bottom: 100, left: 400 }}>
        <Cat />
      </div>
      <div style={{ position: 'absolute', bottom: 400, right: 700 }}>
        <Image 
          src="/grid.jpg"  
          alt="Grid overlay" 
          width={700}
          height={700}
        />
      </div>
    </main>
  );
}