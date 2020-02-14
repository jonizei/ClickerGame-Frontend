import React, { Component } from 'react';
import axios from 'axios';

class Game extends Component {

    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = event => {
        event.preventDefault();
    }

    render() {
        return(
            <div className="Game">
                <button>Click</button>
            </div>
        );
    }

}

export default Game;