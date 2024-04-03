import {ClerkProvider} from '@clerk/nextjs';
import type {Metadata} from 'next';
import Image from 'next/image';

import bgSrc from '@/public/images/auth-bg.png';

export const metadata: Metadata = {
  title: 'Smart Food',
  description: 'Demo ecommerce project on Next.js',
  openGraph: {
    images: [
      {
        url: 'https://res.cloudinary.com/dxplqquzf/image/upload/v1712170225/smart-food/openGraphImg_dvystr.png',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <main className="relative h-screen">
        <Image
          src={bgSrc}
          alt="Background picture for the auth window"
          placeholder="blur"
          quality={100}
          fill
          sizes="100vw"
          style={{
            objectFit: 'cover',
          }}
        />
        <section className="flex h-full w-full items-center	 justify-center lg:justify-start lg:pl-28">
          {children}
        </section>
      </main>
    </ClerkProvider>
  );
}
