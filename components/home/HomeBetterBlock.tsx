import Image from 'next/image';

import icon1 from '@/public/images/home/landing/homeIcon1.svg';
import icon2 from '@/public/images/home/landing/homeIcon2.svg';
import icon3 from '@/public/images/home/landing/homeIcon3.svg';
import icon4 from '@/public/images/home/landing/homeIcon4.svg';

const data = [
  {
    icon: icon1,
    title: 'Products from farmers',
    text: `We personally know each farmer 
    and personally control the process 
    of growing products.`,
  },
  {
    icon: icon2,
    title: 'Organic products only',
    text: `Our products are organic 
    and do not contain synthetic mineral fertilizers and pesticides.
    `,
  },
  {
    icon: icon3,
    title: 'We will refund your money',
    text: `If the product is defective, 
    we will refund the money.`,
  },
  {
    icon: icon4,
    title: 'No heat treatment',
    text: `We offer you only fresh
    products without heat treatment.`,
  },
];
export default function HomeBetterBlock() {
  return (
    <>
      <h2 className="heading-2 m-auto mb-6 mt-10 w-full text-center md:mb-16 md:mt-40 lg:w-2/5">
        Why are we <span className="text-primary">better than the supermarket?</span>
      </h2>
      <div className="flex flex-wrap justify-center gap-2 text-sm text-primary-black">
        {data.map((item, key) => (
          <div key={key} className="h-72 min-w-[150px] flex-1 text-center sm:h-64 sm:max-w-[290px]">
            <Image className="m-auto mb-4 md:mb-8" src={item.icon} alt="icon1" />
            <div className="text-lg font-bold">{item.title}</div>
            <p className="m-auto w-full pt-4 leading-6 md:w-3/4">{item.text}</p>
          </div>
        ))}
      </div>
    </>
  );
}
