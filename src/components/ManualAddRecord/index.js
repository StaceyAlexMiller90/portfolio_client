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
		format: 'Vinyl',
		lowestPrice: 0,
		year: 2020,
		imageUrl: suggestions.uploadImage,
	})

	const dispatch = useDispatch()
	const token = useSelector(selectToken)
	const classes = useStyles()
	const history = useHistory()

	const addRecord = () => {
		dispatch(
			addARecord({
				...record,
				genre: record.genre.split(/[ ,]+/).join(' | '),
				style: record.genre.split(/[ ,]+/).join(' | '),
			})
		)
		history.push('/browse')
	}

	if (!token) {
		history.push('/login')
	}

	return (
		<>
			<img
				src={suggestions.uploadImage}
				alt="User Upload"
				style={{ width: '100px' }}
			></img>
			<Container maxWidth="sm">
				<form className={classes.root}>
					<h1 className="mt-5 mb-5">Manually add your record</h1>
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
						<TextField
							id="outlined-basic"
							label="genre(s)"
							variant="outlined"
							value={record.genre}
							onChange={(event) =>
								setRecord({
									...record,
									genre: event.target.value,
								})
							}
							type="text"
							placeholder="Enter the genre(s) separated by spaces &/or commas"
							required
						/>
					</FormGroup>
					<FormGroup>
						<TextField
							id="outlined-basic"
							label="style(s)"
							variant="outlined"
							value={record.style}
							onChange={(event) =>
								setRecord({
									...record,
									style: event.target.value,
								})
							}
							type="text"
							placeholder="Enter the style(s) separated by spaces &/or commas"
							required
						/>
					</FormGroup>
					<FormGroup>
						<TextField
							error={record.year.length === 4 ? false : true}
							helperText="must be in YYYY format"
							id="outlined-basic"
							label="year"
							variant="outlined"
							value={record.year}
							onChange={(event) =>
								setRecord({ ...record, year: event.target.value })
							}
							type="number"
							placeholder="Enter the year"
							required
						/>
					</FormGroup>
					<FormGroup>
						<TextField
							id="outlined-basic"
							label="lowest price"
							variant="outlined"
							helperText="if this field is left blank we will record 0"
							value={record.lowestPrice}
							onChange={(event) =>
								setRecord({ ...record, lowestPrice: event.target.value })
							}
							type="number"
							placeholder="Enter the lowest price for this record"
						/>
					</FormGroup>
					<FormGroup>
						<Button variant="outlined" type="submit" onClick={addRecord}>
							Add record
						</Button>
					</FormGroup>
				</form>
			</Container>
		</>
	)
}

export default ManualAddRecord
