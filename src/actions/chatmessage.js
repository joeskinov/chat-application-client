import {
    CREATING_CHATMESSAGE_REQUEST,
    CREATING_CHATMESSAGE_SUCCESS, 
    CREATING_CHATMESSAGE_FAILURE,
    FETCHING_CHATMESSAGE_REQUEST,
    FETCHING_CHATMESSAGE_SUCCESS,
    FETCHING_CHATMESSAGE_FAILURE,
  } from './../constants/constants';
  import {SERVER} from './../config/Endpoint.js';
  import axios from 'axios';
  
  import { getToken, saveData } from "./users";
  
  function createChatmessagePromise(chatroomData, token) {
    console.log(chatroomData);
    return axios({
      method: 'post',
      url: `${SERVER}/roomMessage`,
      data: JSON.stringify(chatroomData),
      headers: {
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json',
      },
    })
      .then(data => {
        return data;
      })
      .catch(error => {
        return error.response;
      });
  }
  
  function fetchChatmessagesPromise(orderData = {page: 1, limit: 10, filter: 'none'}, token) {
    const objectToUrl = Object.entries(orderData).map(([key, value]) => encodeURIComponent(key) + '=' + encodeURIComponent(value)).join('&');
    console.log(objectToUrl);
    return axios({
      method: 'get',
      url: `${SERVER}/roomMessage?${objectToUrl}`,
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
  
  
  export const createChatmessage = chatroomData => dispatch => {
    dispatch({ type: CREATING_CHATMESSAGE_REQUEST })
    getToken().then(token => {
    return createChatmessagePromise(chatroomData, token)
      .then(resp => {
        dispatch({
          type: CREATING_CHATMESSAGE_SUCCESS,
          data: resp});
          saveData('CREATED_MESSAGES', resp.data.data);
      })
      .catch(resp =>
        dispatch({
          type: CREATING_CHATMESSAGE_FAILURE,
          data: resp
        }),
      );
    }).catch(resp => {
    });
  };
  
  export const fetchChatmessages = orderData => dispatch => {
    dispatch({type: FETCHING_CHATMESSAGE_REQUEST});
    getToken().then(token => {
        return fetchChatmessagesPromise(orderData, token)
          .then(resp => {
            dispatch({
              type: FETCHING_CHATMESSAGE_SUCCESS,
              data: resp
            });
            saveData('FETCHED_CHATROOMS', resp.data.data);
          }
          )
          .catch(resp =>
            dispatch({
              type: FETCHING_CHATMESSAGE_FAILURE,
              data: resp
            })
          );
      })
      .catch(resp => {
          // failure
        });
  };