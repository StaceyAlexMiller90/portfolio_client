
const initialState = {
  suggestion: null,
  data: []
};


export default (state = initialState, action) => {
  switch (action.type) {
    case 'SUGGESTIONS_FETCHED':
      return {
        suggestion: action.payload.suggestion,
        data: action.payload.data 
      }

    default:
      return state;
  }
};

