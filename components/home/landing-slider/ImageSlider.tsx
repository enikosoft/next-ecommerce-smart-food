'use client';

import Image from 'next/image';
import {useEffect, useState} from 'react';

import {cn} from '@/lib/utils';

import bg1 from '@/public/images/home/landing/bg1.png';
import bg2 from '@/public/images/home/landing/bg2.png';
import bg3 from '@/public/images/home/landing/bg3.png';
import leaf1 from '@/public/images/home/landing/leaf1.png';
import leaf2 from '@/public/images/home/landing/leaf2.png';
import leaf3 from '@/public/images/home/landing/leaf3.png';

export default function ImagesSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [bg1, bg2, bg3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="flex justify-end pt-2 sm:pt-10">
      <div className="relative flex h-[300px] w-full justify-center md:h-[500px] md:w-[866px]">
        <Image src={leaf2} alt="Leaf2" className="absolute -left-14 top-0 z-10 md:left-0" />

        <Image src={leaf1} alt="Leaf1" className="absolute -top-10 right-0 z-10 w-36 md:-right-24 md:-top-36 md:w-80" />
        <Image src={leaf3} alt="Leaf3" className="absolute -right-24 bottom-0 z-10 hidden md:block" />

        {images.map((imageUrl, index) => (
          <Image
            placeholder="blur"
            key={index}
            quality={100}
            sizes="100vw"
            style={{
              objectFit: 'contain',
            }}
            src={imageUrl}
            alt={`Image ${index}`}
            className={cn('absolute left-0 top-0 h-full w-full transition-opacity duration-1000', {
              'opacity-100': index === currentIndex,
              'opacity-0': index !== currentIndex,
            })}
          />
        ))}
      </div>
    </div>
  );
}
