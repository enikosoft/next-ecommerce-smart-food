'use client';

import {UserButton, useUser} from '@clerk/nextjs';
import Link from 'next/link';
import {VscAccount} from 'react-icons/vsc';

import {Button} from '../../ui/button';

const DotIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
    </svg>
  );
};

const CustomPage = () => {
  return (
    <div>
      <h1>Custom Profile Page</h1>
      <p>This is the custom profile page</p>
    </div>
  );
};

export const LoginIcon = () => {
  const {isSignedIn, isLoaded} = useUser();

  return isSignedIn && isLoaded ? (
    <Button className="w-inherit" variant={'icon'} size={'icon'}>
      <UserButton afterSignOutUrl="/" userProfileMode="navigation" userProfileUrl="/account" />
    </Button>
  ) : (
    <Link href="/sign-in">
      <Button className="w-inherit" variant={'icon'} size={'icon'}>
        <VscAccount className="size-5 sm:size-8" />
      </Button>
    </Link>
  );
};
