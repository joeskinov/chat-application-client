import { createBrowserHistory } from 'history';
import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

import reducers from './../reducers/index';

export const history = createBrowserHistory();

const store = createStore(reducers(history), {}, compose(  
    applyMiddleware(
    routerMiddleware(history), // for dispatching history actions
    thunk,
)));

export default store;