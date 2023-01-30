import React from "react";
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <div className="navbar-container">
            <h1 className="navbar-title">Catco</h1>
            <nav className="navbar-items">
                <Link to="/">Products</Link>
                <Link to="/Login">Login</Link>
                <Link to="/Register">Register</Link>
                <Link to="/Cart">Cart</Link>
            </nav>
        </div >
    );
}


export default Navbar;