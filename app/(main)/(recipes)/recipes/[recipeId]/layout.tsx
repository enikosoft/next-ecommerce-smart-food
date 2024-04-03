import {getRecipeById} from '@/data/fetchers/getRecipeById';
import type {Metadata, ResolvingMetadata} from 'next';

export async function generateMetadata(
  {params}: {params: {recipeId: string}},
  parent: ResolvingMetadata
): Promise<Metadata> {
  const recipe = await getRecipeById(Number(params.recipeId));
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${recipe.name} | Smart Food` || 'Recipe | Smart Food',
    description: recipe.description,
    openGraph: {
      title: `${recipe.name} | Smart Food` || 'Recipe | Smart Food',
      description: recipe.description || '',
      images: [
        ...previousImages,
        {
          url:
            recipe?.bannerImg?.url ||
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
