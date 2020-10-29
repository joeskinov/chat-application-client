/* eslint-disable no-fallthrough */
import { 
  FETCHING_CHATROOM_REQUEST, 
  FETCHING_CHATROOM_SUCCESS,
  FETCHING_CHATROOM_FAILURE, 
  } from './../../constants/constants';

const initialState = {
  isFetching: false,
  errorMessage: '',
  chatrooms: [],
};

const fetchChatroomReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_CHATROOM_REQUEST: {
      return { ...state, isFetching: true};
    }
    case FETCHING_CHATROOM_FAILURE: {
      return { ...state, errorMessage: action.data, isFetching: false };
    }
    case FETCHING_CHATROOM_SUCCESS: {
      if (action.data.data) {
        if (action.data.status === 201 || action.data.status === 200) {
          return { ...state, chatrooms: action.data.data, isFetching: false };
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
export default fetchChatroomReducer;
