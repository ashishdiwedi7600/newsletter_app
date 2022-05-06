import React from 'react'
import { useState } from 'react';
import './uploadimage.css'
export default function Uploadimage(props) {

  const { uploadImage, setUploadImage } = props
  const fileTypes = ['image/png', 'image/jpeg', 'image/PNG', 'image/JPEG'];
  const handleimgPreview = (e) => {
    let filesArr = Object.values(e.target.files);
    console.log(filesArr);
    if (fileTypes.includes(filesArr[0].type)) {
      setUploadImage([...uploadImage, filesArr]);
    }
    else {
      alert('insert proper image extension .png , .jpeg');
    }

  }

  return (
    <>
      <div class="image-upload">
        <label for="file-input">
          <img className='upload-icon'
            src="https://img.icons8.com/office/80/000000/upload--v1.png" />
        </label>
        <input multiple draggable={true} id="file-input" type="file" onChange={handleimgPreview} />
      </div>
    </>
  )
}
