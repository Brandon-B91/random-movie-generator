import React from 'react'
import { Link } from 'react-router-dom'
import {FaHeart, FaHome, FaTv} from 'react-icons/fa'
import {GiVhs} from 'react-icons/gi'

const Nav = () => {
    return (
        <div className="navbar">
            <Link to="/" className="link"><FaHome className="icon"/> Home</Link>
            <Link to="/Movies" className="link"><GiVhs className="icon" /> Movies</Link>
            <Link to="/TvShows" className="link"><FaTv className="icon" /> Tv Shows</Link>
            <Link to="/Favorites" className="link"><FaHeart className="icon" /> Favorites</Link>
        </div>
    )
}

export default Nav
