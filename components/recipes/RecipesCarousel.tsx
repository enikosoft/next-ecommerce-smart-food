import {getRecipes} from '@/api/fetchers/getRecipes';
import {ReactNode} from 'react';

import {Recipe} from '@/lib/types';

import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from '@/components/ui/carousel';

import RecipeCard from './RecipeCard';

interface Props {
  title: ReactNode;
  subtitle: string;
  categoryId?: number;
}

export default async function RecipesCarousel({title, subtitle, categoryId}: Props) {
  const recipes = await getRecipes(undefined, categoryId, 1, 8);

  const arraysForSlider = recipes.data.reduce((accumulator, currentValue, index) => {
    if (index % 2 === 0) {
      accumulator.push([currentValue]);
    } else {
      accumulator[accumulator.length - 1].push(currentValue);
    }
    return accumulator;
  }, [] as Recipe[][]);

  return (
    <>
      <div className="flex flex-col items-center">
        {title}
        <p className="mt-4 text-base text-primary-black">{subtitle}</p>
      </div>
      <Carousel className="mt-24 w-full">
        <CarouselContent className="w-full">
          {arraysForSlider.map((item, index) => {
            return (
              <CarouselItem key={index} className={`xl:basis-1/2`}>
                {item.map((recipe, index) => (
                  <div key={index} className="mb-4 h-48">
                    <RecipeCard recipe={recipe} />
                  </div>
                ))}
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
}
