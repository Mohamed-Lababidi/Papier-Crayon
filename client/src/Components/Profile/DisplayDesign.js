import React, { useState } from 'react'

import axios from 'axios'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import { makeStyles } from '@material-ui/core/styles'
import Modal from 'react-modal'
import { useParams, Link } from 'react-router-dom'
import CommentApp from '../Comment/CommentApp'
import Menu from '@material-ui/core/Menu'
import Fade from '@material-ui/core/Fade'
import MenuItem from '@material-ui/core/MenuItem'
import { useSnackbar } from 'notistack'

import CART from '../Assets/cart.svg'
import SHIRT from '../Assets/tshirt.svg'
import SWEAT from '../Assets/sweat.svg'

import SHARE from '../Assets/share.svg'
import HEART from '../Assets/heart.svg'
import MESS from '../Assets/message.svg'
import './DisplayDesign.css'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: '33px',
    width: '250px',
    height: '250px',
    borderRadius: '0'
  },
  buttonbasket: {
    width: '83px',
    height: '35px',
    backgroundColor: 'black',
    color: 'white',
    borderRadius: '0'
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    padding: '10px'
  },
  menuitemdelete: {
    fontSize: '1em',
    color: 'red'
  },
  testdeletebutton: {
    position: 'relative',
    height: '40px',
    marginTop: '-21px'
  }
}))
const customStyles = {
  overlay: {
    backgroundColor: 'rgba(155, 155, 155, 0.75)'
  }
}
const customStylesCart = {
  overlay: {
    backgroundColor: 'transparent'
  },
  content: {
    border: 'none',
    width: '200px',
    height: '200px',
    top: '500px',
    left: '1150px'
  }
}

const DisplayDesign = ({ product, addMainDesign, deleteDesign }) => {
  const [modalDesignIsOpen, setModalDesignIsOpen] = useState(false)
  const [modalDesignIsOpen2, setModalDesignIsOpen2] = useState(false)
  const { userid } = useParams()
  const [quantity, setQuantity] = useState(1)
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const { enqueueSnackbar } = useSnackbar()

  const handleClicke = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleQuantityChange = (e) => {
    const qty = e.target.value
    setQuantity(qty)
  }

  const addBasket = () => {
    addMainDesign({
      ...product,
      quantity: quantity
    })
    enqueueSnackbar('Item added to your basket!', {
      variant: 'success',
      autoHideDuration: 2000
    })
  }

  const handleClick = () => {
    axios
      .delete(`http://localhost:8080/profile/${userid}/designs/${product.id}/`)
      .then((res) => {
        deleteDesign(product.id)
        enqueueSnackbar('Your design has been deleted!', {
          variant: 'success',
          autoHideDuration: 2000
        })
      })
      .catch((err) => {
        console.log('Error While deleting Data', err)
      })
  }

  return (
    <div className='displaydesigncontainer'>
      <div className='displayfigure' key={product.id}>
        <Card
          className={classes.root}
          onClick={() => setModalDesignIsOpen(true)}
        >
          <div className='design-img'>
            <img
              src={`http://localhost:8080/${product.picture}`}
              alt='design'
              className='img-land'
            />
          </div>{' '}
        </Card>{' '}
        <Modal
          className='modalcontainer'
          isOpen={modalDesignIsOpen}
          onRequestClose={() => setModalDesignIsOpen(false)}
          style={customStyles}
        >
          <div className='modalfigure'>
            <figure className='modalfigureimg'>
              <img
                alt='design'
                src={`http://localhost:8080/${product.picture}`}
                className='modalimg'
              />
            </figure>{' '}
            <div className='modal-desc'>
              <div className='modal-name-line'>
                <p className='modal-comment'> {product.name} </p>{' '}
              </div>{' '}
              <div className='modal-comment-box'>
                <CommentApp />
              </div>{' '}
              <div className='icons-modal'>
                <div className='icons-modal-first'>
                  <img alt='' src={HEART} /> <img alt='' src={MESS} />{' '}
                  <img alt='' src={SHARE} />{' '}
                  <Button
                    className={classes.testdeletebutton}
                    aria-controls='fade-menu'
                    aria-haspopup='true'
                    onClick={handleClicke}
                  >
                    <div className='displaydesignhr'>
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
                    <MenuItem
                      className={classes.menuitemdelete}
                      onClick={handleClose}
                    >
                      <p onClick={handleClick} className='displaydesigndelete'>
                        Delete
                      </p>
                    </MenuItem>
                    {/* <button
                      className='figure-delete-button'
                      onClick={handleClick}
                    >
                      X{' '}
                    </button>{' '} */}
                  </Menu>
                </div>{' '}
                <div className='icons-modal-second'>
                  <img
                    alt=''
                    src={CART}
                    onClick={() => setModalDesignIsOpen2(true)}
                  />{' '}
                </div>{' '}
              </div>{' '}
            </div>{' '}
          </div>{' '}
        </Modal>{' '}
        <Modal
          isOpen={modalDesignIsOpen2}
          onRequestClose={() => setModalDesignIsOpen2(false)}
          style={customStylesCart}
        >
          <div className='modal2container'>
            <div className='modal2-title'>
              <p className='startingat'> Starting at {product.price}€ </p>{' '}
            </div>{' '}
            <div className='modal2-img'>
              <img alt='' src={SHIRT} /> <img alt='' src={SWEAT} />{' '}
            </div>{' '}
            <div className='modal-quantity'>
              Quantity:
              <input
                className='quantity-input'
                onChange={handleQuantityChange}
                value={quantity}
              />{' '}
            </div>{' '}
            <div className='modal-addcart'>
              <Link
                className='hola'
                onClick={() => {
                  addBasket()
                }}
              >
                <p className='addtocartyes'> Add to cart </p>{' '}
              </Link>{' '}
              <Button
                className={classes.buttonbasket}
                variant='contained'
                onClick={() => {
                  addBasket()
                }}
              >
                <p className='addtocart'> Buy now </p>{' '}
              </Button>{' '}
            </div>{' '}
          </div>{' '}
        </Modal>{' '}
      </div>{' '}
    </div>
  )
}

export default DisplayDesign
