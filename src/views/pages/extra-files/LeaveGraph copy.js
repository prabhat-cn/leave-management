/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { CButton, CButtonGroup, CCardBody, CCol, CRow } from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import API from 'src/api'

const LeaveGraph = () => {

  const [ leavesChat, setLeavesChat ] = useState({})
  const [casualLeave, setCasualLeave] = useState([])
  const [earnLeave, setEarnLeave] = useState([])
  const [sickLeave, setSickLeave] = useState([])


  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const getAllLeaves = async () => {
    let casualLeaves = [];
    let earnLeaves = [];
    let sickLeaves = [];
    API.get('/wp-jwt/v1/employee-leave-list')
    .then((leaveRes) => {
      console.log('leaveRes', leaveRes);
      for(const dataObj of leaveRes.data.data){
        casualLeaves.push(parseInt(dataObj.casual_leave));
        earnLeaves.push(parseInt(dataObj.earn_leave));
        sickLeaves.push(parseInt(dataObj.sick_leave));
      }
    }).catch((err) => {
      console.log(err);
    })
    console.log('Leaves', casualLeaves, earnLeaves, sickLeaves);
  }
  useEffect(() => {
    getAllLeaves()
  }, [])
  return (
    <>
      <CCardBody>
        <CRow>
          <CCol sm="5">
            <h4 id="traffic" className="card-title mb-0">
              Leaves
            </h4>
            <div className="small text-medium-emphasis">January - December 2021</div>
          </CCol>
          <CCol sm="7" className="d-none d-md-block">
            <CButton color="primary" className="float-end">
              <CIcon name="cil-cloud-download" />
            </CButton>
            <CButtonGroup className="float-end me-3">
              {['Day', 'Month', 'Year'].map((value) => (
                <CButton
                  color="outline-secondary"
                  key={value}
                  className="mx-0"
                  active={value === 'Month'}
                >
                  {value}
                </CButton>
              ))}
            </CButtonGroup>
          </CCol>
        </CRow>
        <CChartLine
          style={{ height: '300px', marginTop: '40px' }}
          data={{
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
              {
                label: 'My First dataset',
                backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
                borderColor: getStyle('--cui-info'),
                pointHoverBackgroundColor: getStyle('--cui-info'),
                borderWidth: 2,
                data: [
                  random(50, 200),
                  random(50, 200),
                  random(50, 200),
                  random(50, 200),
                  random(50, 200),
                  random(50, 200),
                  random(50, 200),
                ],
                fill: true,
              },
              {
                label: 'My Second dataset',
                backgroundColor: 'transparent',
                borderColor: getStyle('--cui-success'),
                pointHoverBackgroundColor: getStyle('--cui-success'),
                borderWidth: 2,
                data: [
                  random(50, 200),
                  random(50, 200),
                  random(50, 200),
                  random(50, 200),
                  random(50, 200),
                  random(50, 200),
                  random(50, 200),
                ],
              },
              {
                label: 'My Third dataset',
                backgroundColor: 'transparent',
                borderColor: getStyle('--cui-danger'),
                pointHoverBackgroundColor: getStyle('--cui-danger'),
                borderWidth: 1,
                borderDash: [8, 5],
                data: [65, 65, 65, 65, 65, 65, 65],
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              x: {
                grid: {
                  drawOnChartArea: false,
                },
              },
              y: {
                ticks: {
                  beginAtZero: true,
                  maxTicksLimit: 5,
                  stepSize: Math.ceil(250 / 5),
                  max: 250,
                },
              },
            },
            elements: {
              line: {
                tension: 0.4,
              },
              point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 4,
                hoverBorderWidth: 3,
              },
            },
          }}
        />
      </CCardBody>
    </>
  )
}

export default LeaveGraph
