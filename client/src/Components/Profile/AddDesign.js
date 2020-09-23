import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import logo from '../Assets/PapierCrayonLogo.jpg'
import AuthContext from '../../AuthContext'
import { useSnackbar } from 'notistack'

import './AddDesign.css'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  input: {
    display: 'none'
  },
  buttonUpload: {
    borderRadius: '20px',
    width: '120px',
    height: '30px',
    backgroundColor: 'black',
    color: 'white'
  },
  addDesignbutton: {
    color: 'white',
    fontSize: '1em'
  },
  date: {
    width: '194px'
  }
}))
const AddDesign = (blabla) => {
  const auth = useContext(AuthContext)
  const { user } = auth
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [dateCreation, setDateCreation] = useState('')
  const [price, setPrice] = useState('')
  const [file, setFile] = useState(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState('')
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()

  const classes = useStyles()

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('price', price)
    formData.append('date_creation', dateCreation)
    formData.append('file', file, file.name)
    const token = localStorage.getItem('token')
    const headers = { authorization: token }

    axios
      .post('http://localhost:8080/profile/designadding', formData, {
        headers
      })
      .then((res) => {
        enqueueSnackbar('Your design has been added', {
          variant: 'success',
          autoHideDuration: 2000
        })
        history.push(`/profile/${user.id}`)
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
      <div className='previewText'>Please select an Image for Preview</div>
    )
  }

  return (
    <div className='cont-form'>
      <img className='imglogo' src={logo} alt='' />
      <h1>Post your Design</h1>
      <form onSubmit={handleSubmit} className='NewForm'>
        <FormControl fullWidth className={classes.margin}>
          <div className='input-add'>
            <TextField
              className={classes.margin}
              label='Design Name'
              name='name'
              variant='outlined'
              id='name-mui-theme-provider-outlined-input'
              type='text'
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
          <div className='input-add imginput'>
            <div className={classes.root}>
              <input
                accept='image/*'
                className={classes.input}
                id='contained-button-file'
                multiple
                onChange={handleImageChange}
                type='file'
                required
              />
              <div className='imgPreview'>{$imagePreview}</div>
              <label htmlFor='contained-button-file'>
                <Button
                  className={classes.buttonUpload}
                  variant='contained'
                  component='span'
                >
                  Upload
                </Button>
              </label>
            </div>
          </div>

          <div className='input-add'>
            <TextField
              label='Description'
              name='description'
              id='description-mui-theme-provider-outlined-full-width-input'
              fullWidth
              variant='outlined'
              required
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>
          <div className='pricedate'>
            <div className='input-add'>
              <TextField
                className={classes.margin}
                label='Price'
                name='price'
                id='price-mui-theme-provider-outlined-input'
                type='number'
                variant='outlined'
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                required
              />
            </div>
            <div className='input-add'>
              <TextField
                className={classes.date}
                variant='outlined'
                name='dateCreation'
                id='dateCreation-mui-theme-provider-outlined-input'
                type='Date'
                onChange={(e) => setDateCreation(e.target.value)}
                value={dateCreation}
                required
              />
            </div>
          </div>
          <div className='input-add'>
            {user && (
              <Button
                type='submit'
                className={classes.buttonUpload}
                variant='contained'
                size='small'
              >
                Add design
              </Button>
            )}
          </div>
        </FormControl>
      </form>
    </div>
  )
}
export default AddDesign
