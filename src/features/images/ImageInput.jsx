/* eslint-disable @next/next/no-img-element */
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const ImageInput = ({ image, onChange }) => {
  const [previewImage, setPreviewImage] = useState(image);

  const onInputChange = (e) => {
    const image = e.target.files[0];
    setPreviewImage(URL.createObjectURL(image));
    onChange(image);
  };

  return (
    <div className="flex items-center gap-4">
      <Input type="file" onChange={onInputChange} />
      {previewImage ? (
        <img
          alt="the preview image"
          src={previewImage}
          className="aspect-square w-12 rounded-md bg-accent"
        />
      ) : null}
    </div>
  );
};
