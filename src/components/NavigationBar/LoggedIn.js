import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { logOut } from '../../store/user/actions'
import './NavBar.css'

export default function LoggedIn() {
  const dispatch = useDispatch()

  return (
    <>
      <NavLink activeClassName="activeNavItem" className="NavItem" to="/browse">
        Browse Collection
      </NavLink>
      <NavLink
        activeClassName="activeNavItem"
        className="NavItem"
        to="/summary"
      >
        Collection Summary
      </NavLink>
      <NavLink
        activeClassName="activeNavItem"
        className="NavItem"
        to="/addrecords"
      >
        Add Records
      </NavLink>
      <NavLink
        className="NavItem"
        to="/"
        variant="contained"
        onClick={() => dispatch(logOut())}
      >
        Logout
      </NavLink>
    </>
  )
}
