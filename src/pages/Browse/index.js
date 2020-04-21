import React, { useState, useEffect } from 'react'
import { fetchUserRecords } from '../../store/record/actions'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllUserRecords } from '../../store/record/selectors'
import Loading from '../../components/Loading'
import RecordCard from '../../components/RecordCard'
import '../../components/RecordCard/RecordCard.css'
import MultipleSelect from '../../components/MultipleSelect'

const Browse = () => {
	const dispatch = useDispatch()
	const records = useSelector(selectAllUserRecords)
	const [genre, setGenre] = useState([])
	const [style, setStyle] = useState([])
	const [year, setYear] = useState([])
	const [artist, setArtist] = useState([])
	const [title, setTitle] = useState('')

	useEffect(() => {
		dispatch(fetchUserRecords())
	}, [])

	const getSelectOptions = (option) => {
		const options = records.flatMap((record) => {
			if (record[option].length > 1) {
				return record[option].split(' | ')
			} else {
				return record[option]
			}
		})
		return [...new Set(options)]
	}

	const genreArray = getSelectOptions('genre')
	const styleArray = getSelectOptions('style')
	const yearArray = getSelectOptions('year')
	const artistArray = getSelectOptions('artist')

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

	if (!records) {
		return <Loading />
	}

	return (
		<>
			<div style={{ display: 'inline' }}>
				<input
					type="text"
					placeholder="search by title"
					onChange={(e) => setTitle(e.target.value)}
				></input>
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
			<div className="body">
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
			</div>
		</>
	)
}

export default Browse
