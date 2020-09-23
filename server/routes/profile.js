const express = require('express')
const checktoken = require('./services/checktoken')
const router = express.Router()

const connection = require('../conf.js')
const multer = require('multer')
const path = require('path')

router.get('/', (req, res) => {
  res.send(res, req).status(200)
})

// recuperer picture,lastname,firstname,liens des réseaux
// repond aux requetes sur /profile/1, /profile/2, etc.
router.get('/:id', (req, res) => {
  connection.query(
    // 'SELECT Users.id, username, picture, name, price, description, date_creation, picture FROM Users JOIN Design On Users.id = Design.user_id WHERE Users.id = ? ',
    'SELECT Users.id, username FROM Users WHERE Users.id = ?',
    [req.params.id],
    (err, results) => {
      if (err) {
        console.error(err)
        res.status(500).send('Fail to load user id')
      } else {
        res.json(results[0])
      }
    }
  )
})

// recuperer * de tous les designs
router.get('/:id/designs', (req, res) => {
  const idDesign = req.params.id
  connection.query(
    'SELECT * FROM Design WHERE user_id = ?',
    [idDesign],
    (err, results) => {
      if (err) {
        res.status(500).send('Fail')
      } else {
        res.status(200).send(results)
      }
    }
  )
})

// mise a jour des information de user
router.put('/:id', (req, res) => {
  const idProfile = req.params.idProfile
  const formData = req.body
  connection.query(
    'UPDATE Users SET ? WHERE id = ?',
    [idProfile, formData],
    (err) => {
      if (err) {
        res.status(500).send('something was wrong')
      } else {
        res.status(200).send('Profile was modified')
      }
    }
  )
})

// Add new design

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

router.post('/designadding', checktoken, (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      res.status(400).send('Error!')
    } else {
      const formData = req.body
      const designData = {
        ...formData,
        picture: req.file.filename,
        user_id: req.user.id
      }
      console.log(designData)
      connection.query(
        'INSERT INTO Design SET ?',
        [designData],
        (err, result) => {
          console.log(err, result)
          if (err) {
            res.status(400).send('fail to upload your picture')
          } else {
            connection.query(
              'SELECT * FROM Design WHERE id = ?',
              result.insertId,
              (err, result) => {
                if (err) {
                  res.status(400).send('fail to upload your picture')
                } else {
                  res.status(200).json(result)
                }
              }
            )
          }
        }
      )
    }
  })
})

router.delete('/:userid/designs/:designid', (req, res) => {
  const idDesign = req.params.designid
  console.log('iddesign :', idDesign)
  const sql = 'DELETE FROM Design WHERE id = ?'
  connection.query(sql, [idDesign], (err, result) => {
    if (err) {
      res.status(500).send('error while deleting your design')
    } else {
      res.status(200).send(result)
      console.log('delete', result)
    }
  })
})
module.exports = router
