/* eslint-disable no-fallthrough */
import { 
  FETCHING_CHATMESSAGE_REQUEST, 
  FETCHING_CHATMESSAGE_SUCCESS,
  FETCHING_CHATMESSAGE_FAILURE, 
  } from './../../constants/constants';

const initialState = {
  isSuccess: false,
  isFetching: false,
  errorMessage: '',
  chatmessages: [{participants:null, creator:{picture:null}}],
};

const fetchChatmessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_CHATMESSAGE_REQUEST: {
      return { ...state, isFetching: true, isSuccess: false};
    }
    case FETCHING_CHATMESSAGE_FAILURE: {
      return { ...state, errorMessage: action.data, isFetching: false, isSuccess: false };
    }
    case FETCHING_CHATMESSAGE_SUCCESS: {
      if (action.data.data) {
        if (action.data.status === 201 || action.data.status === 200) {
          return { ...state, chatmessages: action.data.data, isFetching: false, isSuccess: true };
        } else if (action.data.data.status === 500) {
          return { ...state, errorMessage: action.data.data.status, isFetching: false, isSuccess: false};
        }
      } else { return { ...state, errorMessage: action.data, isFetching: false, isSuccess: false };
      }
    }
    default:
      return state;
  }
};
export default fetchChatmessageReducer;
