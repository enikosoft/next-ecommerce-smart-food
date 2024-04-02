import {CldImage, CldImageProps} from 'next-cloudinary';
import Image, {ImageProps, StaticImageData} from 'next/image';
import React from 'react';

interface Props {
  cloudinaryId?: string | null;
  url?: string | StaticImageData;
}

export default function CustomImage({
  cloudinaryId,
  url,
  ...restProps
}: Omit<Props & ImageProps & CldImageProps, 'src'>) {
  return cloudinaryId ? (
    <CldImage {...restProps} alt={restProps.alt} src={cloudinaryId} />
  ) : (
    <Image {...restProps} alt={restProps.alt} src={url!} />
  );
}
