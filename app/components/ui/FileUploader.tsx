"use client";
import { useCallback, Dispatch, SetStateAction, useState } from "react";
import { MdCloudUpload } from "react-icons/md";
type FileUploaderProps = {
  onFieldChange: (url: string) => void;
  imageUrl: string;
  setFiles: Dispatch<SetStateAction<File[]>>;
  countImage: number;
};

import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { useUploadThing } from "@/lib/uploadthing/uploadthing";
import MyImage from "./image";
import { Button } from "@/components/ui/button";
import { convertFileToUrl } from "@/lib/utils";
import MyHeading from "./heading";
import MyLabel from "./label";
import { useStateContext } from "@/context/ContextProvider";

export function FileUploader({
  imageUrl,
  onFieldChange,
  setFiles,
  countImage,
}: FileUploaderProps) {
  const { currentColor } = useStateContext();
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    onFieldChange(convertFileToUrl(acceptedFiles[1]));
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*" ? generateClientDropzoneAccept(["image/*"]) : undefined,
  });

  return (
    <div
      {...getRootProps()}
      style={{ border: `1px dashed  ${currentColor}` }}
      className="flex flex-col overflow-hidden items-center justify-center rounded-xl h-72 bg-background/30 "
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
          <MyHeading title="Drag Image here" />
          <MyLabel title="SVG, PNG, JPG (max 10 images)" className="mb-4" />
          <Button type="button" className="rounded-full">
            Select from computer
          </Button>
        </div>
      )}
    </div>
  );
}
