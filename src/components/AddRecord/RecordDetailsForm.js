import React from 'react'
import { Container } from "react-bootstrap";
import Loading from '../Loading'
import { useDispatch, useSelector } from "react-redux";
import SuggestionCard from '../SuggestionCard'

const RecordDetailsForm = (props) => {
  const keywords = props.suggestions.suggestion
  const results = props.suggestions.data

  // const filteredResults = results.filter(item => {
  //   const {title, artist, imageUrl, genre, style, year, recordTitle, format} = item
  //   if(title, artist, imageUrl, genre, style, year, recordTitle) {
  //     return true
  //   } console.log('false')
  // })

  if(!props.suggestions) {
    return <Loading />
  } 

  return (
    <div>
      <h4>We detect your record as "{keywords}"</h4>
      <p>Your Image:</p>
      <img alt='User Upload' style={{width: '100px'}}
           src={props.recordUrl}></img>
      <p>Search results:</p>
      <Container className='mb-4 m-auto row d-flex align-items-stretch'>
      {results.map(result => {
        return <SuggestionCard 
                key={result.id} 
                title={result.title}
                artist={result.artist}
                imageUrl={result.cover_image}
                genre={result.genre}
                style={result.style}
                year={result.year}
                recordTitle={result.recordTitle}
                />
      })}
       </Container>
    </div>
  )
}

export default RecordDetailsForm
