const jwt = require('jsonwebtoken')
const jwtSecret = require('./jwtSecret')

const checktoken = (req, res, next) => {
  const token = req.headers.authorization
  // on vérifie la présence du token dans les headers
  if (!token) {
    return res.sendStatus(401)
  }
  // récuperer les informations de l'utilisateur à partir du token
  const decoded = jwt.verify(token, jwtSecret)
  // transmettre les données d'utilisateur à la fonction suivante en stockant l'utilisateur dans l'objet request
  req.user = decoded
  console.log('userData :', decoded)
  next()
}

module.exports = checktoken
