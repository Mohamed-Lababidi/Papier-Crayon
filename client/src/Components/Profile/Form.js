import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { NavLink, Route, Switch, Link, useLocation } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import FaceIcon from '@material-ui/icons/Face'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import PeopleIcon from '@material-ui/icons/People'

import { makeStyles } from '@material-ui/core/styles'
import grey from '@material-ui/core/colors/grey'

import Navbar from '../Navbar/Navbar'

import ProfilePicture from './ProfileForm/ProfilePicture'
import Social from './ProfileForm/Social'
import Information from './ProfileForm/Information'
import AuthContext from '../../AuthContext'
import { serverUrl } from '../../config'

import './Form.css'

const useStyles = makeStyles((theme) => ({
  paper: {},
  form: {
    backgroundColor: grey[100]
  },
  links: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    fontSize: '1.5rem',
    padding: theme.spacing(5),
    '& a': {
      color: grey[500]
    },
    '& a.active': {
      color: grey[900]
    }
  },
  containerform: {
    minHeight: '720px'
  }
}))

const Form = () => {
  const auth = useContext(AuthContext)
  const userid = auth.user.id
  const { pathname } = useLocation()
  const [picture, setPicture] = useState('')
  const infoLinkClassName = pathname === '/account' ? 'active' : ''

  const getPicture = () => {
    axios.get(`/bio/${userid}/picture`).then((res) => {
      setPicture(res.data)
    })
  }

  useEffect(() => {
    getPicture()
  }, [])

  const classes = useStyles()
  return (
    <div>
      <Navbar />
      <Container>
        <Paper className={classes.paper} elevation={2}>
          <Grid container className={classes.containerform}>
            <Grid item xs={12} md={4} className={classes.links}>
              <div className='formprofilediv'>
                <img
                  className='formprofilepp'
                  src={`${serverUrl}/${picture.picture}`}
                  alt='Profile Avatar!'
                />
              </div>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <Link to='/account' className={infoLinkClassName}>
                    Information
                  </Link>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <FaceIcon />
                  </ListItemIcon>
                  <NavLink to='/account/profilepicture'>
                    Profile picture
                  </NavLink>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <NavLink to='/account/social'>Social</NavLink>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={8} className={classes.form}>
              <Typography variant='h4' gutterBottom>
                Profile
              </Typography>
              <Box px={10} py={3}>
                <Switch>
                  <Route exact path='/account' component={Information} />
                  <Route path='/account/profilepicture'>
                    <ProfilePicture setPicture={setPicture} />
                  </Route>
                  <Route path='/account/social' component={Social} />
                </Switch>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  )
}

export default Form
