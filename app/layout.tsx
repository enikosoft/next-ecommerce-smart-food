import {Noto_Sans, Roboto, Rubik} from 'next/font/google';

import Hydration from '@/stores/hydration';

import './globals.css';

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
