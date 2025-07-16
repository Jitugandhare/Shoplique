import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../componentsStyles/NavBar.css'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import CloseIcon from '@mui/icons-material/Close';
import '../pageStyles/Search.css'
import { useSelector } from 'react-redux';


const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate()


  const toggleSearch = () => setIsSearchOpen(!isSearchOpen)

  const { isAuthenticated } = useSelector(state => state.user);
  const { cartItems } = useSelector(state => state.cart);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?keyword=${encodeURIComponent(searchQuery)}`)
    } else {
      navigate(`/products`)
    }
    setSearchQuery("")
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
          {/* search */}
          <div className="search-container">
            <form onSubmit={handleSearchSubmit} className={`search-form ${isSearchOpen ? "active" : ""}`}>
              <input type="text" className="search-input"
                placeholder='Search products...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button onClick={toggleSearch} className='search-icon'
                type='button'
              >
                <SearchIcon />
              </button>
            </form>

          </div>
        </div>


        <div className="cart-container">
          <Link to="/cart">
            < ShoppingCartIcon className='icon' />
            <span className="cart-badge">{cartItems.length} </span>
          </Link>

        </div>
        {!isAuthenticated && (
          <Link to="/register" className="register-link">
            <PersonAddIcon className="icon" />
          </Link>
        )}

        <div className="navbar-hamburger" onClick={toggleMenu}>
          {isMenuOpen ? <CloseIcon className='icon' />
            : <MenuOpenIcon className='icon' />}
        </div>
      </div>
    </nav>
  )
}

export default NavBar