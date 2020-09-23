import React, { useState, useContext } from 'react'
import axios from 'axios'
import AuthContext from '../../../AuthContext'
import { useSnackbar } from 'notistack'

import AppBar from '@material-ui/core/AppBar'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

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
  buttonUpdateSocial: {
    backgroundColor: 'black',
    color: 'white',
    width: '150px'
  }
}))

function Social () {
  const auth = useContext(AuthContext)
  const [twitter, setTwitter] = useState('')
  const [instagram, setInstagram] = useState('')
  const [facebook, setFacebook] = useState('')
  const [pinterest, setPinterest] = useState('')
  const { enqueueSnackbar } = useSnackbar()

  const classes = useStyles()

  const handleSubmit = (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    const headers = { authorization: token }
    const social = {
      twitter,
      instagram,
      facebook,
      pinterest
    }
    axios
      .put('/bio/account/social', social, {
        headers
      })
      .then((res) => {
        localStorage.setItem('token', res.headers['x-access-token'])
        auth.setUser(res.data)
        enqueueSnackbar('Informations changed!', {
          variant: 'success',
          autoHideDuration: 2000
        })
        // history.push('/account/social')
      })
      .catch(() => {
        enqueueSnackbar('Something went wrong!', {
          variant: 'error',
          autoHideDuration: 2000
        })
      })
  }

  return (
    <form onSubmit={handleSubmit} className='socialcontainer'>
      <div>
        <div className='registerappcontainer'>
          <AppBar className={classes.appbar} position='static'>
            <input
              type='text'
              id='twitter'
              className='registerinput'
              placeholder='twitter'
              name='twitter'
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
            />
          </AppBar>
        </div>
        <div className='registerappcontainer'>
          <AppBar className={classes.appbar} position='static'>
            <input
              type='text'
              id='instagram'
              className='registerinput'
              placeholder='instagram'
              name='instagram'
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
            />
          </AppBar>
        </div>
        <div className='registerappcontainer'>
          <AppBar className={classes.appbar} position='static'>
            <input
              type='text'
              id='Facebook'
              className='registerinput'
              placeholder='facebook'
              name='Facebook'
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
            />
          </AppBar>
        </div>
        <div className='registerappcontainer'>
          <AppBar className={classes.appbar} position='static'>
            <input
              type='text'
              id='pinterest'
              className='registerinput'
              placeholder='pinterest'
              name='pinterest'
              value={pinterest}
              onChange={(e) => setPinterest(e.target.value)}
            />
          </AppBar>
        </div>
        <div className='signUpButton'>
          <Button
            type='submit'
            className={classes.buttonUpdateSocial}
            variant='contained'
            size='small'
          >
            Update
          </Button>
        </div>
      </div>
    </form>
  )
}

export default Social
