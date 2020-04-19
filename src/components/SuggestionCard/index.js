import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card'
import { Row } from "react-bootstrap";
import { addARecord } from '../../store/record/actions'

const SuggestionCard = (props) => {
  const dispatch = useDispatch()
  const {id, title, artist, lowestPrice, genre, style, format, year, imageUrl} = props

  const addRecord = () => {
    dispatch(addARecord({
      id, 
      title, 
      artist, 
      genre, 
      style, 
      format,
      lowestPrice,
      year, 
      imageUrl}))
  }

  return (
    <div className='col-lg-4 mb-2 d-flex align-self-stretch'>
      <Card style={{width: '500px'}} className='d-flex'>
        <Card.Body className='d-flex'>
        <Card.Title style={{width: '100%'}} 
                    className='align-self-center'>{`${artist} / ${title}`}</Card.Title>
        <Card.Img className='align-self-center' 
                  variant="top" style={{width: '300px'}} 
                  src={imageUrl}/>
        </Card.Body>
        <Card.Footer>
          <Row className='d-flex justify-content-around'>
          <p>Artist: {artist} Title: {title}</p>
          <p>Genre: {genre}</p>
          </Row>
          <Row className='d-flex justify-content-around'>
          <p>Style: {style}</p>
          <p>Year Released: {year}</p>
          <p>Format: {format}</p>
          <p>Lowest Price: {lowestPrice ? lowestPrice : 'Unknown'}</p>
          </Row>
          <Button style={{fontSize: '0.8rem'}} 
                  variant='dark'
                  onClick={addRecord}>Add to my collection</Button>
        </Card.Footer>
      </Card>
    </div>
  )
}

export default SuggestionCard