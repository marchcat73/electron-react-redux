const INITIAL_STATE = {
  // loading: true,
};

const movieReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case START_FETCHING_CATEGORIES:
    //   return { ...state, loading: true };
    default:
      return state;
  }
};

export default movieReducer;
