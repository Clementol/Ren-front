import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";
import { MenuItems } from "./MenuItems";
import logo from '../../static/images/logo.jpg'
import './Navbar.css'


function Navbar() {
  const [clicked, setClicked] = useState(false);
  const [overlay, setOverlay] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
    setOverlay(!overlay);
  };

  return (
    <nav id="navbar" className="NavbarItems">
      <Link to="/" className="navbar-logo">
        <img width="40px" height="40px" src={logo} alt="" />
      </Link>
      <div onClick={handleClick} className="menu-icon">
        {clicked ? <IoCloseSharp /> : <HiMenuAlt3 />}
      </div>
      <div onClick={handleClick} className={overlay ? "overlay" : ""}></div>
      <ul className={clicked ? "nav-menu active" : "nav-menu"}>
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              <NavLink activeClassName="active" to={`/${item.url}`} className={item.cName} >{item.title}</NavLink>
              
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Navbar;
