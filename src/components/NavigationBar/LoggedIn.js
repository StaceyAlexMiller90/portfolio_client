import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../../store/user/actions'
import { selectUser } from '../../store/user/selectors'
import { NavLink } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import './NavBar.css'

export default function LoggedIn() {
	const dispatch = useDispatch()
	const user = useSelector(selectUser)

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
