import {RedirectToSignIn, SignedIn, SignedOut} from '@clerk/nextjs';
import {NextPage} from 'next';

import Account from '@/components/account/Account';
import AccountHeader from '@/components/account/AccountHeader';
import Container from '@/components/ui/container';

interface Props {
  params: {slug: string};
  searchParams?: {page?: string} | undefined;
}

const Page: NextPage<Props> = ({searchParams}) => {
  const page = searchParams?.page || 1;

  return (
    <>
      <SignedIn>
        <Container className="flex h-screen w-full flex-col items-center justify-center">
          <AccountHeader />
          <Account orderPageId={Number(page)} />
        </Container>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export default Page;
