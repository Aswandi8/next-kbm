"use client";
import { useCallback, Dispatch, SetStateAction } from "react";
import { MdCloudUpload } from "react-icons/md";
type FileUploaderProps = {
  onFieldChange: (url: string) => void;
  imageUrl: string;
  setFiles: Dispatch<SetStateAction<File[]>>;
};

import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { useUploadThing } from "@/lib/uploadthing";
import MyImage from "./image";
import { Button } from "@/components/ui/button";
import { convertFileToUrl } from "@/lib/utils";
import MyHeading from "./heading";
import MyLabel from "./label";

export function FileUploader({
  imageUrl,
  onFieldChange,
  setFiles,
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
    <div
      {...getRootProps()}
      className="flex flex-col overflow-hidden items-center justify-center rounded-xl h-72 bg-gray-300/50"
    >
      <input {...getInputProps()} className="cursor-pointer" />

      {imageUrl ? (
        <div className="flex h-full w-full justify-center border-2 border-dashed">
          <MyImage
            alt="image"
            src={imageUrl}
            className="w-full object-cover object-center h-auto rounded-xl"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <MdCloudUpload className="text-5xl mb-2" />
          <MyHeading title="Drag photo here" />
          <MyLabel title="SVG, PNG, JPG" className="mb-4" />
          <Button type="button" className="rounded-full">
            Select from computer
          </Button>
        </div>
      )}
    </div>
  );
}
