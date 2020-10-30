import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import store, { history } from './store/store';
import { ConnectedRouter } from 'connected-react-router';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./index.css";
import App from "./App";

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render( 
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();