import React, {useState} from 'react';
import ServiceForm from '../components/ServiceForm';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const AddSevice = () => {
    const [service, setService] = useState({
        name: '',
        description: '',
        email:'',
        phone:''
    })
    const [file, setFile] = useState()
    const [preview, setPreview] = useState()
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    const validate = () =>{
        let isError = false
        setErrors({})
        if (service.name.length<1){
            setErrors((prev)=>({...prev, name:'Please provide a service name'}))
            isError = true
        }
        if (service.description.length<1){
            setErrors(prev=>({...prev, description:'Please provide a short description'}))
            isError = true
        }
        if (service.email.length<1){
            setErrors(prev=>({...prev, email:'Please provide a valid contact email'}))
            isError = true
        }
        if (service.phone.match(/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/) || service.phone.length<10){
            setErrors(prev=>({...prev, phone:'Please provide a valid contact phone number'}))
            isError = true
        }        
        if (!preview) {
            setErrors(prev=>({...prev, image: 'Please include an image before continuing' }))
            isError = true
        }
        return isError
    }

    const submitHandler = (e) => {
        e.preventDefault()
        const err = validate()

        if(!err){
            const data = new FormData()
            data.append('name', service.name)
            data.append('description', service.description)
            data.append('email', service.email)
            data.append('phone', service.phone)
            data.append('file', file)

            axios.post('http://localhost:8000/api/addService', data)
                .then(res => {
                    navigate('/services')
                })
                .catch(err => {
                    setErrors(err.response.data.error.errors)
                })
        }
    }
    return (
        <div className='container'>
            <ServiceForm
                service={service} setService={setService}
                preview={preview} setPreview={setPreview}
                setFile={setFile}
                submitHandler={submitHandler}
                errors={errors}
            />
        </div>
    );
}

export default AddSevice;
