'use client';

import Image from 'next/image';
import {useRouter} from 'next/navigation';
import React from 'react';

import mobileLogo from '@/public/mobileLogo.png';

export default function AccountHeader() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/', {scroll: false});
  };

  return (
    <h2 className="flex-start flex w-full flex-col items-center bg-white py-4 lg:flex-row lg:px-24 lg:py-8">
      <div className="flex items-center lg:w-1/2">
        <Image onClick={handleRedirect} alt="logo" src={mobileLogo} />
        <span
          onClick={handleRedirect}
          className="w-content hidden pl-4 text-sm text-primary underline hover:cursor-pointer lg:block"
        >
          Continue shopping
        </span>
      </div>
      <div className="mt-8 font-sans  text-2xl font-semibold uppercase lg:mt-0 lg:w-[80%]">Account Dashboard</div>
    </h2>
  );
}
