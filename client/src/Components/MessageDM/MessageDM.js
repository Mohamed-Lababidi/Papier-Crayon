import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../../AuthContext'
import InfoBar from './InfoBar'
import Input from './Input'
import io from 'socket.io-client'
import Messages from './Messages'
import queryString from 'query-string'
import ListDm from './ListDm'
import Navbar from '../Navbar/Navbar'
import { serverUrl } from '../../config'
// import TextArea from "./TextArea";

import './MessageDM.css'

let socket

const MessageDM = ({ location }) => {
  const auth = useContext(AuthContext)
  const { user } = auth
  const name = user.username
  const [users, setUsers] = useState(user.username)
  const [room, setRoom] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  const ENDPOINT = serverUrl

  localStorage.getItem(name)

  useEffect(() => {
    const { room } = queryString.parse(location.search)
    // console.log('locationsearch', )
    socket = io(ENDPOINT)

    setRoom(room)

    socket.emit('join', { name, room }, (error) => {
      if (error) {
        alert(error)
      }
    })
  }, [ENDPOINT, location.search])

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message])
    })

    socket.on('roomData', ({ users }) => {
      setUsers(users)
    })
  }, [])

  const sendMessage = (event) => {
    event.preventDefault()

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''))
    }
  }

  return (
    <div className='outerContainer'>
      <Navbar />
      <div className='box-dm'>
        <ListDm />
        <div className='container'>
          <InfoBar room={room} users={users} />
          <Messages messages={messages} name={name} />
          <Input
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </div>
      </div>
      {/* <TextArea users={users} /> */}
    </div>
  )
}

export default MessageDM
