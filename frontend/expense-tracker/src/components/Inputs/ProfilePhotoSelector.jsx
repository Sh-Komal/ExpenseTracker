import React, { useState, useEffect } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setProfilePic = () => {} }) => {
  const inputRef = React.useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Update preview URL when image prop changes
  useEffect(() => {
    // Clear old preview URL to prevent memory leaks
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    
    // Create new preview URL if image exists
    if (image) {
      const preview = URL.createObjectURL(image);
      setPreviewUrl(preview);
    } else {
      setPreviewUrl(null);
    }
    
    // Cleanup function to revoke object URL when component unmounts
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [image]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    
    if (!file) {
      console.log("No file selected.");
      return;
    }
  
    console.log("File selected:", file);
    setProfilePic(file);
  };

  const handleRemoveImage = () => {
    setProfilePic(null);
  };

  const onChooseFile = () => {
    console.log("File input clicked");
    inputRef.current?.click();
  };
  
  return (
    <div className="flex justify-center mb-6">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />

      {!previewUrl ? (
        <div className="w-20 h-20 flex justify-center items-center bg-purple-100 rounded-full relative">
          <LuUser className="text-4xl text-primary" />
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1"
            onClick={onChooseFile}
          >
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img 
            src={previewUrl} 
            alt="profile photo" 
            className="w-20 h-20 rounded-full object-cover" 
          />
          <button 
            type="button" 
            className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1" 
            onClick={handleRemoveImage}
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;