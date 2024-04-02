'use client';

import Image from 'next/image';
import {useState} from 'react';

import {cn} from '@/lib/utils';

import {Button} from '../../ui/button';

// import './styles.css';
import healthyFoodBlockImg from '@/public/images/healthyFoodBlock.png';

export const HealthyFoodBlock = () => {
  const [seeMore, setSeeMore] = useState(false);

  const toggleSeeMore = () => {
    setSeeMore(!seeMore);
  };

  const seeMoreClassName = seeMore ? 'more-content' : '';

  const img = (
    <Image
      src={healthyFoodBlockImg}
      alt="Healthy Food Block Image"
      sizes="100vw"
      style={{
        width: '100%',
        height: 'auto',
      }}
    />
  );

  return (
    <div className="flex flex-col md:flex-row">
      <div className={`hidden h-auto w-5 flex-1 md:block`}>{img}</div>

      <div
        className={cn(
          'healthy-food-block-text relative flex-1 px-6 py-1 font-sans tracking-wider text-primary-black',
          seeMoreClassName
        )}
      >
        <p className="heading-2 max-w-[400px] text-center uppercase lg:text-left">
          If you care about <span className="text-primary">healthy eating</span>, you`re welcome to us!
        </p>
        <div className={`block h-auto flex-1 md:hidden`}>{img}</div>
        <p className="max-w-[560px] pt-6 text-sm leading-7">
          Smart Food - delivery of organic farm products for everyone who cares about their nutrition! We carefully
          select only the best farmers, monitor the cultivation of products, and deliver them right to your doorstep. We
          guarantee quality: our products are made without the use of synthetic pesticides, synthetic mineral
          fertilizers, regulators
          {seeMore && (
            <span>
              ensuring that you receive only the freshest and healthiest food options. With Smart Food, you can enjoy
              peace of mind knowing that you are nourishing your body with wholesome, natural ingredients grown with
              care and dedication.
            </span>
          )}
        </p>

        {!seeMore && (
          <Button
            onClick={toggleSeeMore}
            className="read-more-btn w-[calc(100%-56px)] w-full text-sm sm:w-auto "
            variant={'outline'}
            size={'lg'}
          >
            Read more <div className=""></div>
          </Button>
        )}
      </div>
    </div>
  );
};
