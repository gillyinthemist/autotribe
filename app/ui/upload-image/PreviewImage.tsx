import NextImage from 'next/image';

import type { FC } from 'react';

type PreviewImageProps = {
  imageUrl: string;
};

export const PreviewImage: FC<PreviewImageProps> = ({ imageUrl = '' }) => {
  return (
    <div className="h-[220px] w-[338px] rounded-xl">
      <div className="relative h-full w-full">
        <NextImage
          src={imageUrl}
          fill
          alt="image"
          priority
          className="left-0 top-0 h-full w-full rounded-2xl object-contain"
          sizes="(min-width: 768px) 100%"
        />
      </div>
    </div>
  );
};
