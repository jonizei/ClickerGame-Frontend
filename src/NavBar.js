import React, { Component } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';

/**
 * This class is a navigation bar
 * 
 * @author Joni Koskinen
 * @version 2020-02-26
 */
class NavBar extends Component {

    /**
     * Returns navigation bar structure
     */
    render() {
        return(
            <div className="col-sm-12 col-md-3">
                <nav className="navbar navbar-inverse navbar-fixed-left w-100 h-100">
                    <ul className="nav navbar-nav w-100 h-100 pb-3">
                        <li>
                            <Link to={'/login'} className="nav-item w-100 mh-25 p-2">Login</Link>
                        </li>
                        <li>
                            <Link to={'/register'} className="nav-item w-100 mh-25 p-2 mt-3">Register</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }

}

export default NavBar;