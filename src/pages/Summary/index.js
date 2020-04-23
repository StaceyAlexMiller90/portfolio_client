import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { selectToken } from '../../store/user/selectors'
import { selectAllUserRecords } from '../../store/record/selectors'
import { fetchUserRecords } from '../../store/record/actions'
import Loading from '../../components/Loading'
import './SummaryPage.css'

const Summary = () => {
	const dispatch = useDispatch()
	const history = useHistory()
	const token = useSelector(selectToken)
	const records = useSelector(selectAllUserRecords)
	const sortedPrice = [...records].sort((a, b) => b.lowestPrice - a.lowestPrice)

	const total = [...records]
		.map((record) => record.lowestPrice)
		.reduce((a, b) => a + b, 0)

	useEffect(() => {
		dispatch(fetchUserRecords())
	}, [])

	if (!token) {
		history.push('/')
	}

	if (!records || !records[0]) {
		return <Loading />
	}

	return (
		<div className="container layout1">
			<div className="box1">
				<p className="bigJohn-quote">"Time you enjoy wasting, is not wasted"</p>
				<span className="slimJoe-quote">John Lennon</span>
			</div>
			<div className="box2"></div>
			<div className="box3"></div>
			<div className="box4">
				<p style={{ fontSize: '1.2rem' }}>If you really need the cash....</p>
				<p style={{ fontSize: '1.5rem', color: '#ff0055' }}>
					Total worth: €{total}
				</p>
				<p style={{ fontSize: '1.2rem' }}>most valuable records...</p>
			</div>
			<div className="box5">
				<p className="whitenumber">1.</p>
				<p className="price">{`€${sortedPrice[0].lowestPrice}`}</p>
				<p className="whitetext">{`${sortedPrice[0].title} by ${sortedPrice[0].artist}`}</p>
			</div>
			<div className="box6">
				<p className="whitenumber">2.</p>
				<p className="price">{`€${sortedPrice[1].lowestPrice}`}</p>
				<p className="whitetext">{`${sortedPrice[1].title} by ${sortedPrice[1].artist}`}</p>
			</div>
			<div className="box7">
				<p className="whitenumber">3.</p>
				<p className="price">{`€${sortedPrice[2].lowestPrice}`}</p>
				<p className="whitetext">{`${sortedPrice[2].title} by ${sortedPrice[2].artist}`}</p>
			</div>
		</div>
	)
}

export default Summary
