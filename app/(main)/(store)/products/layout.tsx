import type {Metadata} from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
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
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
