import React from 'react'

function profilefigurecontent (props) {
  return (
    <div>
      <p>{props.username}</p>
      <img src={props.photo} />
      <p>{props.description}</p>
      <p>{props.dateCreation} </p>
    </div>
  )
}

export default profilefigurecontent
