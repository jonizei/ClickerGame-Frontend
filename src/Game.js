import React, { Component } from 'react';
import axios from 'axios';

class Game extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = event => {
        event.preventDefault();

        const jwt = sessionStorage.getItem('accessToken');

        axios({
            method: 'post',
            url: "http://localhost:8080/api/click/1",
            headers: {
                Authorization: jwt
            }
        }).then(res => {
            console.log(res);
        }).catch(error => {console.log(error)});

    }

    render() {
        return(
            <div className="Game">
                <button onClick={this.props.onLogout}>Logout</button>
                <button onClick={this.handleClick}>Click</button>
            </div>
        );
    }

}

export default Game;