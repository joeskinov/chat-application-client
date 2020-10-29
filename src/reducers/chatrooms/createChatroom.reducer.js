/* eslint-disable no-fallthrough */
import { 
  CREATING_CHATROOM_REQUEST, 
  CREATING_CHATROOM_SUCCESS,
  CREATING_CHATROOM_FAILURE, 
  } from './../../constants/constants';

const initialState = {
  isSuccess: false,
  isFetching: false,
  errorMessage: '',
  chatroomDetails: null
};

const createChatroomReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATING_CHATROOM_REQUEST: {
      return { ...state, isFetching: true, isSuccess: false};
    }
    case CREATING_CHATROOM_FAILURE: {
      return { ...state, errorMessage: action.data, isFetching: false };
    }
    case CREATING_CHATROOM_SUCCESS: {
      if (action.data.data) {
        if (action.data.status === 201 || action.data.status === 200) {
          return { ...state, chatroomDetails: action.data.data, isFetching: false, isSuccess: true };
        } else if (action.data.data.status === 500) {
          return { ...state, errorMessage: action.data.data.status, isFetching: false, isSuccess: false,};
        }
      } else { return { ...state, errorMessage: action.data, isFetching: false, isSuccess: false, };
      }
    }
    default:
      return state;
  }
};
export default createChatroomReducer;
