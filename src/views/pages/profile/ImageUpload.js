/* eslint-disable prettier/prettier */
import React, { useState,useEffect } from 'react'
import API from '../../../api'
import ImageCropper from './imageCropper/ImageCropper'
import { CAlert } from '@coreui/react'

const ImageUpload = () => {
  const [imageSelected, setImageSelected] = useState(null)
  const [imageBaseSelected, setImageBaseSelected] = useState(null)
  const [message, setMessage] = useState(false)
  const [error, setError] = useState(false)

  const uploadImage = (e) => {
    e.preventDefault()
    console.log('files', imageSelected)
    const formData = new FormData()
    formData.append('profile_picture', imageSelected)

    API.post('/wp-jwt/v1/upload-profile-image', formData)
      .then((response) => {
        if(response.data.status === 404){
          setMessage(false)
          setError(true)
        } else {
          setMessage(true)
          document.querySelector('#userImage img').setAttribute('src', imageBaseSelected)
        }
        setTimeout(() => {
          setMessage(false)
          setError(false)
        }, 4000)

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
      {message ? <CAlert color="success">Success! File Uploaded!</CAlert> : null}
      {error ? <CAlert color="danger">Failed! File Upload!</CAlert> : null}<br/>
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
