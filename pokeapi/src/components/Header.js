import React from 'react'
import logo from "../pokeapi_logo.png";

const Header = () => {
    return (
        <div className='header'>
            <img src={logo} className="App-logo" alt="logo" />
        </div>
    )
}

export default Header