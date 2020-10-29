import {
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE, 
} from './../../constants/constants';

const initialState = {
    isFetching: false,
    isSignedUp: false,
    appError: '',
    userDetails: null,
};

const userSignup = (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP_REQUEST: {
            return {
                ...state,
                appError: '',
                isFetching: true,
                isSignedUp: false
            }
        break;
        }
        case SIGNUP_SUCCESS: {
            if (action.data.data) {
                if (action.data.status === 201 || action.data.status === 200) {
                    return {
                        ...state,
                        userDetails: action.data.data,
                        appError: 'SUCCESS',
                        isSignedUp: true,
                        isFetching: false,
                    }
                } else if (action.data.data.status === 500) {
                    return {
                        ...state,
                        appError: action.data.message,
                        isFetching: false,
                        isSignedUp: false
                    }
                }
            } else {
                return {
                    ...state,
                    appError: action.data.message,
                    isFetching: false,
                    isSignedUp: false
                }
            }
        break;
        }
        case SIGNUP_FAILURE: {
            return {
                ...state,
                appError: action.data.message,
                isFetching: false,
                isFetching: false,
            }
        break;
        }
        default:
            return state;
            break;
    }
};
export default userSignup;