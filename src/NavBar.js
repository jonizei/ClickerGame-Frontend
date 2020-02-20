import React, { Component } from 'react';
import './NavBar.css';

class NavBar extends Component {

    render() {
        return(
            <div className="col-sm-12 col-md-3 col-lg-3">
                <nav className="navbar navbar-inverse navbar-fixed-left w-100 h-100">
                <ul className="nav navbar-nav w-100 h-100 pb-3">
                    <li className="nav-item w-100 mh-25 p-2">Login</li>
                    <li className="nav-item w-100 mh-25 p-2 mt-3">Register</li>
                </ul>
                </nav>
            </div>
        );
    }

}

export default NavBar;