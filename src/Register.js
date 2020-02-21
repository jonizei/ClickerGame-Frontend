import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {

    constructor() {
        super();

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            username: '',
            password: '',
            confirmPassword: ''
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
        else if(event.target.name === 'confirm-password') {
            this.setState({confirmPassword: event.target.value});
        }
    }

    handleClick = event => {
        event.preventDefault();

        if(this.state.password === this.state.confirmPassword) {

            axios({
                method: "post",
                url: "http://localhost:8080/api/user/register",
                data : {
                    username: this.state.username,
                    password: this.state.password
                }
            }).then(res => {
                alert("Server: " + res.data);
            });
        } 
        else {
            alert("Passwords doesn't match");
        }
    }

    render() {

        return(
            <div className="form-container col-xs-12 col-sm-12 col-md-5 w-100 p-5">
                <div className="form-controls w-75">
                    <h1 className="pb-2">Register</h1>
                    <p><input className="form-component w-100 p-2" type="text" name="username" placeholder="Username" onChange={this.handleChange} /></p>
                    <p><input className="form-component w-100 p-2" type="password" name="password" placeholder="Password" onChange={this.handleChange} /></p>
                    <p><input className="form-component w-100 p-2" type="password" name="confirm-password" placeholder="Confirm password" onChange={this.handleChange} /></p>
                    <p><button className="form-component form-btn w-100 p-2" onClick={this.handleClick}>Register</button></p>
                </div>
            </div>
        );

    }

}

export default Register;