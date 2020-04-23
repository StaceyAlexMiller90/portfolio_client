import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { selectToken } from '../../store/user/selectors'
import './SummaryPage.css'

const Summary = () => {
	const history = useHistory()
	const token = useSelector(selectToken)

	useEffect(() => {
		if (!token) {
			history.push('/')
		}
	}, [token, history])

	return (
		<div className="container layout1">
			<div className="box1"></div>
			<div className="box2"></div>
			<div className="box3"></div>
			<div className="box4">
				<p>If you really need the cash....</p>{' '}
				<p style={{ fontSize: '1.5rem' }}>most valuable records</p>
			</div>
			<div className="box5">
				<p className="whitenumber">1.</p>
				<p className="whitetext">most valuable records</p>
			</div>
			<div className="box6">
				<p className="whitenumber">2.</p>
				<p className="whitetext">most valuable records</p>
			</div>
			<div className="box7">
				<p className="whitenumber">3.</p>
				<p className="whitetext">most valuable records</p>
			</div>
		</div>
	)
}

export default Summary
