import React, { useState, useEffect } from 'react'
import { fetchUserRecords } from '../../store/record/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { selectToken } from '../../store/user/selectors'
import { selectAllUserRecords } from '../../store/record/selectors'
import { getSelectOptions } from '../../functions'
import Loading from '../../components/Loading'
import RecordCard from '../../components/RecordCard'
import '../../components/RecordCard/RecordCard.css'
import TextField from '@material-ui/core/TextField'
import MultipleSelect from '../../components/MultipleSelect'

const Browse = () => {
	const dispatch = useDispatch()
	const token = useSelector(selectToken)
	const history = useHistory()
	const records = useSelector(selectAllUserRecords)
	const [genre, setGenre] = useState([])
	const [style, setStyle] = useState([])
	const [year, setYear] = useState([])
	const [artist, setArtist] = useState([])
	const [title, setTitle] = useState('')

	useEffect(() => {
		dispatch(fetchUserRecords())
	}, [])

	if (!token) {
		history.push('/')
	}
	if (!records) {
		return <Loading />
	}

	const getOptionsRecords = getSelectOptions(records)
	const genreArray = getOptionsRecords('genre')
	const styleArray = getOptionsRecords('style')
	const yearArray = getOptionsRecords('year')
	const artistArray = getOptionsRecords('artist')

	const updateFilter = (key, selection) => {
		if (key === 'genre') {
			setGenre(selection)
		}
		if (key === 'style') {
			setStyle(selection)
		}
		if (key === 'year') {
			setYear(selection)
		}
		if (key === 'artist') {
			setArtist(selection)
		}
	}

	const filteredRecords = records.filter((record) => {
		if (
			(genre.some((item) => record.genre.includes(item)) ||
				genre.length === 0) &&
			(style.some((item) => record.style.includes(item)) ||
				style.length === 0) &&
			(year.some((item) => record.year === parseInt(item)) ||
				year.length === 0) &&
			(artist.some((item) => record.artist.includes(item)) ||
				artist.length === 0) &&
			(record.title.toLowerCase().includes(title.toLowerCase()) || !title)
		) {
			return true
		}
		return false
	})

	return (
		<>
			<div
				style={{
					margin: '20px',
					display: 'flex',
					flexWrap: 'wrap',
					justifyContent: 'left',
				}}
			>
				<TextField
					style={{
						fontFamily: 'regularJohn',
						textTransform: 'uppercase',
						marginRight: '3rem',
					}}
					placeholder="search by title"
					id="outlined-basic"
					label="Title Search"
					variant="outlined"
					onChange={(e) => setTitle(e.target.value)}
				/>
				<MultipleSelect
					options={genreArray}
					label={'genre'}
					updateFilter={updateFilter}
				/>
				<MultipleSelect
					options={styleArray}
					label={'style'}
					updateFilter={updateFilter}
				/>
				<MultipleSelect
					options={yearArray}
					label={'year'}
					updateFilter={updateFilter}
				/>
				<MultipleSelect
					options={artistArray}
					label={'artist'}
					updateFilter={updateFilter}
				/>
			</div>
			{records.length === 0 ? (
				<p>You currently have no records on your shelf</p>
			) : filteredRecords.length === 0 ? (
				<p> No records match your filters </p>
			) : (
				<div className="record-container">
					{filteredRecords.map((record) => {
						return (
							<RecordCard
								key={record.id}
								id={record.id}
								title={record.title}
								artist={record.artist}
								year={record.year}
								genre={record.genre}
								style={record.style}
								format={record.format}
								lowestPrice={record.lowestPrice}
								imageUrl={record.imageUrl}
							/>
						)
					})}
				</div>
			)}
		</>
	)
}

export default Browse
