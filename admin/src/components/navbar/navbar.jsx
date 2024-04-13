import React from 'react';
import "./navbar.css";
import navLogo from '../../assets/nav-logo.svg';
import navProfile from "../../assets/nav-profile.svg";

const Navbar = () => {
    return (
        <div className="navbar">
        <img src={navLogo} alt="" className="nav-logo" />
        <img src={navProfile} alt="" />
        </div>
    );
};

export default Navbar;