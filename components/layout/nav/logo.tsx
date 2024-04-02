'use client';

import Image from 'next/image';
import {useRouter} from 'next/navigation';

import logo from '@/public/logo.png';
import mobileLogo from '@/public/mobileLogo.png';

export const Logo = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/');
  };

  return (
    <div
      onClick={handleRedirect}
      className="relative m-auto flex h-7 w-32 shrink-0 items-center justify-center rounded-full bg-white hover:cursor-pointer md:-top-2 md:h-32"
    >
      <Image alt="logo" className="hidden md:block" src={logo} />
      <Image alt="logo" className="block md:hidden" src={mobileLogo} />
    </div>
  );
};
