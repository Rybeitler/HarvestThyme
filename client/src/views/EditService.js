import React, {useEffect, useState} from 'react';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import ServiceForm from '../components/ServiceForm';

const EditService = () => {
    const {id} = useParams()
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

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/oneService/${id}`)
            .then(res=>{
                setService({
                    name:res.data.name,
                    description: res.data.description,
                    email: res.data.email,
                    phone: res.data.phone
                })
                setPreview(res.data.image)
            })
    },[id])

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
        console.log(service.email.length)
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
        console.log(err)
        if(!err){
            if(file){
                const data = new FormData()
                data.append('name', service.name)
                data.append('description', service.description)
                data.append('email', service.email)
                data.append('phone', service.phone)
                data.append('file', file)
                
                axios.put(`http://localhost:8000/api/editService/${id}`, data)
                .then(res => {
                    navigate('/services')
                })
                .catch(err => {
                    console.log(err)
                })
            }else{
                axios.put(`http://localhost:8000/api/editServiceNF/${id}`, service)
                .then(res=>{
                    navigate('/services')
                })
                .catch(err=>{
                    console.log(err)
                })
            }
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

export default EditService;
