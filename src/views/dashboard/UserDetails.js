/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react'
import { CCardBody, CCardTitle, CAvatar } from '@coreui/react'
import { CSpinner } from '@coreui/react'
import API from 'src/api'

export const UserDetails = () => {
  const [userData, setUserData] = useState({})
  const [proImg, setProImg] = useState({})

  const getProfile = async () => {
    try {
      const proData = await API.get('/wp-jwt/v1/get-user-info')
      const bulkData = proData.data.data
      setUserData(bulkData)
    } catch (err) {
      console.log(err.message)
    }
  }

  const getProImage = () => {
    API.get('/wp-jwt/v1/get-profile-image')
      .then((resImage) => {
        // it is also object
        setProImg(resImage.data.data)
      })

      .catch((err) => {
        console.log('err', err)
      })
  }

  useEffect(() => {
    getProfile()
    getProImage()
  }, [])

  return (
    <>
      {proImg.length === 0 ? (
        <div className="text-center">
          <CSpinner color="primary" />
        </div>
      ) : (
        <CCardBody>
          <div className="col mb-3 text-center av-img">
            <img src={proImg.url} id="userProImage" className="userProImage" />
          </div>
          <div className="mb-3 mx-5 mt-4">
            <CCardTitle>
              <h3>
                Name: {userData.first_name} {userData.last_name}
              </h3>
            </CCardTitle>
            <CCardTitle>
              <h5>Designation: {userData.designation}</h5>
            </CCardTitle>
            <CCardTitle>
              <h5>Department: {userData.department}</h5>
            </CCardTitle>
            <CCardTitle>
              <h5>Contact: {userData.emargency_contact_number}</h5>
            </CCardTitle>
            <CCardTitle>
              <h5>Address: {userData.address}</h5>
            </CCardTitle>
          </div>
        </CCardBody>
      )}
    </>
  )
}
