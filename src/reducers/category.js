import { GET_CATEGORIES, START_FETCHING_CATEGORIES } from '../actions/types';

const INITIAL_STATE = {
  loading: true,
  categories: null,
};

const categoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_FETCHING_CATEGORIES:
      return { ...state, loading: true };
    case GET_CATEGORIES:
      return { ...state, loading: false, categories: action.payload };
    default:
      return state;
  }
};

export default categoryReducer;
