// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

import { useState } from "react";
import axios from "axios";

// const ImageUpload = ({ setImageLoadingState, onImageUpload }) => {
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [previews, setPreviews] = useState([]);

//   const handleFileChange = async (event) => {
//     const files = Array.from(event.target.files);
//     setSelectedFiles(files);

//     // Create previews for selected files
//     const newPreviews = files.map((file) => URL.createObjectURL(file));
//     setPreviews((prev) => [...prev, ...newPreviews]);

//     // Upload to Cloudinary immediately
//     const cloudinaryUrls = [];

//     for (const file of files) {
//       try {
//         const formData = new FormData();
//         formData.append("file", file);
//         formData.append("upload_preset", "your_upload_preset"); // Replace with your Cloudinary preset

//         const response = await fetch(
//           "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", // Replace with your cloud name
//           {
//             method: "POST",
//             body: formData,
//           },
//         );

//         const result = await response.json();

//         const imageData = {
//           url: result.secure_url,
//           name: file.name,
//           size: file.size,
//           publicId: result.public_id,
//         };

//         cloudinaryUrls.push(imageData);
//         console.log("Cloudinary upload success:", imageData);
//       } catch (error) {
//         console.error("Cloudinary upload failed:", error);
//       }
//     }

//     if (onImageUpload) {
//       onImageUpload(cloudinaryUrls);
//     }
//   };

//   const handleUpload = async () => {
//     if (selectedFiles.length === 0) return;

//     const formData = new FormData();
//     selectedFiles.forEach((file) => {
//       formData.append("images", file);
//     });

//     try {
//       setImageLoadingState(true);

//       const response = await fetch(
//         "http://localhost:5000/api/admin/products/upload-image",
//         {
//           method: "POST",
//           body: formData,
//         },
//       );

//       const result = await response.json();

//       // Log image URLs to console
//       console.log("Uploaded image URLs:", result.imageUrls);
//       console.log("Upload response:", result);

//       // Pass image URLs to parent component
//       if (onImageUpload) {
//         onImageUpload(result.imageUrls);
//       }

//       // Clear selections after upload
//       setSelectedFiles([]);
//       setPreviews([]);
//     } catch (error) {
//       console.error("Upload failed:", error);
//     } finally {
//       setImageLoadingState(false);
//     }
//   };

//   const removeImage = (index) => {
//     setPreviews((prev) => prev.filter((_, i) => i !== index));
//     setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="space-y-4">
//       <div>
//         <Label htmlFor="images">Choose Images</Label>
//         <div className="flex items-center justify-center w-full">
//           <Input
//             id="images"
//             type="file"
//             multiple
//             accept="image/*"
//             onChange={handleFileChange}
//             className="hidden"
//           />
//           <Button
//             type="button"
//             variant="outline"
//             onClick={() => document.getElementById("images").click()}
//           >
//             Choose Images
//           </Button>
//         </div>
//       </div>

//       {/* Image Previews */}
//       {previews.length > 0 && (
//         <div className="grid grid-cols-4 gap-4">
//           {previews.map((preview, index) => (
//             <div key={index} className="relative group">
//               <img
//                 src={preview}
//                 alt={`Preview ${index + 1}`}
//                 className="h-24 w-full object-cover rounded-lg border border-gray-200"
//               />
//               <Button
//                 type="button"
//                 variant="destructive"
//                 size="sm"
//                 className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
//                 onClick={() => removeImage(index)}
//               >
//                 ×
//               </Button>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Upload Button */}
//       {selectedFiles.length > 0 && (
//         <div className="flex justify-center mt-4"></div>
//       )}
//     </div>
//   );
// };

// export default ImageUpload;

const ImageUpload = ({ onImageUpload }) => {
  const [selectedLogo, setSelectedLogo] = useState();
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedLogo(file);
      setUploadError(null);
      setUploadedUrl(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedLogo) return;

    setUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append("image", selectedLogo);

      const response = await axios.post(
        "http://localhost:4000/api/products/upload-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      const imageUrl = response.data.url;
      setUploadedUrl(imageUrl);

      // Pass the uploaded image URL back to parent component
      if (onImageUpload) {
        onImageUpload(imageUrl);
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadError(error.response?.data?.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h1>Image Upload</h1>

      <div className="space-y-4">
        {/* Image Preview */}
        {selectedLogo && (
          <div className="flex flex-col items-center space-y-2">
            <img
              src={URL.createObjectURL(selectedLogo)}
              alt="Product image"
              className="h-32 w-32 object-cover rounded-lg border border-gray-200"
            />
            <p className="text-sm text-gray-600">{selectedLogo.name}</p>
          </div>
        )}

        {/* File Input */}
        <div className="flex flex-col items-center space-y-2">
          <label className="cursor-pointer inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="hidden"
            />
            Choose Product Image
          </label>
        </div>

        {/* Upload Button */}
        {selectedLogo && (
          <div className="flex flex-col items-center space-y-2">
            <button
              onClick={handleUpload}
              disabled={uploading}
              className={`px-4 py-2 rounded transition-colors ${
                uploading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600 text-white"
              }`}
            >
              {uploading ? "Uploading..." : "Upload Image"}
            </button>
          </div>
        )}

        {/* Upload Status */}
        {uploadedUrl && (
          <div className="text-center">
            <p className="text-green-600 text-sm">
              ✓ Image uploaded successfully!
            </p>
            <p className="text-xs text-gray-500 break-all">{uploadedUrl}</p>
          </div>
        )}

        {/* Error Message */}
        {uploadError && (
          <div className="text-center">
            <p className="text-red-600 text-sm">✗ {uploadError}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
