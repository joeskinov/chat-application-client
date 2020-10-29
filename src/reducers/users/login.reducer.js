import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
} from './../../constants/constants';

const initialState = {
    isFetching: false,
    isAuthenticated: false,
    appError: '',
    userDetails: null,
};

const userLogin = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST: {
            return {
                ...state,
                appError: '',
                isFetching: true,
            }
        }
        case LOGIN_SUCCESS: {
            if (action.data.data) {
                if (action.data.status === 201 || action.data.status === 200 ) {
                    return {
                        ...state,
                        appError: 'SUCCESS',
                        userDetails: action.data.data,
                        isAuthenticated: true,
                        isFetching: false,
                    }
                } else if (action.data.data.status === 500) {
                    return {
                        ...state,
                        errorMessage: action.data,
                        appError: action.data.message,
                        isFetching: false,
                        isSignedUp: false
                    }
                }
            } else {
                return {
                    ...state,
                    appError: action.data.message,
                    userDetails: null,
                    isFetching: false,
                    isSignedUp: false
                }
            }
        }
        case LOGIN_FAILURE: {
            return {
                ...state,
                userDetails: null,
                appError: action.data.message,
                isSignedUp: false,
                isFetching: false,
            }
        }
        default:
            return state;
    }
};
export default userLogin;