import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const CommInput = (props) => {
  const [comment, setComment] = useState('')

  const handleClick = () => {
    props.addComment(comment)
    setComment('')
  }

  const getComment = (evt) => {
    setComment(evt.target.value)
  }

  const useStyles = makeStyles((theme) => ({
    buttonComment: {
      width: '83px',
      height: '30px',
      backgroundColor: 'black',
      color: 'white',
      borderRadius: '0',
      fontSize: '10px'
    }
  }))
  const classes = useStyles()

  return (

    <div className='commInpWrap'>
      <label htmlFor='commInp' />
      <input
        value={comment}
        onChange={(event) => getComment(event)}
        type='text'
        className='commInp textRegularLrg'
        id='commInp'
        name='commInp'
        placeholder='Write a comment'
      />
      <Button onClick={handleClick} className={classes.buttonComment}>
        Comment
      </Button>
    </div>
  )
}

export default CommInput
