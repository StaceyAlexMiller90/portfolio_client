import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectToken } from '../../store/user/selectors'
import LoggedIn from './LoggedIn'
import LoggedOut from './LoggedOut'
import './NavBar.css'

export default function NavigationBar() {
  const token = useSelector(selectToken)
  const [open, setOpen] = useState(false)

  const loginLogoutControls = token ? <LoggedIn /> : <LoggedOut />

  return (
    <div className="NavBar">
      <NavLink className="logo" exact to="/">
        <span className="record">Record</span>
        <span className="nise">nise</span>
      </NavLink>
      {open && (
        <div className="NavLinks">
          <NavLink
            activeClassName="activeNavItem"
            className="NavItem"
            exact
            to="/"
          >
            Home
          </NavLink>
          {loginLogoutControls}
        </div>
      )}
      <button
        className={`hamburger hamburger--arrowalt ${open && 'is-active'}`}
        type="button"
        onClick={() => setOpen(!open)}
      >
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
      </button>
    </div>
  )
}
