import React, { useState} from 'react';
import ProductForm from '../components/ProductForm';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const AddProduct = (props) => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: 0,
        category: 'Other',
    })
    const [preview, setPreview] = useState('')
    const [errors, setErrors] = useState({})
    const [file, setFile] = useState()
    const navigate = useNavigate()


    const validate = () =>{
        let isError = false
        setErrors({})
        if (product.name.length<1){
            setErrors((prev)=>({...prev, name:'Please provide a product name'}))
            isError = true
        }
        if (product.description.length<1){
            setErrors(prev=>({...prev, description:'Please provide a short description'}))
            isError = true
        }
        if (product.price === 0){
            setErrors(prev=>({...prev, price:'Please provide a product price'}))
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
            data.append('name', product.name)
            data.append('description', product.description)
            data.append('price', product.price)
            data.append('category', product.category)
            data.append('file', file)
            axios.post('http://localhost:8000/api/addProduct', data)
                .then(res => {
                    navigate('/shop')
                })
                .catch(err => {
                    setErrors(err.response.data.error.errors)
                })
        }
    }
    
    return (
        <div className='container'>
            <ProductForm
                product={product} setProduct={setProduct}
                preview={preview} setPreview={setPreview}
                setFile={setFile}
                submitHandler={submitHandler}
                errors={errors}
            />
        </div>
    );
}

export default AddProduct;
