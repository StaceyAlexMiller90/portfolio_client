import React from 'react'
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card'
import { Row } from "react-bootstrap";

const SuggestionCard = (props) => {

  return (
    <div className='col-lg-4 mb-2 d-flex align-self-stretch'>
      <Card style={{width: '500px'}} className='d-flex'>
        <Card.Body className='d-flex'>
        <Card.Title style={{width: '100%'}} 
                    className='align-self-center'>{props.title}</Card.Title>
        <Card.Img className='align-self-center' variant="top" style={{width: '300px'}} src={props.imageUrl}/>
        </Card.Body>
        <Card.Footer>
          <Row className='d-flex justify-content-around'>
          <p>Artist: {props.artist} Title: {props.recordTitle}</p>
          <p>Genre: {props.genre.length > 1 ? props.genre.join(', '): props.genre}</p>
          </Row>
          <Row className='d-flex justify-content-around'>
          <p>Style: {props.style.length > 1 ? props.style.join(', ') : props.style}</p>
          <p>Year Released: {props.year}</p>
          </Row>
        </Card.Footer>
      </Card>
    </div>
  )
}

export default SuggestionCard