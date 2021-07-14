import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCol, CCardHeader, CRow } from '@coreui/react'
import { CChartPie, CChartRadar } from '@coreui/react-chartjs'
import API from 'src/api'

const LeaveChart = () => {
  const [leavesChat, setLeavesChat] = useState({})
  const [casualLeave, setCasualLeave] = useState([])

  const getAllLeaves = async () => {
    let casualLeaves = []
    let earnLeaves = []
    let sickLeaves = []
    API.get('/wp-jwt/v1/employee-leave-list')
      .then((leaveRes) => {
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
    getAllLeaves()
  }, [])

  return (
    <CRow>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>Leave Count Chart</CCardHeader>
          <CCardBody>
            <CCardBody>
              <CChartPie data={leavesChat} />
            </CCardBody>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>User Details</CCardHeader>
          <CCardBody>
            <CChartRadar
              data={{
                labels: [
                  'Eating',
                  'Drinking',
                  'Sleeping',
                  'Designing',
                  'Coding',
                  'Cycling',
                  'Running',
                ],
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: 'rgba(220, 220, 220, 0.2)',
                    borderColor: 'rgba(220, 220, 220, 1)',
                    pointBackgroundColor: 'rgba(220, 220, 220, 1)',
                    pointBorderColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(220, 220, 220, 1)',
                    data: [65, 59, 90, 81, 56, 55, 40],
                  },
                  {
                    label: 'My Second dataset',
                    backgroundColor: 'rgba(151, 187, 205, 0.2)',
                    borderColor: 'rgba(151, 187, 205, 1)',
                    pointBackgroundColor: 'rgba(151, 187, 205, 1)',
                    pointBorderColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(151, 187, 205, 1)',
                    data: [28, 48, 40, 19, 96, 27, 100],
                  },
                ],
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default LeaveChart
