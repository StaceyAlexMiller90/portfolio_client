import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { imageUrl } from '../../config/constants'
import { addRecord } from '../../store/image/actions'
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import RecordDetailsForm from '../RecordDetailsForm'

const ImageUploader = () => {
  const dispatch = useDispatch()
  const [record, setRecord] = useState('')
  const [suggestions, setSuggestions] = useState('')

  // specify upload params and url for your files
  const getUploadParams = async ({ file, meta }) => { 
    const body = new FormData()
    body.append('file', file)
    body.append('upload_preset', 'Records')
    return { 
      url: `${imageUrl}/image/upload`,
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
    // console.log(files.map(f => f.meta))
    allFiles.forEach(f => f.remove())
  }

  return (
    <div>
      {record ? 
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

export default ImageUploader