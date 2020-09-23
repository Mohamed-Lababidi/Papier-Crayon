const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const validator = require('email-validator')
const jwt = require('jsonwebtoken')

const connection = require('../../conf.js')
const jwtSecret = require('../services/jwtSecret.js')

router.post('/', (req, res) => {
  const { email, password } = req.body

  const errors = []
  if (!email == null || !password == null) {
    errors.push('adresse mail or password incorrect')
  }
  if (!validator.validate(email)) {
    errors.push('adresse mail or password incorrect')
  }
  if (errors.length > 0) {
    res.status(400).json({ errors })
    return
  }

  connection.query(
    'SELECT * FROM Users WHERE mail = ?',
    [email],
    (err, results) => {
      if (err) {
        return res.status(400).json({ errors: ['password or mail was wrong'] })
      }
      if (results.length === 0) {
        return res.status(400).json({ errors: ['Please check the fields'] })
      }

      const myPlaintextPassword = password
      const hash = results[0].password

      bcrypt.compare(myPlaintextPassword, hash, function (err, isMatch) {
        if (err) {
          res.status(400).json({ errors: ['Something went wrong'] })
        } else if (!isMatch) {
          res.status(400).json({ errors: ['adresse mail or password incorrect'] })
        } else {
          const user = results[0]
          delete user.password

          const profile = {
            id: user.id,
            username: user.username,
            mail: user.mail,
            firstname: user.firstname,
            lastname: user.lastname
          }
          console.log(profile)
          const token = jwt.sign(
            profile,
            jwtSecret,
            {
              expiresIn: '24h'
            },
            {
              algorithm: 'RS256'
            }
          )
          res.header('Access-Control-Expose-Headers', 'x-access-token')
          res.set('x-access-token', token)
          res.status(200).send(profile)
        }
      })
    }
  )
})

module.exports = router
