import React from 'react'
import { useDispatch } from 'react-redux'
import Dropzone from 'react-dropzone-uploader'
import { imageUrl } from '../../config/constants'
import { getSuggestions } from '../../store/suggestion/actions'
import 'react-dropzone-uploader/dist/styles.css'
import './UploadRecord.css'

const UploadRecord = () => {
  const dispatch = useDispatch()

  // specify upload params and url for your files
  const getUploadParams = async ({ file, meta }) => {
    const body = new FormData()
    body.append('file', file)
    body.append('upload_preset', 'Records')
    return {
      url: `${imageUrl}`,
      body,
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
    }
  }

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files, allFiles) => {
    const res = JSON.parse(files[0].xhr.responseText)
    const secureUrl = res.secure_url
    dispatch(getSuggestions(secureUrl))
    allFiles.forEach((f) => f.remove())
  }

  return (
    <Dropzone
      addClassNames={{
        dropzone: 'dropzone',
        inputLabel: 'inputlabel',
        preview: 'preview',
        previewImage: 'previewImage',
        submitButton: 'submitButton',
      }}
      getUploadParams={getUploadParams}
      onSubmit={handleSubmit}
      inputContent={'Drag or click to add your record cover'}
      inputWithFilesContent={null}
      maxFiles={1}
      multiple={false}
      accept="image/*"
    />
  )
}

export default UploadRecord
