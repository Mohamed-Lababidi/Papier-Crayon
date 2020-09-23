import React, { useState, useContext } from 'react'
import axios from 'axios'
import AppBar from '@material-ui/core/AppBar'
import AuthContext from '../../AuthContext'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import Navbar from '../Navbar/Navbar'
import { Link, useHistory } from 'react-router-dom'
import { useSnackbar } from 'notistack'

import './Login.css'

const useStyles = makeStyles((theme) => ({
  buttonsign: {
    borderRadius: '20px',
    width: '120px',
    height: '30px',
    backgroundColor: 'black'
  },
  appbar: {
    width: '300px',
    height: '38px',
    zIndex: '0',
    marginRight: '5px',
    backgroundColor: 'white'
  }
}))
function Login () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()
  const auth = useContext(AuthContext)
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post('/login', {
        email: email,
        password: password
      })
      .then((res) => {
        if (res.status !== 401) {
          enqueueSnackbar('You are connected!', {
            variant: 'success',
            autoHideDuration: 1000
          })
          localStorage.clear()
          localStorage.setItem('token', res.headers['x-access-token'])
          auth.setUser(res.data) // récupération de profile du back
          history.push('/')
        }
      })
      .catch((err) => {
        err.response.data.errors.forEach((message) =>
          enqueueSnackbar(message, {
            variant: 'error'
          })
        )
      })
  }
  return (
    <div>
      <Navbar />
      <div className='FormCenter'>
        <h1>It's good to see you again</h1>
        <div className='signup-text'>
          <p className='noaccount'>No account ?</p>
          <Link href='/register' className='signupbutton'>
            Sign up now !
          </Link>
        </div>
        <form className='FormFields'>
          <div className='form-box'>
            <div className='input-field'>
              <AppBar className={classes.appbar} position='static'>
                <input
                  type='email'
                  id='email'
                  className='FormField-Input'
                  placeholder='email'
                  name='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </AppBar>
            </div>
            <div className='FormField'>
              <div className='input-field'>
                <AppBar className={classes.appbar} position='static'>
                  <input
                    type='password'
                    id='password'
                    className='FormField-Input'
                    placeholder='password'
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </AppBar>
              </div>
            </div>
          </div>
          <div className='login-button'>
            <Link>password forgotten ?</Link>
            <Button
              className={classes.buttonsign}
              onClick={(e) => handleSubmit(e)}
              variant='contained'
            >
              <p>LOG IN</p>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
