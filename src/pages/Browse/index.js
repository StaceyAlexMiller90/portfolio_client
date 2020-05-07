import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { fetchAllUserRecords } from '../../store/record/actions'
import { selectToken, selectUser } from '../../store/user/selectors'
import { selectUserRecords } from '../../store/record/selectors'
import { getSelectOptions } from '../../utils'
import MultipleSelect from '../../components/MultipleSelect'
import Loading from '../../components/Loading'
import RecordCard from '../../components/RecordCard'
import TextField from '@material-ui/core/TextField'
import '../../components/RecordCard/RecordCard.css'

const Browse = () => {
  const dispatch = useDispatch()
  const token = useSelector(selectToken)
  const history = useHistory()
  const records = useSelector(selectUserRecords)
  const user = useSelector(selectUser)
  const [genre, setGenre] = useState([])
  const [style, setStyle] = useState([])
  const [year, setYear] = useState([])
  const [artist, setArtist] = useState([])
  const [title, setTitle] = useState('')

  useEffect(() => {
    if (records.length === 0) {
      dispatch(fetchAllUserRecords())
    }
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

  const headerText =
    records.length === 0
      ? 'You currently have no records on your shelf'
      : filteredRecords.length === 0
      ? 'No records match your filters'
      : `Displaying ${filteredRecords.length} records on your shelf`

  return (
    <div style={{ margin: '20px' }}>
      <div
        style={{
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
      <h3 style={{ color: '#5333ed' }}>Hey {user.name}...</h3>
      <p>{headerText}</p>
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
    </div>
  )
}

export default Browse
