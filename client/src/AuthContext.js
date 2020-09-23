import { createContext } from 'react'

const AuthContext = createContext({
  user: null,
  setUser: () => {
  }
})
// les valeur par défaut sont remplacer par les valeurs données dans App.js via value = {user et setUser}

export default AuthContext
