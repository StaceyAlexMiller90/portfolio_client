import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import { login } from '../../store/user/actions'
import { selectToken } from '../../store/user/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import { FormGroup } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '40ch',
		},
	},
}))

export default function SignUp() {
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

		dispatch(login(email, password))

		setEmail('')
		setPassword('')
	}

	return (
		<Container maxWidth="sm">
			<form className={classes.root}>
				<h1 className="mt-5 mb-5">Login</h1>
				<FormGroup>
					<TextField
						id="outlined-basic"
						label="email address"
						variant="outlined"
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
						label="password"
						variant="outlined"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
						type="password"
						placeholder="Password"
						required
					/>
				</FormGroup>
				<FormGroup>
					<Button variant="outlined" type="submit" onClick={submitForm}>
						Log in
					</Button>
				</FormGroup>
				<Link to="/signup" style={{ color: 'black' }}>
					Click here to sign up
				</Link>
			</form>
		</Container>
	)
}
