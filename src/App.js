import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import "./index.css";
import logo from "./logo.png";

//import pages
import HomePage from "./pages/home/HomePage";
import ChatPage from "./pages/chat/ChatPage";

class App extends Component {
  render() {
    return (
      <Router>
      <div>
        <Switch>
           {/*<Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route> */}
          <Route path="/chat">
            <ChatPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
    );
  }
}

export default App;
