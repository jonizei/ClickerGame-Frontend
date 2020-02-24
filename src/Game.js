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
                url: "http://localhost:8080/api/click/",
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

                    <div className="col-xs-12 col-sm-12 col-md-2 pb-3 w-100 h-100">
                        <button className="logout-btn w-100 mh-25" onClick={this.props.onLogout}>Logout</button>
                    </div>

                    <div className="game-container form-container col-xs-12 col-sm-12 col-md-8 p-5 mw-100 mh-100">
                        <div className="d-sm-flex flex-md-row flex-sm-column">
                            <div>
                                <button className="game-btn" onClick={this.handleClick}>Click</button>
                            </div>

                            <div className="flex-column pt-5 pt-sm-5 p-md-5">
                                <p className="game-output">{this.state.playerDetails.username}</p>
                                <p className="game-output">Points: {this.state.playerDetails.points}</p>
                            </div>
                        </div>
                        <div>
                            <p className="game-output text-justify">{this.state.message}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Game;