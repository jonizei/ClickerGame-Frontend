import React, { Component } from 'react';
import axios from 'axios';
import './Game.css';

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

        let currentPoints = this.state.playerDetails.points + reward.points;
        let msg = reward.points > 0 ? "You won " + reward.points + " points!" : "No reward";

        if(reward.requiredClicks > 0) msg += " Clicks to next reward: " + reward.requiredClicks;

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
            <div className="container">
                <div className="row">
                    <div className="col-md-2">
                        <button className="logout-btn w-100" onClick={this.props.onLogout}>Logout</button>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="game-container col-xs-12 col-sm-10 col-md-5 pt-5">
                        <button className="game-btn" onClick={this.handleClick}>Click</button>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="game-container col-xs-12 col-sm-10 col-md-8">
                        <p className="game-output w-100 pt-5">Points: {this.state.playerDetails.points}</p>
                        <p className="game-output w-100">{this.state.message}</p>
                    </div>
                </div>
            </div>
        );
    }

}

export default Game;