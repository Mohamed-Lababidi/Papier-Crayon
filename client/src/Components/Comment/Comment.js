import React, { useContext, useState, useEffect } from 'react'
import AuthContext from '../../AuthContext'
import axios from 'axios'
import { useParams } from 'react-router-dom'
// import like1 from '../Assets/like.svg'
// import unlike from '../Assets/unlike.svg'

const Comment = ({ comment }) => {
  const [like, setLike] = useState(false)
  const auth = useContext(AuthContext)
  const { userid } = useParams()
  const [picture, setPicture] = useState([])
  const name = auth.user.username
  localStorage.getItem(name)

  const d = new Date()
  const date = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear()

  const getPicture = () => {
    axios.get(`http://localhost:8080/bio/${userid}/picture`).then((res) => {
      setPicture(res.data)
    })
  }

  useEffect(() => {
    getPicture()
  }, [])

  return (
    <div className='commWrap'>
      <img
        className='avatarMed'
        src={`http://localhost:8080/${picture.picture}`}
        alt='User account avatar'
      />
      <div className='postInfo'>
        <div className='infobox'>
          <span className='userName textGreen textSemiBold'>{name}</span>
          <span className='timePosted textRegularSml'>{date}</span>

          <div className='commActionWrap'>
            <div className='commAction commLike'>
              <i className='fas fa-thumbs-up' />
              <input
                className='likeCount'
                type='Button'
                value={like ? 'like' : 'unlike'}
                onClick={(e) => setLike(!like)}
              />
            </div>
          </div>
        </div>

        <p className='userComm textRegularLrg'>{comment}</p>
        <span className='commAction commReply'>Reply</span>

      </div>
    </div>
  )
}

export default Comment
