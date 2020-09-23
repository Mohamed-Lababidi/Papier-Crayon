import React, { useState, useContext } from 'react'

import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { fade, makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import SearchIcon from '@material-ui/icons/Search'
import Toolbar from '@material-ui/core/Toolbar'
import UserCard from './Cards/UserCard'
import AuthContext from '../../AuthContext'
import './Landing.css'

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  contSearch: {
    backgroundColor: 'white',
    width: '300px',
    height: '47px',
    zIndex: '0'
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logButton: {
    borderRadius: '20px',
    width: '120px',
    height: '30px'
  },
  signButton: {
    borderRadius: '20px',
    width: '120px',
    height: '30px',
    backgroundColor: 'black'
  },

  linkButtonLog: {
    textDecoration: 'none',
    color: 'black'
  },
  linkButtonSign: {
    textDecoration: 'none',
    color: 'white'
  },
  loadButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  testSearch: {
    minHeight: '50px',
    display: 'flex',
    justifyContent: 'center'
  },
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2)
    }
  }
}))

const Landing = ({ isLoading, users }) => {
  const auth = useContext(AuthContext)
  const { user } = auth
  const [nbUserToDisplay] = useState(2)
  const [usersFilter, setUsersFilter] = useState('')

  const classes = useStyles()

  const usersToDisplay = users
    .filter((user) => {
      const valueToTest = user.username.toLowerCase()
      const valueToSearch = usersFilter.toLowerCase()
      return valueToTest.includes(valueToSearch)
    })
    .slice(0, nbUserToDisplay)

  if (users === 0) {
    return <div>Not found</div>
  }

  return (
    <div>
      <Navbar />
      <div className='land-container'>
        <div className='para'>
          <h1>Support what you love.</h1>
          <p>Connect with your favorite artists like never before.</p>
        </div>
        <div className='form-cont'>
          <p className='connectFav'>CONNECT WITH YOUR FAVORITE ARTISTS </p>
          <AppBar className={classes.contSearch} position='static'>
            <Toolbar className={classes.testSearch}>
              {isLoading ? (
                <div className={classes.root}>
                  <CircularProgress />
                </div>
              ) : (
                <IconButton aria-label='search'>
                  <SearchIcon />
                </IconButton>
              )}
              <div className={classes.search}>
                <div className={classes.searchIcon} />
                <InputBase
                  placeholder='Search'
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                  onChange={(event) => setUsersFilter(event.target.value)}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>
            </Toolbar>
          </AppBar>
          <p className='joinUs'> OR JOIN US TODAY !</p>
          {user ? (
            <>
            </>
          ) : (
            <>
              <div className='Btn'>
                <Button className={classes.logButton} variant='contained'>
                  <Link className={classes.linkButtonLog} to='/login'>
                    LOG IN
                  </Link>
                </Button>
                <Button className={classes.signButton} variant='contained'>
                  <Link className={classes.linkButtonSign} to='/register'>
                    SIGN UP
                  </Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      <div className='land-container'>
        <div className='contCards'>
          {usersToDisplay.lenght !== 0 ? (
            usersToDisplay.map((user) => <UserCard key={user.id} user={user} />)
          ) : (
            <div className='noFound'>
              <h1>Sorry we couldn't find them here... Yet!</h1>
              <p>
                Tell your favorite artist about us and get exclusive deals on
                everything they sell on our plateform !{' '}
              </p>
            </div>
          )}
        </div>
        <div className='Howitwork'>
          <h3>HOW IT WORKS</h3>
          <p className='contWork'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
            risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing
            nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas
            ligula massa, varius a, semper congue, euismod non, mi. Proin
            porttitor, orci nec nonummy molestie, enim est eleifend mi, non
            fermentum diam nisl sit amet erat.
          </p>
        </div>
        {/* <Button className={classes.loadButton} variant='contained' onClick={() => handleOnClick()}>LOAD MORE</Button> */}
      </div>
    </div>
  )
}

export default Landing
