import React, { useContext } from 'react'
import Button from '@material-ui/core/Button'
import Fade from '@material-ui/core/Fade'
import { Link, useHistory } from 'react-router-dom'
import Logo from '../Assets/PapierCrayonLogo.jpg'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import AuthContext from '../../AuthContext'
import { useSnackbar } from 'notistack'
import './Navbar.css'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

const Navbar = () => {
  const auth = useContext(AuthContext)
  const { user } = auth
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const { setUser } = useContext(AuthContext)
  const { enqueueSnackbar } = useSnackbar()
  const history = useHistory()
  const navigateToBasket = () => history.push('/Basket')
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(null)
    enqueueSnackbar('You have been logged out', {
      variant: 'success',
      autoHideDuration: 2000

    })
    history.push('/')
  }

  return (
    <div className='navbarContainer'>
      <Link to='/'>
        <img src={Logo} alt='Logo' className='logo' />
      </Link>
      <div className='profile-button-container'>
        {user && (
          <div className='profile-button-basket'>
            <button onClick={() => navigateToBasket()}>
              <ShoppingCartIcon style={{ fontSize: 30 }} />
            </button>
          </div>
        )}
      </div>
      <Button
        aria-controls='fade-menu'
        aria-haspopup='true'
        onClick={handleClick}
      >
        <div className='burger-nav'>
          <hr />
          <hr />
          <hr />
        </div>
      </Button>
      <Menu
        id='fade-menu'
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>
          <Link className='navbar-link' to='/'>
            <p className='navbar-p'>Home</p>
          </Link>
        </MenuItem>
        {user ? (
          <>
            <MenuItem onClick={handleClose}>
              <Link className='navbar-link' to={`/profile/${user.id}`}>
                <p className='navbar-p'>Profile</p>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link className='navbar-link' to='/account'>
                <p className='navbar-p'>Settings</p>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link className='navbar-link' to='/'>
                <p className='navbar-p' onClick={handleLogout}>
                  Log Out
                </p>
              </Link>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem onClick={handleClose}>
              <Link className='navbar-link' to='/login'>
                <p className='navbar-p'>Log In</p>
              </Link>
            </MenuItem>

            <MenuItem onClick={handleClose}>
              <Link className='navbar-link' to='/register'>
                <p className='navbar-p'>Register</p>
              </Link>
            </MenuItem>
          </>
        )}
      </Menu>
    </div>
  )
}

export default Navbar
