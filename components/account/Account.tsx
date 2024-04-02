import {SignOutButton} from '@clerk/nextjs';
import React from 'react';

import {Button} from '../ui/button';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '../ui/tabs';
import Orders from './Orders';
import UserAccount from './UserAccount';

export default function Account({orderPageId}: {orderPageId: number}) {
  return (
    <div className="h-full w-full bg-white py-4 lg:h-[80%] lg:overflow-y-scroll lg:border lg:border-mediumGrey lg:py-8">
      <Tabs defaultValue="account">
        <div className="flex justify-between border-b border-mediumGrey pb-6 lg:px-24">
          <TabsList className="w-72 justify-between bg-white">
            <TabsTrigger value="account">Settings</TabsTrigger>
            <TabsTrigger value="password">Orders history</TabsTrigger>
          </TabsList>
          <SignOutButton>
            <Button className="rounded-sm border-0 bg-white px-3 py-1.5 font-rubik text-base font-semibold text-black hover:cursor-pointer hover:bg-white hover:underline">
              Sign Out
            </Button>
          </SignOutButton>
        </div>

        <TabsContent value="account">
          <UserAccount />
        </TabsContent>
        <TabsContent value="orders">
          <Orders pageId={orderPageId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
