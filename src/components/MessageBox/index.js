import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectMessage } from '../../store/appState/selectors'
import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import { clearMessage } from '../../store/appState/actions'

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2),
		},
	},
}))

export default function MessageBox() {
	const classes = useStyles()
	const message = useSelector(selectMessage)
	const dispatch = useDispatch()
	const showMessage = message !== null

	if (!showMessage) return null

	return (
		<div className={classes.root}>
			<Alert
				show={showMessage}
				severity={message.variant}
				dismissible={message.dismissable}
				onClose={message.dismissable ? () => dispatch(clearMessage()) : null}
			>
				{message.text}
			</Alert>
		</div>
	)
}
