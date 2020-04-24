import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { FormGroup } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 200,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}))

const PaginationSelect = (props) => {
	const classes = useStyles()
	const [nOfResults, setNOfResults] = useState(props.visibleRecords)

	const updateResults = (totalNumber) => {
		setNOfResults(totalNumber)
		props.updatePagination(totalNumber)
	}

	return (
		<div>
			<FormControl variant="outlined" className={classes.formControl}>
				<InputLabel id="demo-simple-select-outlined-label">
					select number of records to browse
				</InputLabel>
				<Select
					labelId="demo-simple-select-outlined-label"
					id="demo-simple-select-outlined"
					label="hello"
					value={nOfResults}
					onChange={(e) => updateResults(e.target.value)}
				>
					<MenuItem value={10}>10</MenuItem>
					<MenuItem value={20}>20</MenuItem>
					<MenuItem value={30}>30</MenuItem>
					<MenuItem value={props.totalRecords}>
						All ({props.totalRecords})
					</MenuItem>
				</Select>
			</FormControl>
		</div>
	)
}

export default PaginationSelect
