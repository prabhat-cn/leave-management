import React, { lazy } from 'react'

import { CCard } from '@coreui/react'
import UserViews from './extra-widgets/UserViews.js'
import BarsCell from './extra-widgets/BarsCell.js'
import LeaveGraph from './LeaveGraph.js'

const WidgetsDropdown = lazy(() => import('../components/widgets/WidgetsDropdown.js'))
const WidgetsBrand = lazy(() => import('../components/widgets/WidgetsBrand.js'))

const Dashboard = (props) => {
  // role based auth start
  // console.log(localStorage.getItem('lMuserDataToken'))
  if (localStorage.getItem('lMuserDataToken') !== null) {
    const userData = JSON.parse(localStorage.getItem('lMuserDataToken'))
    if (userData.user_role === 'hr') {
      alert('You are the Hr, You have not any access')
      localStorage.removeItem('lMuserDataToken')
      window.location.href = '/'
    }
    if (userData.user_role === 'administrator') {
      alert('You are the Admin, You have not any access')
      localStorage.removeItem('lMuserDataToken')
      window.location.href = '/'
    }
  }
  // role based auth end

  return (
    <>
      {/* <WidgetsDropdown /> */}
      <CCard className="mb-4">
        <LeaveGraph />
        {/* <UserViews /> */}
      </CCard>

      {/* <WidgetsBrand withCharts /> */}

      {/* <BarsCell /> */}
    </>
  )
}

export default Dashboard
