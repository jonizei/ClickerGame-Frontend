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
                <div className="row justify-content-center p-2">

                    <div className="col-xs-12 col-sm-12 col-md-2 pb-3">
                        <button className="logout-btn w-100" onClick={this.props.onLogout}>Logout</button>
                    </div>

                    <div className="game-container form-container col-xs-12 col-sm-12 col-md-8 p-5 mw-100 mh-100">
                        <div className="w-100 h-50 d-inline-block">
                            <button className="game-btn" onClick={this.handleClick}>Click</button>
                        </div>

                        <div className="w-100 h-50 d-inline-block pt-5 pb-5">
                            <span className="game-output w-100">Points: {this.state.playerDetails.points}</span><br />
                            <span className="game-output w-100 text-justify">{this.state.message}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Game;