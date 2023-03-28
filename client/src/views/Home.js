import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import sign from '../images/sign.jpeg'
import farm from '../images/farm-aerial.jpg'
import scooby from '../images/scooby2.jpeg'
import barn from '../images/barn.jpeg'
import goat from '../images/christmasGoat.jpeg'
import './Home.css'

import { Navigation, Pagination } from "swiper";
const Home = () => {
    const navigate = useNavigate()


        return(
        <div>
        <div className='container'>
            <div className='hero'>
                <Swiper
                    spaceBetween={30}

                    navigation={true}
                    pagination={{
                        clickable: true,
                    }}
                    loop
                    modules={[Navigation, Pagination]}
                    className="mySwiper"
                >
                    <SwiperSlide className='img-box'>
                        <img src={sign} alt='sign' />
                    </SwiperSlide>
                    <SwiperSlide className='img-box'>
                        <img src={barn} alt='barn'/>
                    </SwiperSlide>
                    <SwiperSlide className='img-box'>
                        <img src={farm}  alt='aerial farm'/>
                    </SwiperSlide>
                    <SwiperSlide className='img-box'>
                        <img src={scooby} alt='scooby the horse'/>
                    </SwiperSlide>
                </Swiper>
                <div className='even-columns hero-text'>
                    <div>
                        <h2>Welcome to Harvest Thyme Farm</h2>
                        <p>Harvest Thyme is a family owned farm located in the scenic Bekgrade lakes region of Maine. Built in 1860, Harvest Thyme has been a staple of the area for over 150 years. Now the Knudesen-Blackburn family is reinvigorating life on the farm again.</p>
                        <p>Harvest Thyme offers a wide variety of fruits and vegetables in season and eggs and other delicious home goods year round. Visit us during the holidays for Christmas Trees, wreaths and a hot cup of cocoa. Our family, goats and mini-horse, Scooby Doo, are looking forward to seeing you!</p>
                    </div>
                    <div className='hero-text-right'>
                        <img className='text-img' src={goat} alt="cute goat" />
                        <button className='register-btn' onClick={()=>navigate('/register')}>Join our Community</button>
                    </div>
                </div>
            </div>
        </div>
        </div >
    );
}

export default Home;
