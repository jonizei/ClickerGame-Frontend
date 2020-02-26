import React, { Component } from 'react';
import './App.css';
import Login from './Login';
import Game from './Game';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './NavBar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import Register from './Register';

/**
 * This component handles the whole application
 * 
 * @author Joni Koskinen
 * @version 2020-02-26
 */
class App extends Component {

    /**
     * Constructor of App
     */
    constructor() {
      super();

      this.handleLogin = this.handleLogin.bind(this);
      this.handleLogout = this.handleLogout.bind(this);
      this.loadPlayerDetails = this.loadPlayerDetails.bind(this);
      
      this.state = {
        loggedIn: false,
        isLoadingDetails: true,
        playerDetails: {}
      }

    }

    /**
     * If jwt token exists in the session storage then
     * load player details from a server and sets status to "logged in"
     */
    componentDidMount() {

      const jwt = sessionStorage.getItem('accessToken');

      if(jwt) {
        this.loadPlayerDetails();
        this.setState({loggedIn: true});
      }

    }

    /**
     * Sends post request to a server with username and password
     * as data.
     * 
     * If request is a success then it will save jwt token to the 
     * session storage and sets status to "logged in"
     * Then calls loadPlayerDetails() method
     * 
     * @param {string} user 
     * @param {string} pass 
     */
    handleLogin(user, pass) {

      axios.post("http://localhost:8080/login", {
        username: user,
        password: pass
      }).then(res => {
        sessionStorage.setItem('accessToken', res.headers.authorization);
        this.setState({loggedIn: true, isLoadingDetails: true}, this.loadPlayerDetails);
      }).catch(error => {console.log(error)});
    }

    handleLogout() {
      this.setState({loggedIn: false, playerDetails: {}}, () => {
        sessionStorage.removeItem('accessToken');
      });
    }

    /**
     * Sends GET request to a server with jwt token in the header 
     * 
     * If request is a success then it will save playerDetails that server sent to
     * the component state variable.
     * 
     */
    loadPlayerDetails() {
      const jwt = sessionStorage.getItem('accessToken');

      axios({
        method: "get",
        url: "http://localhost:8080/api/user/details",
        headers: {
          Authorization: jwt
        }
      }).then(userRes => {
        this.setState({playerDetails: userRes.data, isLoadingDetails: false});
      });
    }

    /**
     * If user is not logged in it will show login and register pages
     * if user is logged in then it will show game page
     */
    render() {
      
      if(!this.state.loggedIn) {

        return(
          <div className="d-flex align-items-center min-vh-100">
            <div className="container">
              <div className="row">
  
                <Router>
                  <NavBar />
  
                  <Switch>
                    <Route exact path="/">
                      <Login onLogin={this.handleLogin} />
                    </Route>
                    <Route path="/login">
                      <Login onLogin={this.handleLogin} />
                    </Route>
                    <Route path="/register">
                      <Register />
                    </Route>
                    <Route component={() => <Redirect path="/" />} />
                  </Switch>
                </Router>
  
              </div>
            </div>
          </div>
        );

      }

      if(!this.state.isLoadingDetails) {
        return(
          <Router>
            <Switch>
              <Route exact path="/">
                <div className="d-flex align-items-center min-vh-100">
                  <Game playerDetails={this.state.playerDetails} onLogout={this.handleLogout} />
                </div>
              </Route>
              <Route component={() => <Redirect path="/" />} />
            </Switch>
          </Router>
        );
      }
      else {
        return(
          <p>Loading...</p>
        );
      }    
      
    }

}

export default App;
