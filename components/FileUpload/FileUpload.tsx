"use client";
import { X } from "lucide-react";
import Image from "next/image";

import React from "react";
import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";
import { Button } from "../ui/button";
interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}
export const FileUpload: React.FC<FileUploadProps> = ({
  endpoint,
  onChange,
  value,
}) => {
    const fileType=value?.split('.').pop()
console.log(fileType);
console.log(value);

    if(value && fileType !=='pdf'){
        return (
            <div className="relative h-20 w-20">
                <Image fill src={value} alt="upload" className="rounded-full" />
                <Button onClick={()=>onChange('')} className="bg-rose-500 absolute text-white  p-1  rounded-full h-6 top-0 right-0 shadow-sm " type="button">
                    <X className="h-4 w-4"/>
                </Button>
            </div>
        )
    }
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
};
