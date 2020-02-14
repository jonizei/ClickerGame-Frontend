import React, { Component } from 'react';

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
            <div className="Login">
                <input type="text" name="username" placeholder="Username" onChange={this.handleChange} />
                <input type="password" name="password" placeholder="Password" onChange={this.handleChange} />
                <input type="submit" value="Login" onClick={this.handleClick} />
            </div>
        );
    }

}

export default Login;