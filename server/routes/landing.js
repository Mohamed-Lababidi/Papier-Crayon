const express = require('express')
const router = express.Router()

const connection = require('../conf')

// Deux façons d'appeler cette route
// req.query = params passés dans l'URL
// 1. pas de paramètre:        http://localhost:8080/users  ---> req.query = {}

// 2. avec paramètre username (derrière le ? on trouve la query string ou chaîne de paramètres)
//     http://localhost:8080/users?username=bobby  ---> req.query = { username: 'bobby' }      `${username}`

// 3. par exemple si on avait http://localhost:8080/users?username=bobby&city=paris
// req.query = { username: 'bobby', city: 'paris' }

router.get('/', (req, res) => {
  const { firstname } = req.query
  let sql
  let args

  if (firstname) {
    sql =
      'SELECT id, firstname, lastname, username FROM Users WHERE username LIKE ? '
    args = ['%' + firstname + '%']
  } else {
    sql = 'SELECT id, firstname, lastname, username FROM Users '
    args = []
  }

  connection.query(sql, args, (err, users) => {
    if (err) {
      res.status(500).send("Doesn't exist")
    } else {
      res.json(users)
    }
  })
})

module.exports = router
