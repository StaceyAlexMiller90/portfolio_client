import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
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
			<Link className="logo" exact to="/">
				<span className="record">Record</span>
				<span className="nise">nise</span>
			</Link>
			{open ? (
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
			) : null}
			<button
				className={`hamburger hamburger--arrowalt ${open ? 'is-active' : null}`}
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
