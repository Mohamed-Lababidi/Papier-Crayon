require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()
const server = app.listen(`${process.env.PORT}`)
const io = require('socket.io')(server)

const morgan = require('morgan')
const routes = require('./routes/index')

const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom
} = require('./routes/users')

app.use(cors())
app.use(morgan('dev'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('Assets'))

app.use('/landing', routes.landing)
app.use('/login', routes.login)
app.use('/register', routes.register)
app.use('/profile', routes.profile)
app.use('/chat', routes.chat)
app.use('/bio', routes.bio)
// app.use('/seller', routes.seller)

io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { user, error } = addUser({ id: socket.id, name, room })
    console.log('socketiojoin :', name, room, socket.id)
    if (error) return ('error: ', error)

    socket.join(user.room)

    socket.emit('message', {
      text: 'Send your message'
      // text: `${user.name}`
    })

    const d = new Date()
    const date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
    console.log(date)

    socket.broadcast
      .to(user.room)
      .emit('message', { user: date, text: `${user.name} has joined!` })

    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room)
    })
    callback()
  })

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id)
    console.log('sendmessage', user, message)
    io.to(user.room).emit('message', { user: user.name, text: message })
    callback()
  })

  socket.on('disconnect', () => {
    const user = removeUser(socket.id)
    if (user) {
      io.to(user.room).emit('message', {
        user: 'Designer',
        text: `${user.name} has left.`

      })
      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room)
      })
    }
  })
})
