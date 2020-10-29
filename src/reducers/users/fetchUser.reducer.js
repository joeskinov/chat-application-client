/* eslint-disable no-fallthrough */
import { 
  FETCHING_USER_REQUEST, 
  FETCHING_USER_SUCCESS,
  FETCHING_USER_FAILURE, 
  } from './../../constants/constants';

const initialState = {
  isFetching: false,
  errorMessage: '',
  users: [],
};

const fetchUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_USER_REQUEST: {
      return { ...state, isFetching: true};
    }
    case FETCHING_USER_FAILURE: {
      return { ...state, errorMessage: action.data, isFetching: false };
    }
    case FETCHING_USER_SUCCESS: {
      if (action.data.data) {
        if (action.data.status === 201 || action.data.status === 200) {
          return { ...state, users: action.data.data, isFetching: false };
        } else if (action.data.data.status === 500) {
          return { ...state, errorMessage: action.data.data.status, isFetching: false};
        }
      } else { return { ...state, errorMessage: action.data, isFetching: false };
      }
    }
    default:
      return state;
  }
};
export default fetchUserReducer;
