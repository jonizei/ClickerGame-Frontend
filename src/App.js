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
  Route
} from 'react-router-dom'
import Register from './Register';

class App extends Component {

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

    componentDidMount() {

      const jwt = sessionStorage.getItem('accessToken');

      if(jwt) {
        this.loadPlayerDetails();
        this.setState({loggedIn: true});
      }

    }

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

    loadPlayerDetails() {
      const jwt = sessionStorage.getItem('accessToken');

      axios({
        method: "post",
        url: "http://localhost:8080/api/user/details",
        headers: {
          Authorization: jwt
        }
      }).then(userRes => {
        this.setState({playerDetails: userRes.data, isLoadingDetails: false});
      });
    }

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
                  </Switch>
                </Router>
  
              </div>
            </div>
          </div>
        );

      }

      if(!this.state.isLoadingDetails) {
        return(
          <div className="d-flex align-items-center min-vh-100">
            <Game playerDetails={this.state.playerDetails} onLogout={this.handleLogout} />
          </div>
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
