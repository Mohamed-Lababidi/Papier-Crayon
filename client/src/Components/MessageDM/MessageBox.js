// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import Header from './Header'
// import MessageBoxCont from './MessageBoxCont'

// const MessageBox = () => {
//   // const [invitations, setInvitations] = useState([]);
//   const [name, setName] = useState([])
//   const [room, setRoom] = useState([])
//   const userid = localStorage.getItem('user')
//   const isRoom = localStorage.getItem('isRoom')
//   const date = new Date()

//   useEffect(() => {
//     axios.get(`http://localhost:8080/profile/${userid}/`).then((res) => {
//       setName(res.data.username)
//       setRoom(res.data.username)
//     })
//   }, [])

//   if (isRoom === 'true') {
//     return (
//       <div>
//         <Header title='Messages' />
//         {name.map((invit) => {
//           return (
//             <MessageBoxCont
//               firstname={`${user.username}`}
//               date={date.now}
//             />
//           )
//         })}
//       </div>
//     )
//   } else {
//     return (
//       <div>
//         <Header title='Messages' />
//         {room.map((invit) => {
//           return (
//             <MessageBoxCont
//               firstname={`${invit.user.username}`}
//               date={date.now}
//             />
//           )
//         })}
//       </div>
//     )
//   }
// }


// export default MessageBox
