const express = require('express')
const router = express.Router()
const checktoken = require('./services/checktoken')
const jwtSecret = require('./services/jwtSecret')
const connection = require('../conf.js')
const multer = require('multer')
const path = require('path')
const jwt = require('jsonwebtoken')

router.get('/:id/picture', (req, res) => {
  const idPicture = req.params.id
  connection.query(
    'SELECT picture FROM Bio WHERE user_id = ?',
    [idPicture],
    (err, results) => {
      if (err) {
        res.status(500).send('Fail')
      } else {
        res.status(200).send(results[0])
      }
    }
  )
})

router.put('/account/information', checktoken, (req, res) => {
  const formData = req.body
  const idUser = req.user.id

  connection.query(
    'UPDATE Users SET ? WHERE id = ?',
    [formData, idUser],
    (err, results) => {
      if (err) {
        console.error(err)
        res.status(500).send('Failed to update profile informations')
      } else {
        const profile = {
          ...formData,
          id: idUser
        }
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
        res.sendStatus(200)
      }
    }
  )
})

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './Assets')
  },
  filename: function (req, file, callback) {
    const d = new Date()
    const date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
    console.log(date)
    const filename = file.originalname.replace(/ /g, '-')
    const dateFilename = date + '-' + filename
    callback(null, dateFilename)
  }
})

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    const ext = path.extname(file.originalname)
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.svg' && ext !== '.jpeg') {
      return callback(new Error('Only images are allowed'))
    }
    callback(null, true)
  }
}).single('file')

router.put('/account/picture', checktoken, (req, res) => {
  upload(req, res, function (err) {
    const errorpicture = []

    if (err) {
      console.log(err)
      errorpicture.push('Please enter all fields')
    } else {
      const pictureData = {
        picture: req.file.filename
      }
      connection.query('UPDATE Bio SET ? WHERE user_id = ?', [pictureData, req.user.id], (err, result) => {
        if (err) {
          console.log(err)
          res.status(400).send('Error')
        } else {
          res.status(200).send(pictureData)
        }
      })
    }
  })
})

// router.put('/account/social', checktoken, (req, res) => {
//   const formData = req.body
//   const idUser = req.user.id

//   connection.query(
//     'UPDATE Bio SET ? WHERE user_id = ?',
//     [formData, idUser],
//     (err, results) => {
//       if (err) {
//         console.error(err)
//         res.status(500).send('Failed to update social informations')
//       } else {
//         const social = {
//           ...formData,
//           id: idUser
//         }
//         const token = jwt.sign(
//           social,
//           jwtSecret,
//           {
//             expiresIn: '24h'
//           },
//           {
//             algorithm: 'RS256'
//           }
//         )
//         res.header('Access-Control-Expose-Headers', 'x-access-token')
//         res.set('x-access-token', token)
//         res.sendStatus(200)
//       }
//     }
//   )
// })

// router.get('/:id/social', (req, res) => {
//   const idPicture = req.params.id
//   connection.query(
//     'SELECT picture FROM Bio WHERE user_id = ?',
//     [idPicture],
//     (err, results) => {
//       if (err) {
//         res.status(500).send('Fail')
//       } else {
//         res.status(200).send(results[0])
//       }
//     }
//   )
// })

module.exports = router
