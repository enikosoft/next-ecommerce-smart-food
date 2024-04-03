import {getProductById} from '@/data/fetchers/getProductById';
import type {Metadata, ResolvingMetadata} from 'next';

export async function generateMetadata(
  {params}: {params: {productId: string}},
  parent: ResolvingMetadata
): Promise<Metadata> {
  const product = await getProductById(Number(params.productId));

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${product.name} | Smart Food` || 'Product | Smart Food',
    description: product.description,
    openGraph: {
      title: `${product.name} | Smart Food` || 'Product | Smart Food',
      description: product.description,
      images: [
        ...previousImages,
        {
          url:
            product.image?.url ||
            'https://res.cloudinary.com/dxplqquzf/image/upload/v1712170225/smart-food/openGraphImg_dvystr.png',
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
