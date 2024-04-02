import type {Metadata} from 'next';
import Image from 'next/image';

import bgSrc from '@/public/images/auth-bg.png';

export const metadata: Metadata = {
  title: 'Order accepted',
  description: 'Your order has been accepted!',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative h-full">
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
      <section className="flex h-full w-full items-center justify-center">{children}</section>
    </main>
  );
}
