import React, { Component } from 'react';
import './Login.css';

/**
 * This component handles the user login
 * 
 * @author Joni Koskinen
 * @version 2020-02-26
 */
class Login extends Component {

    /**
     * Constructor of Login
     * 
     * @param {object} props 
     */
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            username: '',
            password: ''
        }

    }

    /**
     * Handles typing to input boxes
     * 
     * Saves the typed text to state values
     */
    handleChange = event => {
        event.preventDefault();

        if(event.target.name === 'username') {
            this.setState({username: event.target.value});
        }
        else if(event.target.name === 'password') {
            this.setState({password: event.target.value});
        }
    }

    /**
     * Calls onLogin function in the properties and
     * passes username and password
     */
    handleClick = event => {
        event.preventDefault();

        this.props.onLogin(this.state.username, this.state.password);
    }

    /**
     * Returns structure of login form
     */
    render() {
        return(
            <div className="form-container col-xs-12 col-sm-12 col-md-5 w-100 p-5">
                <div className="form-controls w-75">
                    <h1 className="pb-2">Login</h1>
                    <p><input className="form-component w-100 p-2" type="text" name="username" placeholder="Username" onChange={this.handleChange} /></p>
                    <p><input className="form-component w-100 p-2" type="password" name="password" placeholder="Password" onChange={this.handleChange} /></p>
                    <p><button className="form-component form-btn w-100 p-2" onClick={this.handleClick}>Login</button></p>
                </div>
            </div>
        );
    }

}

export default Login;