/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import API from '../../../api'
import ImageCropper from './imageCropper/ImageCropper'

const ImageUpload = () => {

    const [ imageSelected, setImageSelected ] = useState()

    const uploadImage = (e) => {
        e.preventDefault()
        console.log('files', imageSelected)
        const formData = new FormData()
        formData.append('file', imageSelected)
        API.post('/wp-jwt/v1/upload-profile-image', formData)
        .then((response) => {
            console.log('response', response)
        }).catch((err) => {
            console.log('err', err)
        })

    }
  return (
    <>
    <form onSubmit={uploadImage} >
      {/* <input type="file" name="profile_picture" id="profile_picture" onChange={(e) => {setImageSelected(e.target.files[0])}} /> */}
      
      <ImageCropper name="profile_picture" id="profile_picture" onChange={(e) => {setImageSelected(e.target.files[0])}}/>
      <button type='submit' >Upload Image</button>
    </form>
    </>
  )
}

export default ImageUpload
