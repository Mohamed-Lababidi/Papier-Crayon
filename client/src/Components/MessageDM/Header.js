import React from 'react'

const Header = (props) => {
  return (
    <div className='header-container'>
      <p>{props.title}</p>
    </div>
  )
}

export default Header
