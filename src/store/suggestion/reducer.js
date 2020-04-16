
const initialState = {
  artistName: null,
  recordName: null,
  genre: null,
  style: null,
  yearReleased: null,
  coverArtwork: null,
  averagePrice: null,
};


export default (state = initialState, action) => {
  switch (action.type) {
    case 'SUGGESTION_FETCHED':
      return action.payload;

    default:
      return state;
  }
};

