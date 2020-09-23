import React from 'react'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import design from '../../Assets/DesignPapier.jpg'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { useHistory } from 'react-router-dom'

import './UserCard.css'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 350,
    maxHeight: 600
  },
  usernamecard: {
    display: 'flex',
    justifyContent: 'flex-end',
    fontSize: '1em'

  },
  card: {
    paddingTop: '3px'
  }
}))

const UserCard = ({ user }) => {
  const classes = useStyles()

  const history = useHistory()
  const navigateTo = () => history.push(`/profile/${user.id}`)

  return (
    <div className='card-cont'>
      <Card className={classes.root} onClick={() => navigateTo()}>
        <div className='img-cont'>
          <img src={design} alt='design' className='img-land' />
        </div>
        <CardContent className={classes.card}>
          <Typography className={classes.usernamecard} variant='body2'>
            <div key={user.id}>
              <span>{user.username}</span><br />
            </div>
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default UserCard
