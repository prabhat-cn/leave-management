/* eslint-disable prettier/prettier */
import React from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
const Accounts = () => {
  return (
    <>
      <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
      <CDropdownItem href="#">
        <CIcon name="cil-bell" className="me-2" />
        Updates
        <CBadge color="info" className="ms-2">
          42
        </CBadge>
      </CDropdownItem>
      <CDropdownItem href="#">
        <CIcon name="cil-envelope-open" className="me-2" />
        Messages
        <CBadge color="success" className="ms-2">
          42
        </CBadge>
      </CDropdownItem>
      <CDropdownItem href="#">
        <CIcon name="cil-task" className="me-2" />
        Tasks
        <CBadge color="danger" className="ms-2">
          42
        </CBadge>
      </CDropdownItem>
      <CDropdownItem href="#">
        <CIcon name="cil-comment-square" className="me-2" />
        Comments
        <CBadge color="warning" className="ms-2">
          42
        </CBadge>
      </CDropdownItem>
    </>
  )
}

export default Accounts
