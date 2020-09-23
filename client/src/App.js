import React, { useState, useEffect } from 'react'
import AddDesign from './Components/Profile/AddDesign'
import AuthContext from './AuthContext'
import axios from 'axios'
import Basket from './Components/BasketPage/BasketPage'
import jwtDecode from 'jwt-decode'
import Landing from './Components/LandingPage/Landing'
import Login from './Components/Login/Login'
import MessageDM from './Components/MessageDM/MessageDM'
import Profile from './Components/Profile/profile'
import { Route } from 'react-router-dom'
import Register from './Components/Login/Register'
import Form from './Components/Profile/Form'
import { SnackbarProvider } from 'notistack'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'

import './App.css'
const theme = createMuiTheme({
  palette: {
    secondary: {
      main: '#212121'
    }
  }
})
const App = () => {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDesign, setSelectedDesign] = useState([])
  const token = localStorage.getItem('token')
  const decodedUser = token ? jwtDecode(token) : null
  const [loggedinuser, setLoggedinuser] = useState(decodedUser)

  const getAllArtist = () => {
    setIsLoading(true)
    axios
      .get('/landing?username=')
      .then((res) => setUsers(res.data))
      .then((res) => setIsLoading(false))
      .catch((error) => {
        console.error(error)
      })
  }

  const addDesign = (designToAdd) => {
    let newSelectedDesign = selectedDesign
    const designFound = selectedDesign.find(
      (design) => design.id === designToAdd.id
    )
    if (designFound === undefined) {
      newSelectedDesign.push(designToAdd)
    } else {
      const newQuantity = designFound.quantity + designToAdd.quantity // calcul la nouvelle quantité
      const designUpdated = { ...designFound, quantity: newQuantity } // creation de l'objet avec la bonne qte
      newSelectedDesign = selectedDesign.filter(
        (design) => design.id !== designToAdd.id
      ) // supprime le design avec la mauvaise quantité
      newSelectedDesign.push(designUpdated) // ajoute le design avec la qte modifié
    }
    setSelectedDesign(newSelectedDesign)
  }

  useEffect(() => {
    getAllArtist()
  }, [])

  return (
    <div>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        >
          <AuthContext.Provider
            value={{ user: loggedinuser, setUser: setLoggedinuser }}
          >
            <Route exact path='/'>
              {isLoading ? (
                <div>Chargement en cours</div>
              ) : (
                <Landing users={users} isLoading={isLoading} />
              )}
            </Route>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/register'>
              <Register />
            </Route>
            <Route path='/message' component={MessageDM} />
            <Route path='/profile/:userid'>
              <Profile
                users={users}
                addMainDesign={addDesign}
                selectedDesign={selectedDesign}
              />
            </Route>
            <Route path='/Basket'>
              <Basket
                selectedDesign={selectedDesign}
                setSelectedDesign={setSelectedDesign}
                users={users}
              />
            </Route>
            <Route path='/AddDesign'>
              <AddDesign />
            </Route>
            <Route path='/account'>
              <Form />
            </Route>
          </AuthContext.Provider>
        </SnackbarProvider>
      </ThemeProvider>
    </div>
  )
}

export default App
