import {ClerkProvider} from '@clerk/nextjs';
import type {Metadata} from 'next';
import Image from 'next/image';

import bgSrc from '@/public/images/auth-bg.png';

export const metadata: Metadata = {
  title: 'Account | Smart Food',
  description: 'Account page',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignUpUrl="/">
      <main className="relative h-screen">
        <Image
          src={bgSrc}
          alt="Background picture for the auth window"
          placeholder="blur"
          quality={100}
          fill
          sizes="100vw"
          className="hidden lg:block"
          style={{
            objectFit: 'cover',
          }}
        />
        <section className="absolute h-screen w-full overflow-x-hidden py-4 lg:overflow-y-hidden">{children}</section>
      </main>
    </ClerkProvider>
  );
}
