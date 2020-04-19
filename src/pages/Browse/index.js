import React, {useState, useEffect} from 'react'
import { fetchUserRecords } from '../../store/record/actions'
import { useDispatch, useSelector } from "react-redux";
import { selectAllUserRecords } from '../../store/record/selectors'
import Loading from '../../components/Loading'
import RecordCard from '../../components/RecordCard';
import '../../components/RecordCard/RecordCard.css'

const Browse = () => {
  const dispatch = useDispatch()
  const records = useSelector(selectAllUserRecords)

  useEffect(() => {
    dispatch(fetchUserRecords())
  }, [])

  if(!records) {
    return <Loading />
  }

  return (
    <div className='body'>
      {records.length === 0 ? <p>You currently have no records on your shelf</p>
      : <div className='record-container'> 
        {records.map(record => {
        return <RecordCard 
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
      })}
      </div>}
    </div>
  )
}

export default Browse