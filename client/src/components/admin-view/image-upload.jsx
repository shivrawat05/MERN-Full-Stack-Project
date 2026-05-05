// import { useState } from "react";
// import axios from "axios";

// const ImageUpload = ({ onImageUpload }) => {
//   const [selectedLogo, setSelectedLogo] = useState();
//   const [uploading, setUploading] = useState(false);
//   const [uploadError, setUploadError] = useState(null);
//   const [uploadedUrl, setUploadedUrl] = useState(null);

//   const handleLogoChange = (e) => {
//     const file = e.target.files[0];

//     if (file) {
//       setSelectedLogo(file);
//       setUploadError(null);
//       setUploadedUrl(null);
//     }
//   };

//   const handleUpload = async () => {
//     if (!selectedLogo) return;

//     setUploading(true);
//     setUploadError(null);

//     try {
//       const formData = new FormData();
//       formData.append("image", selectedLogo);

//       const response = await axios.post(
//         "http://localhost:4000/api/products/upload-image",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         },
//       );

//       const imageUrl = response.data.url;
//       setUploadedUrl(imageUrl);

//       // Pass the uploaded image URL back to parent component
//       if (onImageUpload) {
//         onImageUpload(imageUrl);
//       }
//     } catch (error) {
//       console.error("Upload error:", error);
//       setUploadError(error.response?.data?.message || "Failed to upload image");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div>
//       <h1>Image Upload</h1>

//       <div className="space-y-4">
//         {/* Image Preview */}
//         {selectedLogo && (
//           <div className="flex flex-col items-center space-y-2">
//             <img
//               src={URL.createObjectURL(selectedLogo)}
//               alt="Product image"
//               className="h-32 w-32 object-cover rounded-lg border border-gray-200"
//             />
//             <p className="text-sm text-gray-600">{selectedLogo.name}</p>
//           </div>
//         )}

//         {/* File Input */}
//         <div className="flex flex-col items-center space-y-2">
//           <label className="cursor-pointer inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleLogoChange}
//               className="hidden"
//             />
//             Choose Product Image
//           </label>
//         </div>

//         {/* Upload Button */}
//         {selectedLogo && (
//           <div className="flex flex-col items-center space-y-2">
//             <button
//               onClick={handleUpload}
//               disabled={uploading}
//               className={`px-4 py-2 rounded transition-colors ${
//                 uploading
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-green-500 hover:bg-green-600 text-white"
//               }`}
//             >
//               {uploading ? "Uploading..." : "Upload Image"}
//             </button>
//           </div>
//         )}

//         {/* Upload Status */}
//         {uploadedUrl && (
//           <div className="text-center">
//             <p className="text-green-600 text-sm">
//               ✓ Image uploaded successfully!
//             </p>
//             <p className="text-xs text-gray-500 break-all">{uploadedUrl}</p>
//           </div>
//         )}

//         {/* Error Message */}
//         {uploadError && (
//           <div className="text-center">
//             <p className="text-red-600 text-sm">✗ {uploadError}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ImageUpload;

import { useState } from "react";
import axios from "axios";

const ImageUpload = ({ onImageUpload, setImageLoadingState }) => {
  const [selectedLogo, setSelectedLogo] = useState();
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);

  const handleLogoChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedLogo(file);
      setUploadError(null);
      setUploadedUrl(null);

      // Automatically upload the image
      await handleUpload(file);
    }
  };

  const handleUpload = async (file) => {
    if (!file) return;

    setUploading(true);
    setUploadError(null);

    // Notify parent component about loading state
    if (setImageLoadingState) {
      setImageLoadingState(true);
    }

    try {
      const formData = new FormData();
      formData.append("my_file", file);

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

      // Notify parent component about loading state
      if (setImageLoadingState) {
        setImageLoadingState(false);
      }
    }
  };

  return (
    <div className={uploading ? "relative" : ""}>
      {uploading && (
        <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50 rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Uploading image...</p>
          </div>
        </div>
      )}

      <div className={uploading ? "blur-sm pointer-events-none" : ""}>
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
    </div>
  );
};

export default ImageUpload;
