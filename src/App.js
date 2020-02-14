import React, { Component } from 'react';
import './App.css';
import Login from './Login';
import axios from 'axios';

class App extends Component {

    constructor() {
      super();

      this.handleLogin = this.handleLogin.bind(this);
      this.handleLogout = this.handleLogout.bind(this);
      
      this.state = {
        loggedIn: false
      }

    }

    handleLogin(user, pass) {
      console.log("Username: " + user + " Password: " + pass);
      axios.post("http://localhost:8080/login", {
        username: user,
        password: pass
      }).then(res => {
        sessionStorage.setItem('accessToken', res.headers.authorization);
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
        <div className="App">
          <p>Hello World!</p>
          <button onClick={this.handleLogout}>Log out</button>
        </div>
      );
    }

}

export default App;
