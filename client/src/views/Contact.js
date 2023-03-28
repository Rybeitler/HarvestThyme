import React from 'react';
import {Link} from 'react-router-dom'
import map from '../images/map.png'
import facebook from '../images/iconmonstr-facebook-3 (1).svg'
import twitter from '../images/iconmonstr-twitter-3.svg'
import instagram from '../images/iconmonstr-instagram-3.svg'
import pinterest from '../images/iconmonstr-pinterest-3.svg'
import './contact.css'

const Contact = () => {
    // const location = {
    //     address: '78 Augusta road, Rome, Maine',
    //     lat:44.534821743742874,
    //     lng: -69.88838135672064
    // }
    return (
    <div className='container'>
        <div className='wrapper'>
            <div className='even-columns'>
                <div className='location-txt'>
                    <h2>How to find us:</h2>
                    <p className='fs-4'>We are located at 87 Augusta road, Rome, Maine 04963</p>
                    <p className='fs-4'>Follow route 27 from I-95, pass through beautiful downtown Belgrade, and we will be located shortly after on your left.</p>
                </div>
                <div className='map-wrapper'>
                    <img className="map-img" src={map} alt="map" />
                </div>
            </div>
            <div className='even-columns'>
                <div className='contact-wrapper'>
                    <h3>You can reach out to us with questions at:</h3>
                    <p className='fs-5'>Email: HarvestThyme@gmail.com</p>
                    <p className='fs-5'>Phone: (207)-123-4567</p>
                </div>
                <div className='social-wrapper'>
                    <h3>Or Check Out Our Social Media:</h3>
                        <div className='slinks'>
                            <div className='ms-4'>
                                <p className='socials'><Link className='social-link' aria-label='facebook' to={'#'}><img src={facebook} alt='facebook'/>Facebook</Link></p>
                                <p className='socials'><Link className='social-link' aria-label='twitter' to={'#'}><img src={twitter} alt='twitter'/>Twitter</Link></p>
                            </div>
                            <div className='ms-4'>
                                <p className='socials'><Link className='social-link' aria-label='instagram' to={'#'}><img src={instagram} alt='instagram'/>Instagram</Link></p>
                                <p className='socials'><Link className='social-link' aria-label='pintrest' to={'#'}><img src={pinterest} alt='pintrest'/>Pinterest</Link></p>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Contact;
