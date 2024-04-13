import React, { useContext, useState } from 'react'
import './Navbar.css'
import cart_icon from "../assets/cart_icon.png"
import logo from "../assets/logo.png"
import { Link } from 'react-router-dom'
import { ShopContext } from '../../context/ShopContent'
import { useRef } from 'react'
import dropDownIcon from "../assets/dropdownicon.png"

const Navbar = () => {
    const {getTotalCartItems} = useContext(ShopContext);
    const [menu, setMenu] = useState("shop");
    const menuRef = useRef();
    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle("nav-menu-visible");
        e.target.classList.toggle("open");
    }

    return (
        <div className="navbar">
            <div className="nav-logo">
                <img src={logo} alt="" />
                <p>SHOPPER</p>
            </div>
            <img src={dropDownIcon} className='nav-dropdown' onClick={dropdown_toggle} alt="" />
            <ul ref={menuRef} className='nav-menu'>
                <li onClick={() => { setMenu("shop") }}><Link style={{textDecoration: "none"}} to='/'>Shop</Link>{menu === "shop" ? <hr /> : <></>} </li>
                <li onClick={() => { setMenu("mens") }}><Link style={{textDecoration: "none"}} to='/men'>Men</Link>{menu === "mens" ? <hr /> : <></>} </li>
                <li onClick={() => { setMenu("women") }}><Link style={{textDecoration: "none"}} to='/women'>Women</Link>{menu === "women" ? <hr /> : <></>} </li>
                <li onClick={() => { setMenu("kids") }}><Link style={{textDecoration: "none"}} to='/kids'>Kids</Link>{menu === "kids" ? <hr /> : <></>} </li>
            </ul>
            <div className="nav-login-cart">
                {localStorage.getItem("auth-token") ? <button onClick={() => {localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button> : <Link style={{textDecoration: "none"}} to="/login"><button>Login</button></Link> }
                
                <Link style={{textDecoration: "none"}} to='/cart'><img src={cart_icon} alt="" /></Link>
                <div className="nav-cart-count">
                    {getTotalCartItems()}
                </div>
            </div>
        </div>
    )
}

export default Navbar