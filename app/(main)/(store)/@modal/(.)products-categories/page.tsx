import {getCategories} from '@/data/fetchers/getCategories';
import {NextPage} from 'next';

import CategoriesDialog from '@/components/products/CategoriesDialog';

interface Props {}

const Page: NextPage<Props> = async ({}) => {
  const categories = await getCategories();

  return <CategoriesDialog categories={categories} />;
};

export default Page;
