import type { FC } from 'react';

type ProgressCardProps = {
  progressStatus: number;
};

export const ProgressCard: FC<ProgressCardProps> = ({ progressStatus }) => {
  const width = progressStatus.toString().concat('%');

  return (
    <div className="flex h-[250px] w-full flex-col items-center justify-center gap-8 rounded-xl bg-white px-8 shadow-lg shadow-gray-200/80">
      <h2 className="w-full text-left text-xl font-semibold capitalize text-gray-600">
        Uploading...
      </h2>
      <div className="relative h-2 w-full rounded bg-red-50">
        <div
          className="absolute inset-y-0 h-full rounded bg-blue-500 transition-[width]"
          style={{ width }}
        />
      </div>
    </div>
  );
};
