import React, { Component } from 'react';
import './App.css';
import Login from './Login';
import Game from './Game';
import axios from 'axios';

class App extends Component {

    playerInfo = {
      id: -1,
      username: '',
      points: 0
    }

    constructor() {
      super();

      this.handleLogin = this.handleLogin.bind(this);
      this.handleLogout = this.handleLogout.bind(this);
      
      this.state = {
        loggedIn: false
      }

    }

    componentDidMount() {

      const jwt = sessionStorage.getItem('accessToken');

      if(jwt) {
        this.setState({loggedIn: true});
      }

    }

    handleLogin(user, pass) {
      console.log("Username: " + user + " Password: " + pass);
      axios.post("http://localhost:8080/login", {
        username: user,
        password: pass
      }).then(res => {
        sessionStorage.setItem('accessToken', res.headers.authorization);
        this.playerInfo = res.data;
        this.setState({loggedIn: true});
      }).catch(error => {console.log(error)});
    }

    handleLogout() {
      this.setState({loggedIn: false}, () => {
        sessionStorage.removeItem('accessToken');
      });
    }

    render() {

      if(!this.state.loggedIn) {
        return(
          <Login onLogin={this.handleLogin} />
        );
      }

      return(
        <Game onLogout={this.handleLogout} />
      );
    }

}

export default App;
