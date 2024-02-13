import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div>
      <footer>

        <div class="footer">
          <div class="row">
            <ul>
              <li className='hi'><i class="fa-brands fa-facebook"></i></li>
              <li className='hi'><i class="fa-brands fa-instagram"></i></li>
              <li className='hi'><i class="fa-brands fa-twitter"></i></li>
            </ul>
          </div>

          <div class="row">
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/">About</Link></li>
              <li><Link href="/">Contact us</Link></li>
              <li><Link href="/">Our Services</Link></li>
              <li><Link href="/">Privacy Policy</Link></li>
            </ul>
          </div><br />

          <div >&copy;<span id="year">
          </span><span> Your Company Name. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
