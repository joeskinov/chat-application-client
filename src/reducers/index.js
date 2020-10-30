import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import userSignup from './users/signup.reducer';
import userLogin from './users/login.reducer';
import fetchUsers from './users/fetchUser.reducer';
import fetchChatrooms from './chatrooms/fetchChatrooms.reducer';
import createChatroom from './chatrooms/createChatroom.reducer';
import fetchChatmessage from './chatmessages/fetchChatmessages.reducer';
import createChatmessage from './chatmessages/createChatmessage.reducer';


export default (history) => combineReducers({
    router: connectRouter(history),
    userSignup,
    userLogin,
    fetchUsers,
    fetchChatrooms,
    createChatroom,
    fetchChatmessage,
    createChatmessage,
});