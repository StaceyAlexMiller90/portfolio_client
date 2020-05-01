const initialState = {
  suggestion: null,
  data: [],
  uploadImage: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SUGGESTIONS_FETCHED':
      const {
        image,
        data: { data, suggestion },
      } = action.payload
      return {
        suggestion: suggestion,
        data: data,
        uploadImage: image,
      }

    case 'SUGGESTIONS_CLEARED':
      return initialState

    default:
      return state
  }
}
