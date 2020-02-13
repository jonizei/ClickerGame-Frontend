import React, { Component } from 'react';
import './App.css';
import Login from './Login';
import axios from 'axios';

class App extends Component {

    constructor() {
      super();

      this.handleLogin = this.handleLogin.bind(this);
      
      this.state = {
        loggedIn: false
      }

    }

    handleLogin(user, pass) {
      axios.post("http://localhost:8080/login", {
        username: user,
        password: pass
      }).then(res => {
        console.log(res);
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
        
        </div>
      );
    }

}

export default App;
