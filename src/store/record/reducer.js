const initialState = []

export default (state = initialState, action) => {
	switch (action.type) {
		case 'FETCHED_USER_RECORDS_SUCCESS':
			return [...action.payload]

		case 'RECORD_ADDED_SUCCESS':
			return [...state, action.payload]

		default:
			return state
	}
}
