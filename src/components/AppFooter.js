import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="#" target="_self" rel="noopener noreferrer">
          Leave Management System
        </a>
        <span className="ms-1">&copy; 2021</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Developed by</span>
        <a href="https://www.capitalnumbers.com/" target="_blank" rel="noopener noreferrer">
          Capital Numbers Infotech
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
