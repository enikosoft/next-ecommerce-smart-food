import {getCategories} from '@/api/fetchers/getCategories';
import {NextPage} from 'next';

import ProductCategoryCard from '../../../../components/products/CategoryCard';

interface Props {}

const Page: NextPage<Props> = async () => {
  const categories = await getCategories();

  return (
    <>
      <h2 className="heading-2 m-auto mb-10 mt-10 text-center">ALL PRODUCTS</h2>
      <div className="flex h-fit">
        <div className=" m-auto flex w-3/4 flex-wrap justify-center gap-8">
          {categories.map((item, index) => (
            <ProductCategoryCard key={index} icon={item?.logo} title={item.name} className="m-0" />
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
