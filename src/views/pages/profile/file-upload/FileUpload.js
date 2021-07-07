/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import Message from './Message'
import Progress from './Progress'
import API from '../../../../api'

const FileUpload = () => {
  const [file, setFile] = useState('')
  const [filename, setFilename] = useState('Choose File')
  const [uploadedFile, setUploadedFile] = useState({})
  const [message, setMessage] = useState('')
  const [uploadPercentage, setUploadPercentage] = useState(0)

  const onChange = (e) => {
    setFile(e.target.files[0])
    setFilename(e.target.files[0].name)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('profile_picture', file)
    console.log(...formData)

    try {
      const res = await API.post('/wp-jwt/v1/upload-profile-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)),
          )
        },
      })
      console.log('image-Upload', res);

      // Clear percentage
      setTimeout(() => setUploadPercentage(0), 10000)

      const { fileName, filePath } = res.data

      setUploadedFile({ fileName, filePath })

      setMessage('File Uploaded')
    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server')
      } else {
        setMessage(err.response.data.msg)
      }
      setUploadPercentage(0)
    }
  }

  return (
    <>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit}>
        <div className="custom-file mb-4">
          <input type="file" name="profile_picture" id="profile_picture" className="custom-file-input" onChange={onChange} />
          <label className="custom-file-label" htmlFor="customFile">
            {filename}
          </label>
        </div>

        <Progress percentage={uploadPercentage} />

        <input type="submit" value="Upload" className="btn btn-primary btn-block mt-4" />
      </form>
      {uploadedFile ? (
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <h3 className="text-center">{uploadedFile.fileName}</h3>
            <img style={{ width: '100%' }} src={uploadedFile.filePath} alt="" />
          </div>
        </div>
      ) : null}
    </>
  )
}

export default FileUpload
