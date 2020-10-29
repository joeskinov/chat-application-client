import {
  FETCHING_USER_REQUEST,
  FETCHING_USER_SUCCESS,
  FETCHING_USER_FAILURE
} from './../constants/constants';
import {SERVER} from './../config/Endpoint.js';
import axios from 'axios';

import { getToken, saveData } from "./users";

function fetchUserPromise(token) {
  return axios({
    method: 'get',
    url: `${SERVER}/user/me`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(data => {
      console.log('data',data.data);
      return data;
    })
    .catch(error => {
      console.log(error.response);
      return error.response;
    });
}


export const fetchUser = userData => dispatch => {
  dispatch({type: FETCHING_USER_REQUEST});
  getToken().then(token => {
      return fetchUserPromise(token)
        .then(resp => {
          dispatch({
            type: FETCHING_USER_SUCCESS,
            data: resp
          })
          saveData('FETCHED_PROFILE', resp.data.data);
        })
        .catch(resp =>
          dispatch({
            type: FETCHING_USER_FAILURE,
            data: resp
          }),
        );
    })
    .catch(resp => {
        // code in case of failure
      });
};