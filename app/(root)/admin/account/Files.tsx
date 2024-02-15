"use client";
import { useCallback, Dispatch, SetStateAction } from "react";
import { MdCloudUpload } from "react-icons/md";
type FileUploaderProps = {
  onFieldChange: (url: string) => void;
  imageUrl: string;
  setFiles: Dispatch<SetStateAction<File[]>>;
  myImage: string;
};

import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { useUploadThing } from "@/lib/uploadthing/uploadthing";
import { Button } from "@/components/ui/button";
import { convertFileToUrl } from "@/lib/utils";
import MyImage from "@/app/components/ui/image";
import MyHeading from "@/app/components/ui/heading";
import MyLabel from "@/app/components/ui/label";
import MyButton from "@/app/components/ui/button";

export function FileUploader({
  imageUrl,
  onFieldChange,
  setFiles,
  myImage,
}: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    onFieldChange(convertFileToUrl(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*" ? generateClientDropzoneAccept(["image/*"]) : undefined,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} className="cursor-pointer" />
      <div className="flex flex-col items-center justify-center">
        {imageUrl ? (
          <>
            <MyImage
              src={imageUrl}
              alt="profile"
              className="w-28 h-28 rounded-full mb-4 object-cover"
            />
            <MyHeading title="Drag photo here" />
            <MyLabel title="SVG, PNG, JPG" className="mb-4" />
          </>
        ) : (
          <>
            <MyImage
              src={myImage ?? "/assets/images/avatar.svg"}
              alt="profile"
              className="w-28 h-28 rounded-full mb-4 object-cover"
            />
            <MyHeading title="Drag photo here" />
            <MyLabel title="SVG, PNG, JPG" className="mb-4" />
          </>
        )}
      </div>
    </div>
  );
}
