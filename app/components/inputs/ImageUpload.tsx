"use client";
import { FC, useCallback } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );
  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="csiiibpk"
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <button
            className="relative flex flex-col items-center justify-center gap-4 p-20 transition border-2 hover:opacity-70 border-neutral-300 text-neutral-600"
            onClick={() => open?.()}
          >
            <TbPhotoPlus size={50} />
            <p className="text-lg font-semibold">Click to upload</p>
            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  alt="Upload"
                  src={value}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
          </button>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
