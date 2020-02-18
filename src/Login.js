import React, { Component } from 'react';
import './Login.css';

class Login extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            username: '',
            password: ''
        }

    }

    handleChange = event => {
        event.preventDefault();

        if(event.target.name === 'username') {
            this.setState({username: event.target.value});
        }
        else if(event.target.name === 'password') {
            this.setState({password: event.target.value});
        }
    }

    handleClick = event => {
        event.preventDefault();

        this.props.onLogin(this.state.username, this.state.password);
    }

    render() {
        return(
            <div className="container">
                <div className="row justify-content-center">
                    <div className="login-container col-xs-12 col-sm-10 col-md-5 w-100 p-5">
                        <div className="login-controls w-75">
                            <h1 className="pb-2">Login</h1>
                            <p><input className="login-component w-100 p-2" type="text" name="username" placeholder="Username" onChange={this.handleChange} /></p>
                            <p><input className="login-component w-100 p-2" type="password" name="password" placeholder="Password" onChange={this.handleChange} /></p>
                            <p><button className="login-component login-btn w-100 p-2" onClick={this.handleClick}>Login</button></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Login;