/* eslint-disable prettier/prettier */
import React, { useState,useEffect } from 'react'
import API from '../../../api'
import ImageCropper from './imageCropper/ImageCropper'
import { CAlert } from '@coreui/react'

const ImageUpload = () => {
  const [imageSelected, setImageSelected] = useState()
  const [message, setMessage] = useState(false)
  const [error, setError] = useState(false)

  const uploadImage = (e) => {
    e.preventDefault()
    console.log('files', imageSelected)
    const formData = new FormData()
    formData.append('profile_picture', imageSelected)
    console.log('formData-Cr', formData)
    API.post('/wp-jwt/v1/upload-profile-image', formData)
      .then((response) => {
        console.log('response', response)
        setMessage(true)
        if(response.data.status === 404){
          setMessage(false)
          setError(true)
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

  const getProImage = () => {
    API.get('/wp-jwt/v1/get-profile-image')
      .then((resImage) => {
        // it is also object
        console.log('resImage', resImage.data)
      })
      
      .catch((err) => {
        console.log('err', err)
      })
}

  useEffect(() => {
    getProImage()
  }, [])
  return (
    <>
      {message ? <CAlert color="success">Success! File Uploaded!</CAlert> : null}
      {error ? <CAlert color="danger">Failed! File Upload!</CAlert> : null}<br/>
      <form onSubmit={uploadImage}>
        <input
          type="file"
          name="profile_picture"
          id="profile_picture"
          onChange={(e) => {
            setImageSelected(e.target.files[0])
          }}
        />
        <ImageCropper name="profile_picture" id="profile_picture" 
          onChange={(e) => {
            setImageSelected(e.target.files[0])
          }}/>
        <button type="submit">Upload Image</button>
      </form>
    </>
  )
}

export default ImageUpload
