import NextImage from 'next/image';
import c from 'clsx';

import BackgroundSvg from 'public/background.svg';

import type { FC } from 'react';
import type { DropzoneInputProps } from 'react-dropzone';

type DropzoneProps = {
	isActive?: boolean;
	onInputProps: <T extends DropzoneInputProps>(props?: T) => T;
};

export const Dropzone: FC<DropzoneProps> = ({ isActive = false, onInputProps }) => {
	return (
		<div
			className={c(
				'w-full h-[250px] transition-colors p-5 sm:p-0 flex flex-col justify-center items-center gap-4 sm:gap-10 border-2 border-dashed rounded-xl overflow-hidden',
				isActive ? 'border-grey bg-dun' : 'border-raisin bg-mag',
			)}
		>
			<input {...onInputProps()} />

		

			<p className={c('text-xs sm:text-sm font-medium text-center', isActive ? 'text-raisin' : 'text-grey')}>
				Drag & Drop your image here
			</p>
		</div>
	);
};
