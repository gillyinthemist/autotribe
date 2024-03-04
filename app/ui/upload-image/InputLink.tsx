import { toast } from 'react-toastify';
import copy from 'copy-to-clipboard';

import type { FC } from 'react';
import { Button } from '../button';

type InputLinkProps = {
  value: string;
};

export const InputLink: FC<InputLinkProps> = ({ value = 'Not Value' }) => {
  return (
    <div className="w-full">
      <label className="relative">
        <input
          type="text"
          disabled
          value={value}
          readOnly
          className="h-10 w-full cursor-not-allowed overflow-hidden truncate rounded-lg border border-raisin bg-white pl-2 pr-24 text-sm text-night"
        />

        <Button
          type="button"
          title="Press to copy"
          className="absolute right-0 top-1/2 block -translate-y-1/2"
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
