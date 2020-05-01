import React from 'react'
import { NavLink } from 'react-router-dom'
import './NavBar.css'

export default function LoggedOut() {
  return (
    <>
      <NavLink activeClassName="activeNavItem" className="NavItem" to="/login">
        Log in
      </NavLink>
      <NavLink activeClassName="activeNavItem" className="NavItem" to="/signup">
        Sign Up
      </NavLink>
    </>
  )
}
