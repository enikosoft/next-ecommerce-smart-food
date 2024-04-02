'use client';

import {ClerkProvider} from '@clerk/nextjs';

import Container from '../../ui/container';
import {LoginIcon} from './loginIcon';
import {Logo} from './logo';

export const SimpleNav = () => {
  return (
    <div className="w-full shadow-header">
      <Container>
        <nav className="flex h-14 items-center md:h-28">
          <div className="flex h-full min-w-[124px] flex-row items-center sm:w-[400px]">
            <div className="hidden pr-10 font-sans text-lg sm:block">+ 280 (0) 123 456</div>
          </div>

          <Logo />

          <div className="flex h-full min-w-[124px] flex-row items-center justify-end sm:w-[400px]">
            <div className="gap-1/2 z-20 flex items-center sm:gap-2">
              <LoginIcon />
            </div>
          </div>
        </nav>
      </Container>
    </div>
  );
};
