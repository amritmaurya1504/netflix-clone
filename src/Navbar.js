import React, { useEffect, useState } from 'react'
import './Navbar.css'

const Navbar = () => {
    const [show, handleshow] = useState(false)
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                handleshow(true)
            } else handleshow(false)
        });
        //// return () => {
        ////     window.removeEventListener("Scroll");
        //// }
    })
    return (
        <div className={`nav ${show && "nav_black"}`}>
            <img
                className="nav_logo"
                src="https://www.freepnglogos.com/uploads/netflix-logo-0.png" alt="Netflix Logo" />

            <img
                className="navbar_Avatar"
                src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png" alt="Avatar" />
        </div>
    )
}

export default Navbar
