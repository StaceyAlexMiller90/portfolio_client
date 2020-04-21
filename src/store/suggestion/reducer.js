const initialState = {
	suggestion: null,
	data: [],
	uploadImage: null,
}

export default (state = initialState, action) => {
	switch (action.type) {
		case 'SUGGESTIONS_FETCHED':
			return {
				suggestion: action.payload.data.suggestion,
				data: action.payload.data.data,
				uploadImage: action.payload.image,
			}

		case 'SUGGESTIONS_CLEARED':
			return initialState

		default:
			return state
	}
}
