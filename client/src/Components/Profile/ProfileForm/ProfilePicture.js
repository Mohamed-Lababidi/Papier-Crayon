import React, { useState } from 'react'
import axios from 'axios'

import FormControl from '@material-ui/core/FormControl'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { useSnackbar } from 'notistack'
// import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  buttonsign: {
    borderRadius: '20px',
    width: '120px',
    height: '30px',
    backgroundColor: 'black'
  },
  appbar: {
    backgroundColor: 'white',
    width: '300px',
    height: '47px',
    zIndex: '0'
  },
  buttonUpdatePic: {
    backgroundColor: 'black',
    color: 'white',
    width: '150px'
  }
}))

const ProfilePicture = ({ setPicture }) => {
  const classes = useStyles()
  const [file, setFile] = useState(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState('')
  const { enqueueSnackbar } = useSnackbar()
  // const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', file, file.name)
    const token = localStorage.getItem('token')
    const headers = { authorization: token }
    axios
      .put('/bio/account/picture', formData, {
        headers
      })
      .then((res) => {
        setPicture(res.data)
        enqueueSnackbar('Profile picture has been changed!', {
          variant: 'success',
          autoHideDuration: 2000
        })
        // history.push('/account/profilepicture')
      })
      .catch((err) => {
        err.response.data.errorpicture.forEach((message) =>
          enqueueSnackbar(message, { variant: 'error' })
        )
      })
  }

  const handleImageChange = (e) => {
    e.preventDefault()

    const reader = new FileReader()
    const file = e.target.files[0]

    reader.onloadend = () => {
      setFile(file)
      setImagePreviewUrl(reader.result)
    }
    reader.readAsDataURL(file)
  }

  let $imagePreview = null
  if (imagePreviewUrl) {
    $imagePreview = <img src={imagePreviewUrl} alt='design' />
  } else {
    $imagePreview = (
      <div className='previewTextUpdate'>Please select an Image for Preview</div>
    )
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className='register-app-container'>
        <div className='cont-form'>
          <FormControl fullWidth className={classes.margin}>
            <div className='input-add imginput'>
              <div className={classes.root}>
                <div className='imgPreviewprofile'>{$imagePreview}</div>
                <input
                  accept='image/*'
                  className={classes.input}
                  id='contained-button-file'
                  multiple
                  onChange={handleImageChange}
                  type='file'
                  required
                />
              </div>
            </div>
            <div className='input-add' />
            <div className='signUpButton'>
              <Button
                type='submit'
                className={classes.buttonUpdatePic}
                variant='contained'
                size='small'
              >
                Update
              </Button>
            </div>
          </FormControl>
        </div>
      </form>
    </div>
  )
}

export default ProfilePicture
