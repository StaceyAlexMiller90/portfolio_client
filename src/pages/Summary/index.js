import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { selectToken } from '../../store/user/selectors'
import {
	selectUserRecords,
	selectCountOfUserRecords,
} from '../../store/record/selectors'
import { fetchAllUserRecords } from '../../store/record/actions'
import Loading from '../../components/Loading'

import './SummaryPage.css'

const Summary = () => {
	const dispatch = useDispatch()
	const history = useHistory()
	const token = useSelector(selectToken)
	const records = useSelector(selectUserRecords)
	const count = useSelector(selectCountOfUserRecords)

	useEffect(() => {
		if (records.length === 0) {
			dispatch(fetchAllUserRecords())
		}
	}, [])

	if (!records || records.length === 0) {
		return <Loading />
	}

	if (!token) {
		history.push('/')
	}
	const sortedPrice = [...records].sort((a, b) => b.lowestPrice - a.lowestPrice)

	const worthOne = sortedPrice.length >= 1 ? sortedPrice[0] : null
	const worthTwo = sortedPrice.length >= 2 ? sortedPrice[1] : null
	const worthThree = sortedPrice.length >= 3 ? sortedPrice[2] : null

	const totalPrice = records
		.map((record) => record.lowestPrice)
		.reduce((a, b) => a + b, 0)

	const oldestYear = Math.min.apply(
		Math,
		records.map((record) => record.year)
	)

	const genres = records.flatMap((record) => record.genre.split(' | '))

	const aCount = new Map(
		[...new Set(genres)].map((x) => [x, genres.filter((y) => y === x).length])
	)

	const countedGenres = genres
		.map((genre) => {
			return {
				genre: genre,
				count: aCount.get(genre),
			}
		})
		.filter((v, i, a) => a.findIndex((t) => t.genre === v.genre) === i)
		.sort((a, b) => b.count - a.count)

	return (
		<div className="container layout1">
			<div className="box1">
				<p
					className="bigJohn-quote"
					style={{ fontSize: '1.2rem', marginBottom: '1rem' }}
				>
					You have {count} records in total on your shelf
				</p>
				<p className="bigJohn-quote">"Time you enjoy wasting, is not wasted"</p>
				<span className="slimJoe-quote">John Lennon</span>
			</div>
			<div className="box2">
				<p style={{ fontFamily: 'bigJohn', fontSize: '1.5rem' }}>
					You really seem to like
				</p>
				<div
					style={{
						fontFamily: 'regularJohn',
						fontSize: '2rem',
					}}
				>
					<p>{countedGenres[0].genre}</p>
					<p>{countedGenres[1].genre}</p>
					<p>{countedGenres[2].genre}</p>
				</div>
			</div>
			<div className="box3">
				<p style={{ fontSize: '1.5rem' }}>Wipe off that dust </p>
				<p style={{ fontSize: '1rem' }}>your oldest record is from...</p>
				<p
					style={{
						fontSize: '2.5rem',
						backgroundColor: '#ffdd00',
						color: 'black',
					}}
				>
					{oldestYear}
				</p>
			</div>
			<div className="box4">
				<p style={{ fontSize: '1.2rem' }}>If you really need the cash....</p>
				<p style={{ fontSize: '1.5rem', color: '#ff0055' }}>
					Total worth: €{totalPrice}
				</p>
				<p style={{ fontSize: '1.2rem' }}>most valuable records...</p>
			</div>
			<div className="box5">
				<p className="whitenumber">1.</p>
				<p className="price">{worthOne ? `€${worthOne.lowestPrice}` : '-'}</p>
				<p className="whitetext">
					{worthOne ? `${worthOne.title} by ${worthOne.artist}` : '-'}
				</p>
			</div>
			<div className="box6">
				<p className="whitenumber">2.</p>
				<p className="price">{worthTwo ? `€${worthTwo.lowestPrice}` : '-'}</p>
				<p className="whitetext">
					{worthTwo ? `${worthTwo.title} by ${worthTwo.artist}` : '-'}
				</p>
			</div>
			<div className="box7">
				<p className="whitenumber">3.</p>
				<p className="price">
					{worthThree ? `€${worthThree.lowestPrice}` : '-'}
				</p>
				<p className="whitetext">
					{worthThree ? `${worthThree.title} by ${worthThree.artist}` : '-'}
				</p>
			</div>
		</div>
	)
}

export default Summary
