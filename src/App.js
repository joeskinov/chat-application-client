import React, { Component } from "react";
/* import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"; */
import { Route, Switch } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./index.css";
import logo from "./logo.png";

//import pages
import HomePage from "./pages/home/HomePage";
import ChatPage from "./pages/chat/ChatPage";

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/chat" component={ChatPage} />
          <Route exact path="/" component={HomePage} />
        </Switch>
        <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              />
              {/* Same as */}
        <ToastContainer />
      </div>
    );
  }
}

export default App;
