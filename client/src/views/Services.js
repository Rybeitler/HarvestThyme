import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './Service.css'
import ServiceCard from '../components/ServiceCard';

const Services = () => {
    const [services, setServices] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/api/allServices')
            .then(res => {
                setServices(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const removeService = (id)=>{
        axios.delete(`http://localhost:8000/api/deleteService/${id}`, {withCredentials: true})
            .then(res=>{
                setServices(services.filter(s=>s._id!==id))
            })
            .catch(err=>console.log(err))
    }
    return (
        <div>
            <div className="container">
                <div className='service-wrapper'>
                    {
                        services.map((service) => (
                            <div key={service._id}>
                                <ServiceCard service={service} removeService={removeService}/>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Services;
