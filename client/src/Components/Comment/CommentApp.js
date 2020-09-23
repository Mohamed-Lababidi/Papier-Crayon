import React, { useState } from 'react'
import CommInput from './CommentInput'
import CommList from './CommentList'

const CommApp = () => {
  const [comments, setComments] = useState([])

  const addComment = (comment) => {
    setComments(prevComments => [...prevComments, comment])
  }

  return (
    <div className='commAreaWrap'>
      <CommList comments={comments} />
      <CommInput addComment={addComment} />
    </div>
  )
}

export default CommApp
