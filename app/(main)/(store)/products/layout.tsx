import type {Metadata, ResolvingMetadata} from 'next';

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

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
