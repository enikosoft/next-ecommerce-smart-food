import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Products | Smart Food',
  description: 'All products with different categories',
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

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>children</>;
}
