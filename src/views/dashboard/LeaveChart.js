import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCol, CCardHeader, CRow } from '@coreui/react'
import { CChartPie } from '@coreui/react-chartjs'
import { CSpinner } from '@coreui/react'
import API from 'src/api'
import { UserDetails } from './UserDetails'

const LeaveChart = () => {
  const [leavesChat, setLeavesChat] = useState({})
  const [allLeave, setAllLeave] = useState([])
  const [userData, setUserData] = useState([])

  const localUserData = () => {
    const localUser = localStorage.getItem('lMuserDataToken')
    if (localUser) {
      const foundUser = JSON.parse(localUser)
      setUserData(foundUser)
    }
  }

  const getAllLeaves = async () => {
    let casualLeaves = []
    let earnLeaves = []
    let sickLeaves = []
    API.get('/wp-jwt/v1/employee-leave-list')
      .then((leaveRes) => {
        console.log('leaveRes', leaveRes)
        setAllLeave(leaveRes.data.data)
        for (const dataObj of leaveRes.data.data) {
          casualLeaves.push(parseInt(dataObj.casual_leave))
          earnLeaves.push(parseInt(dataObj.earn_leave))
          sickLeaves.push(parseInt(dataObj.sick_leave))
        }
        setLeavesChat({
          labels: ['Casual Leaves', 'Earn Leaves', 'Sick Leaves'],
          datasets: [
            {
              data: [casualLeaves, earnLeaves, sickLeaves],
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
              hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
          ],
        })
      })
      .catch((err) => {
        console.log(err)
      })
    // console.log('Leaves', casualLeaves, earnLeaves, sickLeaves)
  }
  useEffect(() => {
    localUserData()
    getAllLeaves()
  }, [])

  return (
    <CRow>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>Leave Count Chart</CCardHeader>
          <CCardBody>
            {!allLeave ? (
              <div className="text-center">
                <CSpinner color="primary" />
              </div>
            ) : (
              <>
                {allLeave.length === 0 ? (
                  <h3 className="d-flex justify-content-center">No leave found!</h3>
                ) : (
                  <>
                    <CChartPie data={leavesChat} />
                  </>
                )}
              </>
            )}
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={6}>
        <CCard className="mb-4">
          {userData.user_role === 'employee' && (
            <>
              <CCardHeader>User Details of Employee</CCardHeader>
            </>
          )}
          {userData.user_role === 'project_manager' && (
            <>
              <CCardHeader>User Details of Project Manager</CCardHeader>
            </>
          )}
          <UserDetails />
        </CCard>
      </CCol>
    </CRow>
  )
}

export default LeaveChart
