import React from 'react';

import {Image, RecipeProduct} from '@/lib/types';

import CustomImage from '../ui/custom-image';
import './styles.css';

interface Props {
  name: string;
  recipeImg?: Image | null;
  products: RecipeProduct[];
}
export default function RecipeDetailsImage({name, recipeImg, products}: Props) {
  return (
    <div className="m-auto h-[360px] w-full overflow-hidden md:h-[464px] lg:m-0 lg:ml-24 lg:w-1/2 lg:pt-12">
      <div className="circle-menu relative left-20 md:left-0">
        <ul>
          {products.map((item, index) => (
            <li key={index}>
              <a className={`circle-menu-${index}`} href="#">
                <CustomImage
                  className="img rotate-180 transform"
                  quality={100}
                  width={60}
                  height={60}
                  cloudinaryId={item.image?.cloudinaryId}
                  url={item.image?.url}
                  alt={item.name}
                  style={{
                    objectFit: 'contain',
                  }}
                />
                <div></div>
              </a>
            </li>
          ))}
        </ul>
        <div className="absolute left-1/2 top-[60%] h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 transform overflow-hidden rounded-full md:top-1/2 md:h-[270px] md:w-[270px]">
          <CustomImage
            quality={100}
            fill
            cloudinaryId={recipeImg?.cloudinaryId}
            url={recipeImg?.url}
            alt={name}
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
      </div>
    </div>
  );
}
