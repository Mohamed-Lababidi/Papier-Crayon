import React, { useState, useContext } from 'react'
import axios from 'axios'
import AppBar from '@material-ui/core/AppBar'
import { makeStyles } from '@material-ui/core/styles'
import AuthContext from '../../../AuthContext'
import Button from '@material-ui/core/Button'
import { useSnackbar } from 'notistack'
// import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  },
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
  buttonUpdateInfo: {
    backgroundColor: 'black',
    color: 'white',
    width: '150px'
  }
}))

function Information () {
  const classes = useStyles()
  const auth = useContext(AuthContext)
  const { user } = auth
  const [username, setUsername] = useState(user.username)
  const [lastname, setLastname] = useState(user.lastname)
  const [firstname, setFirstname] = useState(user.firstname)
  const [email, setEmail] = useState(user.mail)
  const [password, setPassword] = useState('password')
  const { enqueueSnackbar } = useSnackbar()
  // const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    const headers = { authorization: token }
    const profile = {
      username,
      firstname,
      lastname,
      mail: email
    }
    axios
      .put('/bio/account/information', profile, {
        headers
      })
      .then((res) => {
        localStorage.setItem('token', res.headers['x-access-token'])
        const newUser = { ...user, ...profile }
        auth.setUser(newUser)
        enqueueSnackbar('Informations changed!', {
          variant: 'success',
          autoHideDuration: 2000
        })
        // history.push('/account')
      })
      .catch(() => {
        enqueueSnackbar('Something went wrong!', {
          variant: 'error',
          autoHideDuration: 2000
        })
      })
  }

  return (
    <div className='informationcontainer'>
      <form onSubmit={handleSubmit}>
        <div className='registerappcontainer'>
          <label>Username :</label>
          <AppBar className={classes.appbar} position='static'>
            <input
              type='text'
              id='username'
              className='registerinput'
              name='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className='input-add' />
          </AppBar>
        </div>
        <div className='registerappcontainer'>
          <label>Lastname :</label>
          <AppBar className={classes.appbar} position='static'>
            <input
              type='lastname'
              id='lastname'
              className='registerinput'
              name='lastname'
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </AppBar>
        </div>
        <div className='registerappcontainer'>
          <label>Firstname :</label>
          <AppBar className={classes.appbar} position='static'>
            <input
              type='firstname'
              id='firstname'
              className='registerinput'
              name='firstname'
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </AppBar>
        </div>
        <div className='registerappcontainer'>
          <label>Password :</label>
          <AppBar className={classes.appbar} position='static'>
            <input
              type='password'
              id='password'
              className='registerinput'
              placeholder='Change your password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </AppBar>
        </div>
        <div className='registerappcontainer emailcontainer'>
          <label>Email :</label>
          <AppBar className={classes.appbar} position='static'>
            <input
              type='email'
              id='email'
              className='registerinput'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </AppBar>
        </div>
        <div className='signUpButton'>
          <Button
            type='submit'
            className={classes.buttonUpdateInfo}
            variant='contained'
            size='small'
          >
            Update
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Information
