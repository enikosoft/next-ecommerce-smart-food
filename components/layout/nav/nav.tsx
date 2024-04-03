'use client';

import {ClerkProvider} from '@clerk/nextjs';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect, useState} from 'react';
import {VscSearch} from 'react-icons/vsc';

import {Button} from '@/components/ui/button';
import Container from '@/components/ui/container';
import {Tabs, TabsList, TabsTrigger} from '@/components/ui/tabs';

import NavbarCartIcon from '../../cart/NavbarCartIcon';
import {LoginIcon} from './loginIcon';
import {Logo} from './logo';
import './styles.css';

export const Nav = () => {
  const pathname = usePathname();

  const [tabValue, setTabValue] = useState(pathname.includes('/recipes') ? 'recipes' : 'products');

  useEffect(() => {
    setTabValue(pathname.includes('/recipes') ? 'recipes' : 'products');
  }, [pathname]);

  return (
    <div className="w-full shadow-header">
      <Container>
        <nav className="flex h-14 items-center first:flex-1 last:flex-1 md:h-28">
          <div className="flex h-full min-w-[124px] flex-row items-center sm:w-[400px]">
            <button className="mr-12 h-12" title="Menu button" type="button">
              <div className="line-1"></div>
              <div className="line-2"></div>
            </button>

            <Tabs value={tabValue} className="hidden md:block">
              <TabsList className="h-10 bg-white">
                <TabsTrigger
                  className=""
                  onClick={() => setTabValue('recipes')}
                  disabled={pathname === '/products-categories'}
                  value="products"
                >
                  <Link href={pathname.includes('/recipes') ? '/products' : '/products-categories'}>Products</Link>
                </TabsTrigger>

                <TabsTrigger value="recipes" onClick={() => setTabValue('recipes')}>
                  <Link href="recipes">Recipes</Link>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <Logo />

          <div className="flex h-full min-w-[124px] flex-row items-center justify-end sm:w-[400px]">
            <div className="hidden pr-10 font-sans text-lg md:block">+ 280 (0) 123 456</div>
            <div className="gap-1/2 z-20 flex items-center sm:gap-2">
              <Button className="w-inherit -rotate-90" variant={'icon'} size={'icon'}>
                <VscSearch className="size-5 sm:size-8" />
              </Button>

              <ClerkProvider afterSignInUrl="/">
                <LoginIcon />
                <NavbarCartIcon />
              </ClerkProvider>
            </div>
          </div>
        </nav>
      </Container>
    </div>
  );
};
