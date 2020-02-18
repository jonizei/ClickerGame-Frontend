import React, { Component } from 'react';
import axios from 'axios';

class Game extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleReward = this.handleReward.bind(this);

        this.state = {
            message: "",
            playerDetails: this.props.playerDetails
        }
    }

    handleClick = event => {
        event.preventDefault();

        if(this.state.playerDetails.points > 0) {
            const jwt = sessionStorage.getItem('accessToken');

            axios({
                method: "post",
                url: "http://localhost:8080/api/click/" + this.state.playerDetails.id,
                headers: {
                    Authorization: jwt
                }
            }).then(res => {
                this.handleReward(res.data);
            }).catch(error => {console.log(error)});    
        }
        else {
            this.setState({message: "Not enough points..."});
        }
    }

    handleReward(reward) {

        let currentPoints = this.state.playerDetails.points + reward - 1;
        let msg = reward > 0 ? "You won " + reward + " points!" : "No reward";

        this.setState({
            message: msg,
            playerDetails : {
                id: this.state.playerDetails.id,
                username: this.state.playerDetails.username,
                points: currentPoints
            }
        });

    }

    render() {
        return(
            <div className="Game">
                <button onClick={this.props.onLogout}>Logout</button>
                <button onClick={this.handleClick}>Click</button>
                <p>{this.state.message}</p>
            </div>
        );
    }

}

export default Game;