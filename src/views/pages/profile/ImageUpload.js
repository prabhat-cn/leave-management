/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import API from '../../../api'
import ImageCropper from './imageCropper/ImageCropper'
import { toast } from 'react-toastify'

const ImageUpload = () => {
  const [imageSelected, setImageSelected] = useState(null)
  const [imageBaseSelected, setImageBaseSelected] = useState(null)

  const uploadImage = (e) => {
    e.preventDefault()
    console.log('files', imageSelected)
    const formData = new FormData()
    formData.append('profile_picture', imageSelected)

    API.post('/wp-jwt/v1/upload-profile-image', formData)
      .then((response) => {
        if(response.data.status === 404){
            return toast.error('Failed! File Upload')
        } else {
          document.querySelector('#userImage img').setAttribute('src', imageBaseSelected)
          return toast.success('Success! File Uploaded')
        }

      })
      .catch((err) => {
        console.log('err', err)
      })
  }

  const croppedData = (fileType, baseType) => {
    console.log(fileType);
    setImageSelected(fileType)
    setImageBaseSelected(baseType)
  }

  return (
    <>
      <br/>
        {/* <input
          type="file"
          name="profile_picture"
          id="profile_picture"
          onChange={(e) => {
            setImageSelected(e.target.files[0])
          }}
        /> */}
        <ImageCropper name="profile_picture" id="profile_picture" afterCrop={(fileType, baseType) => croppedData(fileType, baseType)} />
        <button type="button" onClick={(e) => uploadImage(e)}>Upload Image</button>
    </>
  )
}

export default ImageUpload
