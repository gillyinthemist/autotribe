import axios from 'axios';
import type { DropzoneOptions } from 'react-dropzone';

export const DROPZONE_OPTIONS: DropzoneOptions = {
  accept: {
    'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
  },
  noClick: true,
  maxFiles: 1,
  maxSize: 11000000,
};

type ImageResponse = {
  public_id: string;
  secure_url: string;
};

type UploadFileProps = {
  formData: FormData | null;
  onUploadProgress: (progress: number) => void;
};



export const uploadFile = async ({
  formData,
  onUploadProgress,
}: UploadFileProps): Promise<ImageResponse> => {
  formData!.append("upload_preset", `${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`)
  const { data } = await axios.request<ImageResponse>({
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    url: process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL || '',
    data: formData,
    onUploadProgress(progressEvent) {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total!,
      );
      onUploadProgress(percentCompleted);
    },
  });

  return { secure_url: data.secure_url, public_id: data.public_id };
};
