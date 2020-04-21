import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Loading from '../../components/Loading'
import { useDispatch, useSelector } from 'react-redux'
import RecordCard from '../../components/RecordCard'
import { selectToken } from '../../store/user/selectors'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'

const SearchResults = (props) => {
	const token = useSelector(selectToken)
	const history = useHistory()
	const keywords = props.suggestions.suggestion
	const results = props.suggestions.data

	if (!props.suggestions) {
		return <Loading />
	}

	return (
		<div>
			<h4>We detect your record as "{keywords}"</h4>
			<p>Your Image:</p>
			<img
				alt="User Upload"
				style={{ width: '100px' }}
				src={props.recordUrl}
			></img>
			<Link to="/manualadd">
				<button>Click to add manually</button>
			</Link>
			<Link to="/addrecord">
				<button>Click here to retake picture</button>
			</Link>
			<p>Search results:</p>
			<div style={{ marginLeft: '100px' }}>
				{results.length === 0 ? (
					<p>Sorry, no records were found</p>
				) : (
					results.map((result) => {
						return (
							<RecordCard
								key={result.id}
								suggestion={true}
								id={result.id}
								title={result.title}
								artist={result.artist}
								imageUrl={result.imageUrl}
								genre={result.genre}
								style={result.style}
								year={result.year}
								lowestPrice={result.lowestPrice}
								format={result.format}
							/>
						)
					})
				)}
			</div>
		</div>
	)
}

export default SearchResults
