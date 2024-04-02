import React from 'react';
import {FaInstagramSquare} from 'react-icons/fa';
import {FaSquareFacebook} from 'react-icons/fa6';

import Container from '@/components/ui/container';

const Footer = async () => {
  return (
    <div className="relative flex h-24 items-center bg-primary-black">
      <Container className="w-full">
        <footer className="flex h-auto justify-between text-mediumGrey">
          <div className="m-auto text-center">Smart Food - delivery farm products 2024</div>
          <div className="flex max-w-32 gap-4">
            <FaInstagramSquare className="text-3xl text-primary" />
            <FaSquareFacebook className="text-3xl text-primary" />
          </div>
        </footer>
      </Container>
    </div>
  );
};

export default Footer;
