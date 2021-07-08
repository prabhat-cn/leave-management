/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import {
    CCardBody,
    CForm,
    CAvatar,
    CCardTitle,
} from '@coreui/react'
import { toast } from 'react-toastify'
import API from '../../../api'
import FileUpload from './file-upload/FileUpload'
import ImageUpload from './ImageUpload'

const UserImage = () => {
  const [proImge, setProImge] = useState({})
  const [userData, setUserData] = useState({})

  // const userInfo = () => {
  //   const userValue = JSON.parse(localStorage.getItem('lMuserDataToken'))
  //   console.log('userInfo', userValue);
  //   setUserData(userValue)
  // }

  const getProfileValues = async () => {
    try {
      const proData = await API.get('/wp-jwt/v1/get-user-info')
      const bulkData = proData.data.data
      console.log('bulkData', bulkData);
      setUserData(bulkData)
    } catch (err) {
      console.log(err.message)
    }
  }

  const getProImage = () => {
      API.get('/wp-jwt/v1/get-profile-image')
        .then((resImage) => {
          // it is also object
          console.log('resImage', resImage.data)
          setProImge(resImage.data.data)
        })

        .catch((err) => {
          console.log('err', err)
        })
  }
  useEffect(() => {
      getProImage()
      getProfileValues()
  }, [])
  return (
    <>
      <CCardBody>
        <CForm name="profile-image" id="profile-image">
            <div className="col mb-3 text-center av-img">
                {/* <CAvatar src="avatars/5.jpg" className="av-imgs" color="secondary" size="xl" /> */}
                <CAvatar src={proImge.url} className="av-imgs" color="secondary" id="userImage" size="xl" />
            </div>
          <div className="mb-3 text-center">
            <CCardTitle>
              <h3>{userData.first_name} {userData.last_name}</h3>
            </CCardTitle>
            <CCardTitle>
              <h5>{userData.designation}</h5>
            </CCardTitle>
            <CCardTitle>
              <h5>{userData.department}</h5>
            </CCardTitle>
          </div>
        </CForm>
      </CCardBody>
      {/* <FileUpload /> */}
      <ImageUpload />
    </>
  )
}

export default UserImage
