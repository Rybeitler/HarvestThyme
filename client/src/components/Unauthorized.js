import React from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
    const navigate = useNavigate()

    const goBack = () => navigate(-1)
    return (
        <div className='container p-4 rounded' style={{backgroundColor:'rgb(243,240,232)'}}>
            <h2>You are not authorized for this page</h2>
            <button className='m-2' style={{borderRadius:'2rem'}}onClick={goBack}>Go Back</button>
        </div>
    );
}

export default Unauthorized;
