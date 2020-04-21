import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectToken } from '../../store/user/selectors'
import { useHistory } from 'react-router-dom'
import AddRecord from '../../components/AddRecord'

const AddRecords = () => {
	const token = useSelector(selectToken)
	const history = useHistory()

	useEffect(() => {
		if (!token) {
			history.push('/')
		}
	}, [token, history])

	return (
		<div>
			<h3>Add records to your collection!</h3>
			<h5>Take a quick pic & we do the hard work for you!</h5>
			<p>
				This feature uses image recognition technology - once uploaded, your
				image will be scanned for text & matching articles on the web & the
				closest matching result is returned.
			</p>
			! Please ensure that there is no additional text in your image/background
			e.g. promotional stickers
			<AddRecord />
		</div>
	)
}

export default AddRecords
