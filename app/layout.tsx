import type {Metadata, ResolvingMetadata} from 'next';
import {Noto_Sans, Roboto, Rubik} from 'next/font/google';

import Hydration from '@/stores/hydration';

import './globals.css';

export async function generateMetadata(_p: any, parent: ResolvingMetadata): Promise<Metadata> {
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: 'Smart Food',
    description: 'Demo ecommerce project on Next.js',
    openGraph: {
      images: [
        ...previousImages,
        {
          url: 'https://res.cloudinary.com/dxplqquzf/image/upload/v1712170225/smart-food/openGraphImg_dvystr.png',
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

const notoSans = Noto_Sans({
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const rubik = Rubik({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rubik',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable} ${notoSans.variable} ${rubik.variable}`}>
      <body className="font-roboto">
        <Hydration />
        {children}
      </body>
    </html>
  );
}
