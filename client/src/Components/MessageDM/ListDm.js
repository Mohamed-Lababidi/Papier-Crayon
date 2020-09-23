import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import AuthContext from '../../AuthContext'

import './ListDm.css'

function ListDm () {
  const auth = useContext(AuthContext)
  const userid = auth.user.id
  const name = auth.user.username
  const [picture, setPicture] = useState('')
  const getPicture = () => {
    axios.get(`http://localhost:8080/bio/${userid}/picture`).then((res) => {
      setPicture(res.data)
    })
  }

  useEffect(() => {
    getPicture()
  }, [])

  return (
    <div className='list-box'>
      <h3 className='direct-title'>Direct</h3>
      <div className='div-container-conv'>
        <div className='img-name-conv'>
          <img className='img-profile-listdm' alt='profilpicture' src={`http://localhost:8080/${picture.picture}`} />
          <p>{name}</p>
        </div>
      </div>
    </div>
  )
}

export default ListDm
