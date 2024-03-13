'use client'
import { useEffect, useState } from 'react';

const BackgroundImages = [
  '/gameBackgrounds/city.png',
  '/gameBackgrounds/park.png',
  '/gameBackgrounds/garden.png',
  '/gameBackgrounds/fuji.png',
  '/gameBackgrounds/trees6.png'
];

const Background = ({ children }) => {
  const [background, setBackground] = useState('');

  useEffect(() => {
    const randomBackgroundIndex = Math.floor(Math.random() * BackgroundImages.length);
    setBackground(BackgroundImages[randomBackgroundIndex]);
  }, []);

  return (
    <div style={{ 
        backgroundImage: `url(${background})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
    }}>
      {children}
    </div>
  );
}

export default Background;