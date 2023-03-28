import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'
import useAuth from '../hooks/useAuth';
import './LoginReg.css'
import goat from "../images/christmasGoat.jpeg"
import goat2 from "../images/goat2.jpg"

const Login = (props) => {
    const {setAuth} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/shop';
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({});

    const onChangeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }
    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/login', user, { withCredentials: true })
            .then((res) => {
                const accessToken = res?.data?.accessToken;
                setAuth({user:res.data.user, accessToken});
                navigate(from, {replace:true});
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data)
            })
    }
    return (
        <div className='container'>
            <div className='login'>
                <img className="form-buddy" src={goat} alt="goat" />
                <div className='form-box'>
                    <form onSubmit={submitHandler} className='login-form'>
                        <h2 className="text-light text-center">Login</h2>
                        <label className='form-label'>Email:</label>
                        <input type="text" name="email" className='form-control' onChange={onChangeHandler} value={user.email} />

                        <label className='form-label'>Password:</label>
                        <input type="password" name="password" className='form-control' onChange={onChangeHandler} value={user.password} />
                        {
                            errors?<p className='errors'>{errors.message}</p>:null
                        }
                        <button className='logReg-btn'>Login</button>
                        <br />
                        <p className='text-light text-center'>Dont have an account? <Link className='text-white' to={'/register'}>Sign up here</Link></p>
                    </form>
                </div>
                <img className="form-buddy" src={goat2} alt="more goat" />
            </div>
        </div>
    );
}

export default Login;
