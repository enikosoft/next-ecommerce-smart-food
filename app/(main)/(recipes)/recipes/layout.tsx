import type {Metadata} from 'next';

import {HealthyFoodBlock} from '@/components/home/healthy-food-block/HealthyFoodBlock';
import {SimpleFooter} from '@/components/layout/SimpleFooter';
import {Nav} from '@/components/layout/nav/nav';
import Container from '@/components/ui/container';

export const metadata: Metadata = {
  title: 'Recipes | Smart Food',
  description: 'All recipes with different products',
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
  return (
    <>
      <Nav />
      <Container>{children}</Container>

      <div className="my-10 md:my-40">
        <HealthyFoodBlock />
      </div>

      <SimpleFooter />
    </>
  );
}
