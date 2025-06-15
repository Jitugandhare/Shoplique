import React from 'react'
import { Phone, Mail, GitHub, LinkedIn, YouTube, Instagram, Facebook } from '@mui/icons-material';
import '../componentsStyles/Footer.css'


const Footer = () => {
  return (
    <footer className='footer'>
      <div className="footer-container">

        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p><Phone fontSize="small" />Phone:+911234567890</p>
          <p><Mail fontSize="small" />Email: 27jitug@gmail.com</p>
        </div>

        <div className="footer-section social">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="" target='_blank'>
              <GitHub className='social-icons' />
            </a>
            <a href="" target='_blank'>
              <LinkedIn className='social-icons' />
            </a>
            <a href="" target='_blank'>
              <YouTube className='social-icons' />
            </a>
            <a href="" target='_blank'>
              <Instagram className='social-icons' />
            </a>
            <a href="" target='_blank'>
              <Facebook className='social-icons' />
            </a>
          </div>
        </div>

        <div className="footer-section about">
          <h3>About Us</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique rem nobis iusto temporibus eius modi officia illo odio! No.</p>
        </div>

        <div className="footer-section bottom">
          <p>&copy: Jitu Gandhare- All rights reserved

          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer