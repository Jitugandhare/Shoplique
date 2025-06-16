import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../componentsStyles/NavBar.css'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import CloseIcon from '@mui/icons-material/Close';


const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isAuthenticated = true;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }



  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <a href="/" onClick={() => setIsMenuOpen(false)}>Shoplique</a>
        </div>
        <div className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
          <ul>
            <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/about-us">About Us</Link></li>
            <li><Link to="contact-us">Contact Us</Link></li>
          </ul>
        </div>

        <div className="navbar-icons">
          <div className="search-container">
            <form className="search-form">
              <input type="text" className="search-input"
                placeholder='Search products...'
              />
              <button>
                <SearchIcon />
              </button>
            </form>

          </div>
        </div>


        <div className="cart-container">
          <Link to="/cart">
            < ShoppingCartIcon className='icon' />
          </Link>

        </div>
        {isAuthenticated && <Link to="register" className="register-link">
          <PersonAddIcon className='icon' />
        </Link>}
        <div className="navbar-hamburger" onClick={toggleMenu}>
          {isMenuOpen ? <CloseIcon className='icon' />
            : <MenuOpenIcon className='icon' />}
        </div>
      </div>
    </nav>
  )
}

export default NavBar