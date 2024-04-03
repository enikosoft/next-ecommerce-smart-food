import {ClerkProvider} from '@clerk/nextjs';
import type {Metadata} from 'next';

import Footer from '@/components/layout/Footer';
import {SimpleNav} from '@/components/layout/nav/simple-nav';

export const metadata: Metadata = {
  title: 'Checkout | Smart Food',
  description: 'Checkout Page',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignUpUrl="/">
      <div className="flex min-h-screen flex-col">
        <SimpleNav />
        <div className="flex-grow items-center justify-center">{children}</div>
        <Footer />
      </div>
      {/* </div> */}
    </ClerkProvider>
  );
}
