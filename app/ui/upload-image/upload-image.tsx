/**
 * 
 * Modified version of this repo: https://github.com/kevin-sg/nextjs-image-uploader
 * 
 * MIT License
 * Copyright (c) 2023 KevinSa
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

'use client';
import {
  ButtonFile,
  InputLink,
  ProgressCard,
  Dropzone,
  PreviewImage,
} from '@/app/ui/upload-image';

//I shouldn't use an any here but I don't want to make a type for the useUpload hook right now..
export default function UploadImage({u} : any) {
  return (
    <div>
      {!u.isFetching && (
        <div
          {...u.getRootProps({ className: 'dropzone' })}
          className="h-[469px] w-full rounded-xl bg-slate-50 p-8 shadow-none sm:w-[402px] sm:bg-white sm:shadow-lg sm:shadow-gray-200/80"
        >
          <div className="flex h-full w-full flex-col items-center justify-evenly gap-6">
            {u.isSuccess && (
              <i className="fa-sharp fa-solid fa-circle-check text-4xl text-green-600"></i>
            )}

            <h2 className="text-center text-xl font-semibold text-gray-600">
              {u.isSuccess ? 'Uploaded Successfully!' : 'Upload your image'}
            </h2>

            {!u.isSuccess && (
              <p className="text-center text-xs font-medium text-gray-500 sm:text-sm">
                File should be Jpeg, Png, Gif
              </p>
            )}

            {u.image ? (
              <PreviewImage imageUrl={u.image.secure_url} />
            ) : (
              <Dropzone
                isActive={u.isDragActive}
                onInputProps={u.getInputProps}
              />
            )}

            {!u.isSuccess && (
              <span className="text-xs font-medium text-gray-400">Or</span>
            )}

            {!u.isSuccess && (
              <ButtonFile
                onClick={() => u.inputRef.current?.click()}
                inputRef={u.inputRef}
                onChange={u.onChangeFile}
              />
            )}

            {u.isSuccess && <InputLink value={u.image?.secure_url!} />}
          </div>
        </div>
      )}

      {u.isFetching && <ProgressCard progressStatus={u.progressStatus} />}
    </div>
  );
}
