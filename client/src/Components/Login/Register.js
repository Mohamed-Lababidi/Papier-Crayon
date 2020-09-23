import React, { useState } from 'react'

import AppBar from '@material-ui/core/AppBar'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import Navbar from '../Navbar/Navbar'
import { useHistory } from 'react-router'
import { useSnackbar } from 'notistack'

import './Register.css'

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
  }
}))

const Register = () => {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [hasAgreed, setHasAgreed] = useState(false)
  const history = useHistory()
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post('/register', {
        firstname: firstname,
        lastname: lastname,
        username: username,
        email: email,
        password: password
      })
      .then((res) => {
        enqueueSnackbar('Account created!', {
          variant: 'success',
          autoHideDuration: 1000
        })
        history.push('/login')
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
      <div className='registercontainer'>
        <h1> Register </h1>{' '}
        <form className='registerform'>
          <div className='registerappcontainer'>
            <AppBar className={classes.appbar} position='static'>
              <input
                type='text'
                id='firstname'
                className='registerinput'
                placeholder='Enter your firstname'
                name='firstname'
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />{' '}
            </AppBar>{' '}
          </div>{' '}
          <div className='registerappcontainer'>
            <AppBar className={classes.appbar} position='static'>
              <input
                type='text'
                id='lastname'
                className='registerinput'
                placeholder='Enter your lastname'
                name='lastname'
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />{' '}
            </AppBar>{' '}
          </div>{' '}
          <div className='registerappcontainer'>
            <AppBar className={classes.appbar} position='static'>
              <input
                type='text'
                id='username'
                className='registerinput'
                placeholder='Enter your username'
                name='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />{' '}
            </AppBar>{' '}
          </div>{' '}
          <div className='registerappcontainer'>
            <AppBar className={classes.appbar} position='static'>
              <input
                type='password'
                id='password'
                className='registerinput'
                placeholder='Enter your password'
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />{' '}
            </AppBar>{' '}
          </div>{' '}
          <div className='registerappcontainer'>
            <AppBar className={classes.appbar} position='static'>
              <input
                type='email'
                id='email'
                className='registerinput'
                placeholder='Enter your email'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />{' '}
            </AppBar>{' '}
          </div>{' '}
          <div className='registerappcontainer'>
            <label className='FormField-CheckboxLabel'>
              <input
                className='FormField-Checkbox'
                type='checkbox'
                name='hasAgreed'
                value={hasAgreed}
                onChange={(e) => setHasAgreed(e.target.value)}
              />
              I agree all statements in
              <a href='www.google.fr' className='FormField-TermsLink'>
                terms of service{' '}
              </a>{' '}
            </label>{' '}
          </div>{' '}
          <div className='signUpButton'>
            <Button
              className={classes.buttonsign}
              onClick={(e) => handleSubmit(e)}
              variant='contained'
            >
              <p className='login-button-register'> SIGN UP </p>{' '}
            </Button>{' '}
            <a href='/login' className='FormField-Link'>
              I 'm already member{' '}
            </a>{' '}
          </div>{' '}
        </form>{' '}
      </div>{' '}
    </div>
  )
}

export default Register
