const express = require('express')
const bcrypt = require('bcrypt')

const router = express.Router()
const validator = require('email-validator')

const connection = require('../../conf.js')

router.post('/', (req, res) => {
  const user = {
    mail: req.body.email,
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password
  }

  const errors = []
  if (!user.username || !user.firstname || !user.lastname || !user.password || !user.mail) {
    errors.push('Please enter all fields')
  }
  if (user.password && user.password.length < 6) {
    errors.push('Password too short')
  }
  if (!validator.validate(user.mail)) {
    errors.push('Invalid email')
  }
  if (errors.length > 0) {
    res.status(422).json({ errors })
    return
  }

  // niveau d'encryptage du mot de passe:
  const saltRounds = 10

  // fonction pour encryptage
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    console.log('errbcrypt :', err)
    user.password = hash
    connection.query('INSERT INTO Users SET ?', [user], (err, results) => {
      if (err) {
        if (err.sqlMessage.includes(`Duplicate entry '${user.mail}'`)) {
          return res.status(400).json({ errors: ['Email already exist'] })
        }
        if (err.sqlMessage.includes(`Duplicate entry '${user.username}'`)) {
          return res.status(400).json({ errors: ['Username already exist'] })
        }
        return res.status(500).json({ errors: ['Something went wrong'] })
      }
      const bioData = { user_id: results.insertId }
      connection.query('INSERT INTO Bio SET ?', bioData, (err) => {
        if (err) {
          console.error('errbiodata :', err)
          return res.status(500).json({ errors: ['Failed to create bio info'] })
        }
        res.json(results)
      })
    })
  })
})

module.exports = router
