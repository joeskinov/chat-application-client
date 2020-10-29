/* eslint-disable no-fallthrough */
import { 
  CREATING_CHATMESSAGE_REQUEST, 
  CREATING_CHATMESSAGE_SUCCESS,
  CREATING_CHATMESSAGE_FAILURE, 
  } from './../../constants/constants';

const initialState = {
  isSuccess: false,
  isFetching: false,
  errorMessage: '',
  chatmessageDetails: null
};

const createChatmessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATING_CHATMESSAGE_REQUEST: {
      return { ...state, isFetching: true, isSuccess: false};
    }
    case CREATING_CHATMESSAGE_FAILURE: {
      return { ...state, errorMessage: action.data, isFetching: false };
    }
    case CREATING_CHATMESSAGE_SUCCESS: {
      if (action.data.data) {
        if (action.data.status === 201 || action.data.status === 200) {
          return { ...state, chatmessageDetails: action.data.data, isFetching: false, isSuccess: true };
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
export default createChatmessageReducer;
