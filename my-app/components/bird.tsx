import { useState } from 'react';
import Image from 'next/image';

export default function Cat() {
  const [imageIndex, setImageIndex] = useState(0);

  const images = [
    '/enaga-happy.png',
    '/enaga-neutral.png',
    '/enaga-sad.png',
  ];

  const handleClick = () => {
    setImageIndex((currentImageIndex) => (currentImageIndex + 1) % images.length);
  };

  return (
    <div onClick={handleClick}>
      <Image 
        src={images[imageIndex]} 
        alt="Picture of a cat" 
        width={1200} 
        height={1200} 
      />
    </div>
  );
}