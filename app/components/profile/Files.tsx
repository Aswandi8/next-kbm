"use client";
import { useCallback, Dispatch, SetStateAction } from "react";
type FileUploaderProps = {
  onFieldChange: (url: string) => void;
  imageUrl: string;
  setFiles: Dispatch<SetStateAction<File[]>>;
};
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { convertFileToUrl } from "@/lib/utils";
import MyImage from "@/app/components/ui/image";
import MyHeading from "@/app/components/ui/heading";
import MyLabel from "@/app/components/ui/label";
import { useSession } from "next-auth/react";
export function FileUploader({
  imageUrl,
  onFieldChange,
  setFiles,
}: FileUploaderProps) {
  const { data: session } = useSession();
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
      onFieldChange(convertFileToUrl(acceptedFiles[0]));
    },
    [onFieldChange, setFiles]
  );
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
              src={session?.user?.photo ?? "/assets/images/avatar.svg"}
              alt="profile"
              className="w-28 h-28 rounded-full mb-4 object-cover"
            />
            <MyHeading title="Drag photo here" />
            <MyLabel title="SVG, PNG, JPG" className="" />
          </>
        )}
      </div>
    </div>
  );
}
