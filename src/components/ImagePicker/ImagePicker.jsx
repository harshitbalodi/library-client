/* eslint-disable react/prop-types */
import { useState, useRef } from 'react';
import './ImagePicker.css';
import ImagesIcon from '../../assets/images-icon.svg';

const ImagePicker = ({setImage}) => {
    const [previewImage, setPreviewImage] = useState(null);
    const imageInputRef = useRef(null);
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
          setImage(file);
          const reader = new FileReader();
          reader.onload = (e) => setPreviewImage(e.target.result);
          reader.readAsDataURL(file);
        } 
      };
    
      const handleDragOver = (event) => {
        event.preventDefault();
      };
    
      const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
    
        if (file && file.type.startsWith('image/')) {
          handleImageChange({ target: { files: [file] } }); // Simulate image change event
        }
      };
  return (
    <div>
        <div className="image-picker">
              <label htmlFor="image-input">Profile Picture</label>
              <input
                type="file"
                id="image-input"
                ref={imageInputRef}
                onChange={handleImageChange}
                accept="image/*"
                style={{ display: 'none', border: "1px solid black" }}
              />
              <div
                className="image-preview"
                onClick={() => imageInputRef.current.click()} // Open file browser on click
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                {previewImage ? (
                  <img
                    src={previewImage}
                    width={100}
                    alt="Profile preview"
                    style={{ borderRadius: '50%' }}
                  /> // Circle preview
                ) : (
                  <div>
                    <img src={ImagesIcon} alt="" />
                  </div>
                )}
                Drag & Drop or <span className='browse'>Browse</span>
              </div>
            </div>
    </div>
  )
}

export default ImagePicker