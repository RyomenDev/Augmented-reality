import React from "react";

const ImageUploader = ({ setSelectedImage }) => {
  const handleImageUpload = (event) => {
    const image = event.target.files[0];
    setSelectedImage(URL.createObjectURL(image));
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
    </div>
  );
};

export default ImageUploader;
