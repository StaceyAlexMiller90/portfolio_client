import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { selectToken } from '../../store/user/selectors'

const Summary = () => {
	const history = useHistory()
	const token = useSelector(selectToken)

	useEffect(() => {
		if (!token) {
			history.push('/')
		}
	}, [token, history])

	return <div>Summary</div>
}

export default Summary
