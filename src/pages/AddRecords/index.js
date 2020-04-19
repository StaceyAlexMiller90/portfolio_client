import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from '../../store/user/selectors'
import { useHistory } from "react-router-dom";
import AddRecord from '../../components/AddRecord'

const AddRecords = () => {
  const token = useSelector(selectToken)
  const history = useHistory()

  useEffect(() => {
    if (!token) {
      history.push("/");
    }
  }, [token, history]);
  
  return (
    <div>
      Add a record page
      <AddRecord />
    </div>
  )
}

export default AddRecords
