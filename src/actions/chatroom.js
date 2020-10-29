import {
    CREATING_CHATROOM_REQUEST,
    CREATING_CHATROOM_SUCCESS, 
    CREATING_CHATROOM_FAILURE,
    FETCHING_CHATROOM_REQUEST,
    FETCHING_CHATROOM_SUCCESS,
    FETCHING_CHATROOM_FAILURE,
  } from './../constants/constants';
  import {SERVER} from './../config/Endpoint.js';
  import axios from 'axios';
  
  import { getToken, saveData } from "./users";
  
  function createChatroomPromise(chatroomData, token) {
    console.log(chatroomData);
    return axios({
      method: 'post',
      url: `${SERVER}/chatroom`,
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
  
  function fetchChatroomsPromise(orderData = {page: 1, limit: 10, filter: 'none'}, token) {
    const objectToUrl = Object.entries(orderData).map(([key, value]) => encodeURIComponent(key) + '=' + encodeURIComponent(value)).join('&');
    console.log(objectToUrl);
    return axios({
      method: 'get',
      url: `${SERVER}/chatroom?${objectToUrl}`,
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
  
  
  export const createChatroom = chatroomData => dispatch => {
    dispatch({type: CREATING_CHATROOM_REQUEST});
    getToken().then(token => {
    return createChatroomPromise(chatroomData, token)
      .then(resp => {
        dispatch({
          type: CREATING_CHATROOM_SUCCESS,
          data: resp});
          fetchChatrooms();
          saveData('CREATED_CHATROOM', resp.data.data);
      })
      .catch(resp =>
        dispatch({
          type: CREATING_CHATROOM_FAILURE,
          data: resp
        }),
      );
    }).catch(resp => {
    });
  };
  
  export const fetchChatrooms = orderData => dispatch => {
    dispatch({type: FETCHING_CHATROOM_REQUEST});
    getToken().then(token => {
        return fetchChatroomsPromise(orderData, token)
          .then(resp => {
            dispatch({
              type: FETCHING_CHATROOM_SUCCESS,
              data: resp
            });
            saveData('FETCHED_CHATROOMS', resp.data.data);
          }
          )
          .catch(resp =>
            dispatch({
              type: FETCHING_CHATROOM_FAILURE,
              data: resp
            })
          );
      })
      .catch(resp => {
          // failure
        });
  };