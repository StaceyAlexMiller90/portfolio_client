import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeUserRecord } from '../../store/record/actions'
import './RecordCard.css'
import { TiDeleteOutline } from 'react-icons/ti'

const RecordCard = (props) => {
	const {
		id,
		title,
		artist,
		lowestPrice,
		genre,
		style,
		format,
		year,
		imageUrl,
	} = props
	const dispatch = useDispatch()

	const removeRecord = (id) => {
		dispatch(removeUserRecord(id))
	}
	return (
		<div className="record-card">
			<div className="icon">
				<TiDeleteOutline className="delete" onClick={() => removeRecord(id)} />
			</div>
			<strong>
				<p>{title}</p>
			</strong>
			<strong>
				<p>{artist}</p>
			</strong>
			<img style={{ display: 'block', width: '200px' }} src={imageUrl}></img>
			<p>{genre}</p>
			<p>{style}</p>
			<p>{year}</p>
			<p>{format}</p>
			<button>More...</button>
		</div>
	)
}

export default RecordCard
