import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeUserRecord } from '../../store/record/actions'
import './RecordCard.css'
import { TiDeleteOutline } from 'react-icons/ti'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import { addARecord } from '../../store/record/actions'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { useHistory, Link } from 'react-router-dom'

const useStyles = makeStyles({
	root: {
		maxWidth: 345,
	},
})

const RecordCard = (props) => {
	const classes = useStyles()
	const history = useHistory()

	const {
		id,
		title,
		artist,
		lowestPrice,
		genre,
		style,
		format,
		year,
		imageUrl,
	} = props
	const dispatch = useDispatch()

	const removeRecord = (id) => {
		dispatch(removeUserRecord(id))
	}

	const addRecord = () => {
		dispatch(
			addARecord({
				id,
				title,
				artist,
				genre,
				style,
				format,
				lowestPrice,
				year,
				imageUrl,
			})
		)
		history.push('/browse')
	}

	return (
		<Card className={`${classes.root} record-card`}>
			{!props.suggestion ? (
				<TiDeleteOutline className="delete" onClick={() => removeRecord(id)} />
			) : null}
			<CardActionArea>
				<CardMedia
					style={{ margin: 'auto', width: '300px' }}
					component="img"
					alt={`${artist} - ${title} cover artwork`}
					image={imageUrl}
					title={`${title} by ${artist}`}
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						{`${title} by ${artist}`}
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						<strong>Genre(s):</strong> {`${genre}`}
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						<strong>Style(s):</strong> {`${style}`}
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						<strong>Year:</strong> {`${year}`}
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						<strong>Format(s): </strong>
						{`${format}`}
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						<strong>Lowest Price: </strong> €{`${lowestPrice}`}
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				{!props.suggestion ? (
					<Button size="small" color="primary">
						Share this record
					</Button>
				) : (
					<Button size="small" color="primary" onClick={addRecord}>
						Add this record to my collection
					</Button>
				)}
				<Button size="small" color="primary">
					More Details
				</Button>
			</CardActions>
		</Card>
	)
}

export default RecordCard
