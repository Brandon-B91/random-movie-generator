import React from 'react'
import { NavLink } from 'react-router-dom'
import {FaHeart, FaRegHeart, FaHome, FaTv} from 'react-icons/fa'
import {GiVhs} from 'react-icons/gi'

const Nav = () => {
const keys = Object.keys(localStorage)

    return (
        <div className="navbar">
            <NavLink to="/" className="link" activeClassName="active"><FaHome className="icon" /> Home</NavLink>
            <NavLink to="/Movies" className="link" activeClassName="active"><GiVhs className="icon" /> Movies</NavLink>
            <NavLink to="/TvShows" className="link" activeClassName="active"><FaTv className="icon" /> Tv Shows</NavLink>
            <NavLink to="/Favorites" className="link" activeClassName="active">{localStorage.getItem(keys) == null && localStorage.getItem(keys) == null ? <FaRegHeart className='icon' /> : <FaHeart className='icon' /> } Favorites </NavLink>
        </div>
    )
}

export default Nav
