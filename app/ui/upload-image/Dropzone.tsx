import NextImage from 'next/image';
import c from 'clsx';

import BackgroundSvg from 'public/background.svg';

import type { FC } from 'react';
import type { DropzoneInputProps } from 'react-dropzone';

type DropzoneProps = {
  isActive?: boolean;
  onInputProps: <T extends DropzoneInputProps>(props?: T) => T;
};

export const Dropzone: FC<DropzoneProps> = ({
  isActive = false,
  onInputProps,
}) => {
  return (
    <div
      className={c(
        'flex h-[250px] w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-xl border-2 border-dashed p-5 transition-colors sm:gap-10 sm:p-0',
        isActive ? 'border-grey bg-dun' : 'border-raisin bg-mag',
      )}
    >
      <input {...onInputProps()} />

      <p
        className={c(
          'text-center text-xs font-medium sm:text-sm',
          isActive ? 'text-raisin' : 'text-grey',
        )}
      >
        Drag & Drop your image here
      </p>
    </div>
  );
};
