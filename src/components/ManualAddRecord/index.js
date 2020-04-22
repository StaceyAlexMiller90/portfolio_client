import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import { selectToken } from '../../store/user/selectors'
import { selectSuggestions } from '../../store/suggestion/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import { FormGroup } from '@material-ui/core'
import { addARecord } from '../../store/record/actions'

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '40ch',
		},
	},
}))

const ManualAddRecord = () => {
	const suggestions = useSelector(selectSuggestions)
	const [record, setRecord] = useState({
		id: null,
		title: null,
		artist: null,
		genre: null,
		style: null,
		format: null,
		lowestPrice: 0,
		year: null,
		imageUrl: suggestions.uploadImage,
	})

	const dispatch = useDispatch()
	const token = useSelector(selectToken)
	const classes = useStyles()
	const history = useHistory()

	const addRecord = () => {
		dispatch(addARecord(record))
	}

	if (!token) {
		history.push('/login')
	}

	return (
		<Container maxWidth="sm">
			<form className={classes.root}>
				<h1 className="mt-5 mb-5">Login</h1>
				<FormGroup>
					<TextField
						id="outlined-basic"
						label="title"
						variant="outlined"
						value={record.title}
						onChange={(event) =>
							setRecord({ ...record, title: event.target.value })
						}
						type="text"
						placeholder="Enter the record title"
						required
					/>
				</FormGroup>
				<FormGroup>
					<TextField
						id="outlined-basic"
						label="artist"
						variant="outlined"
						value={record.artist}
						onChange={(event) =>
							setRecord({ ...record, artist: event.target.value })
						}
						type="text"
						placeholder="Enter the artist"
						required
					/>
				</FormGroup>
				<FormGroup>
					<Button variant="outlined" type="submit" onClick={addRecord}>
						Add record
					</Button>
				</FormGroup>
				<Link to="/signup" style={{ color: 'black' }}>
					Click here to sign up
				</Link>
			</form>
		</Container>
	)
}

export default ManualAddRecord
