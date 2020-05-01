import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { signUp } from '../../store/user/actions'
import { selectToken } from '../../store/user/selectors'
import { FormGroup } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '40ch',
    },
  },
}))

export default function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const token = useSelector(selectToken)
  const history = useHistory()
  const classes = useStyles()

  useEffect(() => {
    if (token !== null) {
      history.push('/')
    }
  }, [token, history])

  function submitForm(event) {
    event.preventDefault()

    dispatch(signUp(name, email, password))

    setEmail('')
    setPassword('')
    setName('')
  }

  return (
    <Container maxWidth="sm" style={{ paddingTop: '3rem' }}>
      <form className={classes.root}>
        <h1>Sign up</h1>
        <FormGroup>
          <TextField
            id="outlined-basic"
            variant="outlined"
            label={'name'}
            value={name}
            onChange={(event) => setName(event.target.value)}
            type="text"
            placeholder="Enter name"
            required
          />
        </FormGroup>
        <FormGroup>
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="email"
            helperText={'we will never share your email'}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            placeholder="Enter email"
            required
          />
        </FormGroup>
        <FormGroup>
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            placeholder="Password"
            required
          />
        </FormGroup>
        <FormGroup>
          <Button variant="outlined" type="submit" onClick={submitForm}>
            Sign up
          </Button>
        </FormGroup>
        <Link style={{ color: 'black' }} to="/login">
          Click here to log in
        </Link>
      </form>
    </Container>
  )
}
