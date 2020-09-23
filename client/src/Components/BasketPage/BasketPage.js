import React, { useState, useEffect, useContext } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Bancaire from '../Assets/bancaire.png'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import DeleteIcon from '@material-ui/icons/Delete'
import AuthContext from '../../AuthContext'
import { useSnackbar } from 'notistack'

import { useHistory, Link, Redirect } from 'react-router-dom'

import { serverUrl } from '../../config'

import './BasketPage.css'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      border: 'none',
      backgroundColor: 'black',
      color: 'white',
      '&:hover': {
        backgroundColor: 'grey',
        border: 'none'
      }
    }
  },
  shoplist: {
    width: '50%',
    padding: '7px 10px',
    position: 'relative'
  },
  paybox: {
    width: '30%',
    height: '350px',
    margin: '10px 0',
    padding: '10px 10px 40px 10px'
  },
  shoplistactive: {
    width: '50%',
    padding: '7px 10px',
    position: 'relative'
  },
  deleteicon: {
    position: 'absolute',
    right: '34px',
    top: '5px',
    cursor: 'pointor',
    '&:hover': {
      opacity: '0.8'
    }
  },
  arrowback: {
    color: 'black',
    border: 'none',
    background: 'none'
  }
}))

const livraisons = [
  {
    value: 'Livraison 1',
    label: 'Standard (free) 10-15 days'
  },
  {
    value: 'Livraison 2',
    label: 'Express (5€) 5-10 days'
  },
  {
    value: 'Livraison 3',
    label: 'Premium (10€) 1-3 days'
  }
]

const BasketPage = ({ selectedDesign, setSelectedDesign, users }) => {
  const classes = useStyles()
  const auth = useContext(AuthContext)
  const user = auth.user
  const [livraison, setlivraison] = React.useState('')
  const { enqueueSnackbar } = useSnackbar()
  const [totalPriceList, setTotalPriceList] = useState(
    selectedDesign.map((products) => products.price * products.quantity)
  )

  const addQuantity = (e) => {
    const newQuantity = e.target.value
    if (newQuantity === '0' || newQuantity === '') {
      deleteDesign(e.target.id)
    } else {
      const newArr = [...selectedDesign]
      const row = newArr.find((f) => f.name === e.target.name)
      row.quantity = parseInt(newQuantity)
      setSelectedDesign(newArr)
    }
  }

  const deleteDesign = (idDesignToDelete) => {
    const newSelectedDesign = selectedDesign.filter(
      (design) => design.id !== parseInt(idDesignToDelete)
    )
    if (newSelectedDesign === undefined) {
      setSelectedDesign([])
    } else {
      setSelectedDesign(newSelectedDesign)
    }
    enqueueSnackbar('Item removed from your basket!', {
      variant: 'warning',
      autoHideDuration: 2000
    })
  }

  useEffect(() => {
    setTotalPriceList(
      selectedDesign.map((product) => product.price * product.quantity)
    )
  }, [selectedDesign])

  const history = useHistory()
  const navigateToProfile = () => history.push(`/profile/${user.id}`)

  const handleChange = (event) => {
    setlivraison(event.target.value)
  }
  if (!user) {
    return <Redirect to='/' />
  }
  const designToDisplay = selectedDesign.map((design) => (
    <div key={design.id} className='card-bask'>
      <img
        src={`${serverUrl}/${design.picture}`}
        alt='design'
        className='img-basket'
      />
      <div className='det-bask'>
        <div className='prod-cont'>
          <div key={design.id} className='prod-cont'>
            <div className='containbasket'>
              <h4>Design: </h4>
              <p>{design.name}</p>
            </div>
            <div className='containbasket'>
              <h4>Unit Price : </h4>
              <p>{design.price} €</p>
            </div>
            <div className='containbasket'>
              <h4>Quantity: </h4>
              <input
                id={design.id}
                type='number'
                name={design.name}
                value={design.quantity}
                onChange={addQuantity}
              />
            </div>
          </div>
          <DeleteIcon
            className={classes.deleteicon}
            onClick={() => deleteDesign(design.id)}
          />
          <div className='total-item'>
            <h4>Sub total:</h4>
            <p>{design.quantity * design.price} €</p>
          </div>
        </div>
      </div>
    </div>
  ))
  if (selectedDesign.length === 0) {
    return (
      <>
        <div>
          {user && (
            <Link to={`/profile/${user.id}`}>
              <ArrowBackIcon
                onClick={() => navigateToProfile()}
                className={classes.arrowback}
              />
            </Link>
          )}
        </div>
        <div className='cont-all'>
          <Paper className={classes.shoplist}>
            <h2 className='titlebasket'> SHOPPING CART </h2>
            <div className='nothingtoshop'>
              You have nothing in your shopping cart. Continue Shopping
            </div>
            <div className='total'>
              <h3 className='h3-bask titlebasket'> Sub total: 0€ </h3>
            </div>
          </Paper>
          <Paper className={classes.paybox}>
            <h2 className='titlebasket'> Total </h2>
            <div className='card-tot'>
              <div>
                <h3 className='titlebasket'> Sub total: 0€ </h3>
              </div>
              <div>
                <label className='titlebasket' for='pet-select'>
                  Delivery:
                </label>
              </div>
              <TextField
                id='outlined-select-currency'
                select
                label='Select'
                value={livraison}
                onChange={handleChange}
                variant='outlined'
                size='small'
              >
                {livraisons.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <div className='align-paie'>
                <div className={classes.root}>
                  <Button
                    variant='outlined'
                    color='primary'
                    className='btn-tot'
                  >
                    Paiement
                  </Button>
                </div>
                <img src={Bancaire} alt='moyen paiement' className='img-banc' />
              </div>
            </div>
          </Paper>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div>
          {user && (
            <Link to={`/profile/${user.id}`}>
              <ArrowBackIcon
                onClick={() => navigateToProfile()}
                className={classes.arrowback}
              />
            </Link>
          )}
        </div>
        <div className='cont-all'>
          <Paper className={classes.shoplistactive}>
            <h2 className='titlebasket'> SHOPPING CART </h2>
            <div>{designToDisplay}</div>
            <div className='total-active'>
              <h3 className='h3-bask titlebasket'>
                {' '}
                Sub total:{' '}
                {totalPriceList.reduce(
                  (accumulator, currentValue) => accumulator + currentValue
                )}
                €{' '}
              </h3>
            </div>
          </Paper>
          <Paper className={classes.paybox}>
            <h2 className='titlebasket'> Total </h2>
            <div className='card-tot'>
              <div>
                <h3 className='titlebasket'>
                  {' '}
                  Sub total:{' '}
                  {totalPriceList.reduce(
                    (accumulator, currentValue) => accumulator + currentValue
                  )}
                  €{' '}
                </h3>
              </div>
              <div>
                <label className='titlebasket' for='pet-select'>
                  Delivery:
                </label>
              </div>
              <TextField
                id='outlined-select-currency'
                select
                label='Select'
                value={livraison}
                onChange={handleChange}
                variant='outlined'
                size='small'
              >
                {livraisons.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <div className='align-paie'>
                <div className={classes.root}>
                  <Button className={classes.buttonpaiement}>Paiement</Button>
                </div>
                <img src={Bancaire} alt='moyen paiement' className='img-banc' />
              </div>
            </div>
          </Paper>
        </div>
      </>
    )
  }
}

export default BasketPage
