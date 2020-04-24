const initialState = {
	count: 0,
	records: [],
}

export default (state = initialState, action) => {
	switch (action.type) {
		case 'FETCHED_PAGE_USER_RECORDS_SUCCESS':
			return {
				count: action.payload.count,
				records: [...state.records, ...action.payload.records],
			}

		case 'RECORD_ADDED_SUCCESS':
			return { ...state, records: [...state.records, action.payload] }

		default:
			return state
	}
}
