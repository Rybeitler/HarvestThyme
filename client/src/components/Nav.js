import React, {useState} from 'react';
import './NavStyles.css'
import { Link } from 'react-router-dom'
import iconClose from '../images/icon-close.svg'
import iconHamburger from '../images/icon-hamburger.svg'
import logo from '../images/logo.jpeg'

import 'swiper/css';
const Nav = () => {
    const [toggle, setToggle] = useState(false)

    const icon = toggle?iconClose:iconHamburger
    return (
        <div className={toggle?'primary-heading-show':'primary-heading'}>
            <div >
                <div className='nav-wrapper'>
                    <Link to={'/'}><img className='nav-logo' src={logo} alt='logo'/></Link>
                    <button className="mobile-nav-toggle" aria-controls="primary-navigation" aria-expanded="false" onClick={()=>setToggle(!toggle)}>
                        <img className='icon-hamburger' src={icon} alt='' aria-hidden='false' />
                        {/* <img className='icon-close' src={iconClose} alt='' aria-hidden='false' /> */}
                    </button>
                    <nav className={toggle?"primary-navigation-show":'primary-navigation'} id="primary-navigation">
                        <ul aria-label="primary" role='list' className="nav-list" >
                            <li><Link to={'/'}>Home</Link></li>
                            <li><Link to={'/shop'}>Shop</Link></li>
                            <li><Link to={'/services'}>Services</Link></li>
                            <li><Link to={'/contact'}>Contact Us</Link></li>
                        </ul>
                    </nav>
                    <button className="invis"></button>
                </div>
            </div>
        </div>
    );
}

export default Nav;
