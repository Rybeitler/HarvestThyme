import React from 'react';
import { Link } from 'react-router-dom'
import facebook from '../images/iconmonstr-facebook-3 (1).svg'
import twitter from '../images/iconmonstr-twitter-3.svg'
import instagram from '../images/iconmonstr-instagram-3.svg'
import pinterest from '../images/iconmonstr-pinterest-3.svg'
import logo from '../images/logo.jpeg'
import './Footer.css'
const Footer = () => {
    return (
        <div className='container footer'>
            <div className='even-columns-footer'>
                <div className='logo-div'>
                    <img className='logo' src={logo} alt="logo" />

                </div>
                <div aria-label='social links'>
                    <ul className='social-links-list'>
                        <li><Link className='footer-link' aria-label='facebook' to={'#'}><img src={facebook} alt='facebook'/>Facebook</Link></li>
                        <li><Link className='footer-link' aria-label='twitter' to={'#'}><img src={twitter} alt='twitter'/>Twitter</Link></li>
                        <li><Link className='footer-link' aria-label='instagram' to={'#'}><img src={instagram} alt='instagram'/>Instagram</Link></li>
                        <li><Link className='footer-link' aria-label='pintrest' to={'#'}><img src={pinterest} alt='pintrest'/>Pinterest</Link></li>
                    </ul>
                </div>
                <div>
                    <ul  aria-label='footer'>
                        <li><Link className='footer-link' to={'/'}>Home</Link></li>
                        <li><Link className='footer-link' to={'/shop'}>Shop</Link></li>
                        <li><Link className='footer-link' to={'/services'}>Services</Link></li>
                        <li><Link className='footer-link' to={'/contact'}>Contact Us</Link></li>
                        <li><Link className='footer-link' to={'/register'}>Join Our Community</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Footer;
