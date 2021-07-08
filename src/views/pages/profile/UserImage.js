/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import {
    CCardBody,
    CForm,
    CAvatar,
    CCardTitle,
} from '@coreui/react'
import API from '../../../api'

const UserImage = () => {
  const [proImge, setProImge] = useState({})

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
              <h3>Alec Thompson</h3>
            </CCardTitle>
            <CCardTitle>
              <h5>Software Engineer</h5>
            </CCardTitle>
            <CCardTitle>
              <h6>Capital Numbers Infotech</h6>
            </CCardTitle>
          </div>
        </CForm>
      </CCardBody>
    </>
  )
}

export default UserImage
