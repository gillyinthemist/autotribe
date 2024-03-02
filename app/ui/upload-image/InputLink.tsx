import { toast } from 'react-toastify';
import copy from 'copy-to-clipboard';

import type { FC } from 'react';
import { Button } from '../button';

type InputLinkProps = {
	value: string;
};

export const InputLink: FC<InputLinkProps> = ({ value = 'Not Value' }) => {
	return (
		<div className='w-full'>
			<label className='relative'>
				<input
					type='text'
					disabled
					value={value}
					readOnly
					className='w-full h-10 text-sm truncate pr-24 bg-white text-night pl-2 border border-raisin rounded-lg overflow-hidden cursor-not-allowed'
				/>

				<Button
					type='button'
					title='Press to copy'
					className='absolute top-1/2 -translate-y-1/2 block right-0'
					onClick={() => {
						const isCopy = copy(value || '');
						if (isCopy) {
							toast.success('Copy to clipboard', { theme: 'light' });
						}
					}}
				>
					Copy link
				</Button>
			</label>
		</div>
	);
};
