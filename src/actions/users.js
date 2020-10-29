import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  FETCHING_USER_REQUEST,
  FETCHING_USER_SUCCESS,
  FETCHING_USER_FAILURE,
  USER_TOKEN,
} from './../constants/constants';
import {SERVER} from './../config/Endpoint.js';
import axios from 'axios';

function createUserPromise(userData) {
  console.log(userData);
  userData.access_token = 'master';
  return axios({
    method: 'post',
    url: `${SERVER}/users`,
    data: JSON.stringify(userData),
    headers: {'Content-Type': 'application/json'},
    // params: {'access_token': 'masterKey'}
  })
    .then(data => {
      //console.log('data: ' + data);
      return data;
    })
    .catch(error => {
      console.log('error: ', error.response.data.message);
      return error.response;
    });
}

function fetchUsersPromise(userData = {page: 1, limit: 10, filter: 'none'}, token) {
  const objectToUrl = Object.entries(userData).map(([key, value]) => encodeURIComponent(key) + '=' + encodeURIComponent(value)).join('&');
  console.log(objectToUrl);
  return axios({
    method: 'get',
    url: `${SERVER}/users?${objectToUrl}`,
    headers: {
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
    },
  })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.log(error.response);
      return error.response;
    });
}

function loginUserPromise(userData) {
  return axios({
    method: 'post',
    url: `${SERVER}/auth`,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(userData.email + ':' + userData.password)
    },
    data: {"access_token": "master"},
  })
    .then(data => {
      // console.log(data.data.token);
      return data;
    })
    .catch(error => {
      // console.log(error);
      return error.response;
    });
}

export const createUser = userData => dispatch => {
    dispatch({
        type: SIGNUP_REQUEST,
      });
  return createUserPromise(userData)
    .then(resp =>
      dispatch({
        type: SIGNUP_SUCCESS,
        data: resp,
      }),
    )
    .catch(resp =>
      dispatch({
        type: SIGNUP_FAILURE,
        data: resp,
      }),
    );
};

export const fetchUsers = userData => dispatch => {
  dispatch({type: FETCHING_USER_REQUEST});
  getToken().then(token => {
      return fetchUsersPromise(userData, token)
        .then(resp => {
          dispatch({
            type: FETCHING_USER_SUCCESS,
            data: resp
          });
          saveData('FETCHED_USERS', resp.data.data);
        }
        )
        .catch(resp =>
          dispatch({
            type: FETCHING_USER_FAILURE,
            data: resp
          })
        );
    })
    .catch(resp => {
        // failure
      });
};

function set(key, value) {
  let value2 = JSON.stringify(value);
  if (value2) return localStorage.setItem(key, value);
  else console.log('not set, stringify failed:', key, value);
}
let _storeData = async (key, token) => {
  try {
    await set(key, token);
  } catch (error) {
    // Error saving data
    console.log('Error saving the data');
  }
};

export const loginUser = userData => dispatch => {
    dispatch({
        type: LOGIN_REQUEST,
      });
  return loginUserPromise(userData)
    .then(resp => {
      dispatch({
        type: LOGIN_SUCCESS,
        data: resp,
      });
      _storeData(USER_TOKEN, resp.data.token);
    })
    .catch(resp => {
      dispatch({
        type: LOGIN_FAILURE,
        data: resp,
      });
    });
};

let _retrieveData = async (key) => {
  try {
    const value = await localStorage.getItem(key);
    if (value !== null) {
      // We have data!!
      // console.log('this value', value);
      return value;
    } 
  } catch (error) {
    // Error retrieving data
    return error;
  }
};

export const getToken = () => _retrieveData(USER_TOKEN);
export const saveData = (key, value) => _retrieveData(key, value);

export const logout = () => {
  localStorage.removeItem(USER_TOKEN);
};