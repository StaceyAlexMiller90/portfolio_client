import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectToken } from '../../store/user/selectors'
import { useHistory } from 'react-router-dom'
import UploadRecord from '../../components/UploadRecord'
import { selectSuggestions } from '../../store/suggestion/selectors'
import { clearSuggestionInfo } from '../../store/suggestion/actions'
import SearchResults from '../SearchResults'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { getSuggestions } from '../../store/suggestion/actions'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import { FormGroup } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '40ch',
		},
	},
}))

const AddRecords = (props) => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const token = useSelector(selectToken)
	const history = useHistory()
	const suggestions = useSelector(selectSuggestions)
	const [title, setTitle] = useState('')
	const [artist, setArtist] = useState('')
	const [searchedAgain, setSearchedAgain] = useState(false)
	const pageKey = props.location.key

	const clearSuggestion = () => {
		dispatch(clearSuggestionInfo())
	}

	const searchAgain = () => {
		dispatch(getSuggestions(suggestions.uploadImage, title, artist))
		setSearchedAgain(true)
	}

	useEffect(() => {
		if (!token) {
			history.push('/')
		}
		clearSuggestion()
	}, [token, history, pageKey])

	return (
		<div
			style={{
				margin: '10px',
			}}
		>
			{!suggestions.suggestion ? (
				<div>
					<h3>Add records to your collection</h3>
					<h5>Take a quick pic & we do the hard work for you</h5>
					<p>
						This feature uses image recognition technology - once uploaded, your
						image will be scanned for text & matching articles on the web & the
						closest matching result is returned.
					</p>
					! Please ensure that there is no additional text in your
					image/background e.g. promotional stickers
					<UploadRecord />
				</div>
			) : (
				<div style={{ marginTop: '20px' }}>
					<h3>Here is what we found!</h3>
					<h5>
						Please select the option that best matches your record, or decide to
						add info manually
					</h5>
					<form className={classes.root}>
						<FormGroup>
							<TextField
								id="outlined-basic"
								label="artist"
								variant="outlined"
								value={artist}
								onChange={(event) => setArtist(event.target.value)}
								type="text"
								placeholder="Enter the artist"
								required
							/>
						</FormGroup>
						<FormGroup>
							<TextField
								id="outlined-basic"
								label="title"
								variant="outlined"
								value={title}
								onChange={(event) => setTitle(event.target.value)}
								type="text"
								placeholder="Enter the record title"
								required
							/>
						</FormGroup>
						<Button variant="outlined" onClick={searchAgain}>
							Search again by title &/or artist
						</Button>
					</form>
					{searchedAgain ? (
						<Link to="/manualadd">
							<Button variant="outlined">Still not found?</Button>
						</Link>
					) : null}
					<Link to="/addrecords">
						<Button variant="outlined" onClick={clearSuggestion}>
							Click here to retake picture
						</Button>
					</Link>
					<SearchResults
						recordUrl={suggestions.uploadImage}
						suggestions={suggestions}
					/>
				</div>
			)}
		</div>
	)
}

export default AddRecords
