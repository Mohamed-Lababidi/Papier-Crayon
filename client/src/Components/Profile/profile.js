import React, { useState, useEffect, useContext } from 'react'

import AddCircleIcon from '@material-ui/icons/AddCircle'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import DisplayDesign from './DisplayDesign'
import IconButton from '@material-ui/core/IconButton'
import AuthContext from '../../AuthContext'
import { makeStyles } from '@material-ui/core/styles'

import Navbar from '../Navbar/Navbar'
import { useHistory, useParams, Link } from 'react-router-dom'

import Yt from '../Assets/youtube.svg'
import Ig from '../Assets/insta.svg'
import Tw from '../Assets/twitter.svg'
import './profile.css'
import '../Comment/comment.css'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      left: '35px'
    }
  }
}))

const Profile = ({ addMainDesign }) => {
  const [setName] = useState()
  const { userid } = useParams()
  const [user, setUser] = useState([])
  const [design, setDesign] = useState([])
  const [picture, setPicture] = useState([])
  const auth = useContext(AuthContext)
  const { user: currentUser } = auth
  const classes = useStyles()

  const getUser = () => {
    axios
      .get(`/profile/${userid}/`)
      .then((res) => {
        setUser(res.data)
        setName(currentUser)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const getPicture = () => {
    axios.get(`http://localhost:8080/bio/${userid}/picture`).then((res) => {
      setPicture(res.data)
    })
  }

  const getDesign = () => {
    axios.get(`/profile/${userid}/designs`).then((res) => {
      setDesign(res.data)
    })
  }

  const deleteDesign = (id) => {
    console.log(design)
    const updatedDesign = design.filter((e) => e.id !== id)
    console.log(updatedDesign)
    setDesign(updatedDesign)
  }

  useEffect(() => {
    getUser()
    getDesign()
    getPicture()
  }, [])

  const history = useHistory()
  const navigateToAddDesign = () => history.push('/AddDesign')

  const room = user ? user.username : ''

  return (
    <div>
      <Navbar />
      <div className='profile-header'>
        <Link to='/' className='arrow-back'>
          <ArrowBackIcon fontSize='large' color='secondary' />
        </Link>
        <div className='profile-pic'>
          <img
            className='profile-pp'
            src={`http://localhost:8080/${picture.picture}`}
            alt='placeholder'
          />
        </div>

        <div className='profile-name-social'>
          <div className='profile-ouioui'>
            <h2>{user.username}</h2>
            {currentUser ? (
              <>
                <div className='profile-button'>
                  <Link className='dmlink' to={`/message?room=${room}`}>
                    <Button className={classes.buttondm} variant='contained'>
                      <p className='buttonfollowdm'>message</p>
                    </Button>
                  </Link>
                  <Button className={classes.buttonfollow} variant='contained'>
                    <p className='buttonfollowdm'>follow</p>
                  </Button>
                </div>
              </>
            ) : (
              <> </>
            )}
          </div>
          <p className='description-profile'>
            Hello welcome to my page, happy shopping
          </p>
          <div className='profile-followers'>
            <button># followers</button>
            <button># following</button>
            <button># posts</button>
            <div className='social-link'>
              <a href='https://www.twitter.com/'>
                <img src={Tw} alt='' className='link-social-one' />
              </a>
              <a href='https://www.facebook.com/'>
                <img src={Yt} alt='' className='link-social-three' />
              </a>
              <a href='https://www.instagram.com/'>
                <img src={Ig} alt='' className='link-social-two' />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className='profile-container' />
      <div className={classes.root}>
        {currentUser && currentUser.id === Number(userid) && (
          <IconButton
            className={classes.addicon}
            color='secondary'
            onClick={() => navigateToAddDesign()}
          >
            <AddCircleIcon />
            Add Design
          </IconButton>
        )}
      </div>
      <div className='featured-container'>
        <h4>Featured</h4>
      </div>
      <div>
        <div className='cards-container'>
          {design.map((product) => (
            <DisplayDesign
              deleteDesign={deleteDesign}
              key={product.id}
              product={product}
              addMainDesign={addMainDesign}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profile
