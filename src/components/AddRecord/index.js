import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { imageUrl } from '../../config/constants'
import { addRecord } from '../../store/record/actions'
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import RecordDetailsForm from './RecordDetailsForm'
import { getSuggestions } from '../../store/suggestion/actions';
import { selectSuggestions } from '../../store/suggestion/selectors'

const AddRecord = () => {
  const dispatch = useDispatch()
  const [record, setRecord] = useState('')
  const suggestions = useSelector(selectSuggestions)

  // specify upload params and url for your files
  const getUploadParams = async ({ file, meta }) => { 
    const body = new FormData()
    body.append('file', file)
    body.append('upload_preset', 'Records')
    return { 
      url: `${imageUrl}`,
      body,
      headers: { "X-Requested-With": "XMLHttpRequest" }
    }
  }
    // called every time a file's `status` changes
  // const handleChangeStatus = ({ meta, file }, status) => { 
  //   console.log(status, meta, file) 
  // }
    
  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files, allFiles) => {
    const res = JSON.parse(files[0].xhr.responseText);
    const secureUrl = res.secure_url
    setRecord(secureUrl)
    dispatch(getSuggestions(secureUrl))
    // console.log(files.map(f => f.meta))
    allFiles.forEach(f => f.remove())
  }

  return (
    <div>
      {record && suggestions ? 
      <RecordDetailsForm recordUrl={record} suggestions={suggestions}/>
      : <>
        <h3>Upload your record</h3>
        <Dropzone 
          getUploadParams={getUploadParams}
          // onChangeStatus={handleChangeStatus}
          onSubmit={handleSubmit}
          inputContent={'Upload your record cover here'}
          inputWithFilesConten={null}
          maxFiles={1}
          multiple={false}
          accept="image/*"/>
        </>}
    </div>
  )
}

export default AddRecord