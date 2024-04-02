import {UserProfile} from '@clerk/nextjs';
import React from 'react';

export default function UserAccount() {
  return (
    <UserProfile
      appearance={{
        variables: {
          colorPrimary: '#90C12D',
          fontFamily: 'Roboto',
          fontSize: '1rem',
          borderRadius: '2px',
        },
        elements: {
          formButtonPrimary: 'bg-primary hover:bg-slate-400 text-sm normal-case',
          card: 'shadow-none border-0 w-full m-0 lg:px-24',
          navbar: 'hidden',
          rootBox: 'w-full absolute lg:static',
        },
      }}
      path="/account"
      routing="path"
    />
  );
}
