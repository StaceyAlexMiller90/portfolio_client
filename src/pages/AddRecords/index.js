import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { selectToken } from '../../store/user/selectors'
import { getSuggestions } from '../../store/suggestion/actions'
import { selectSuggestions } from '../../store/suggestion/selectors'
import { clearSuggestionInfo } from '../../store/suggestion/actions'
import UploadRecord from '../../components/UploadRecord'
import SearchResults from '../SearchResults'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import { FormGroup } from '@material-ui/core'
import './AddRecords.css'

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
        <div className="upload-record-body">
          <div className="upload-text">
            <h3>Add records to your collection</h3>
            <h5>Take a quick pic and we do the hard work for you</h5>
            <p>
              This feature uses image recognition technology - once uploaded,
              your image will be scanned for text and matching articles on the
              web and the closest matching result is returned.
              <br></br>
            </p>
            <p>
              <span className="highlight">!</span> Please ensure that there is
              no additional text in your image/background e.g. promotional
              stickers.
            </p>
          </div>
          <UploadRecord />
        </div>
      ) : (
        <div style={{ marginTop: '20px' }}>
          <h3>Here is what we found!</h3>
          <h5>
            Please select the option that best matches your record, or decide to
            add info manually
          </h5>
          <form className={`${classes.root} form`}>
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
            <Button
              className="search-button"
              variant="outlined"
              onClick={searchAgain}
            >
              Search again by title &/or artist
            </Button>
            {searchedAgain && (
              <Link to="/manualadd">
                <Button className="search-button" variant="outlined">
                  Still not found?
                </Button>
              </Link>
            )}
            <Link to="/addrecords">
              <Button
                className="search-button"
                variant="outlined"
                onClick={clearSuggestion}
              >
                Click here to retake picture
              </Button>
            </Link>
          </form>
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
