import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const ImageUpload = ({ onUpload, }) => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadCount, setUploadCount] = useState(0);
  const [statusMessage, setStatusMessage] = useState(""); // For showing success/error message

  // Cloudinary Configuration
//   const cloudinaryUploadPreset = "your_upload_preset"; // Replace with your preset
  const cloudinaryURL = "https://api.cloudinary.com/v1_1/dktj0zy3v/image/upload";  // Replace with your Cloudinary account's URL
  const cloudinaryUploadPreset = "Lenscape"; // Replace with your preset

  const onDrop = (acceptedFiles) => {
    const filesWithPreview = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    setUploadedImages((prevImages) => [...prevImages, ...filesWithPreview]);
    setUploadCount((prevCount) => prevCount + filesWithPreview.length);
  };

  const uploadToCloudinary = async () => {
    setStatusMessage(""); // Reset status message
    console.log("Uploading images to Cloudinary...");
    const uploadedURLs = uploadedImages.map((img) => img.url || img.preview);
    const cdnURLS = []
  
    const uploadPromises = uploadedImages.map((file) => {
      if (file.url) return Promise.resolve(); // Skip already uploaded files
  
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", cloudinaryUploadPreset);
  
      return fetch(cloudinaryURL, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Upload failed with status ${response.status}`);
          }
          return response.json(); // Parsing JSON response
        })
        .then((data) => {
          console.log("Upload Response:", data); // Log the full response
          const uploadedURL = data.secure_url;
          cdnURLS.push(uploadedURL);
  
          setUploadedImages((prevImages) =>
            prevImages.map((img) =>
              img.preview === file.preview ? { ...img, url: uploadedURL } : img
            )
          );
        });
    });
  
    try {
      await Promise.all(uploadPromises);
      setStatusMessage("Upload successful! 🎉");
      console.log("Upload successful!");
  
      if (onUpload) {
        console.log("Uploaded URLs:", cdnURLS);
        if (cdnURLS.length > 0)
            onUpload(cdnURLS);
        else
            onUpload(uploadedURLs);

      }
    } catch (error) {
      setStatusMessage("Some uploads failed. Please try again. ❌");
      console.error("Error uploading images:", error);
    }
  };

  const removeImage = (preview) => {
    setUploadedImages((prevImages) =>
      prevImages.filter((img) => img.preview !== preview)
    );
    setUploadCount((prevCount) => prevCount - 1);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple: true,
    onDrop,
  });

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      {/* Drag and Drop Area */}
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-300 p-6 text-center rounded-lg cursor-pointer hover:border-blue-400"
      >
        <input {...getInputProps()} />
        <p className="text-gray-500">Drag & drop images here, or click to select files</p>
      </div>

      {/* Uploaded Images Count */}
      <div className="text-right mt-2 text-sm text-gray-600">
        Selected Images: {uploadCount}
      </div>

      {/* Display Images */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        {uploadedImages.map((file, index) => (
          <div key={index} className="relative">
            <img
              src={file.preview || file.url}
              alt={`Uploaded preview ${index}`}
              className="w-full h-32 object-cover rounded-md"
            />
            <button
              onClick={() => removeImage(file.preview)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Upload Button */}
      <button
        onClick={uploadToCloudinary}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Upload Images
      </button>

      {/* Status Message */}
      {statusMessage && (
        <div
          className={`mt-4 text-center ${
            statusMessage.includes("successful") ? "text-green-500" : "text-red-500"
          }`}
        >
          {statusMessage}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
