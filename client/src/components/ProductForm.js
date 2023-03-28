import React from 'react';
import './Form.css'
import { useLocation } from 'react-router-dom';

const ProductForm = (props) => {
    const {product, setProduct, preview, setPreview, submitHandler, errors, setFile} = props

    const location = useLocation()
    
    let btnTxt = location.pathname.split('/')[2]

    const capitalize = (str)=>{
        return str.charAt(0).toUpperCase() + str.slice(1) 
    }

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            setPreview(URL.createObjectURL(e.target.files[0]))
            setFile(e.target.files[0])
        } else {
            setProduct({ ...product, [e.target.name]: e.target.value })
        }
    }

    return (
        <div>
            <div className="form-wrapper even-columns">
                <div className='img-wrapper'>
                    {
                        errors?.image ? <p className='errors'>{errors.image}</p> : null
                    }
                    {
                        preview && <img className='img-prev' src={preview} alt='img preview' />
                    }
                </div>
                <div className='form-style'>
                    <h2>Create a new Product</h2>
                    <form onSubmit={submitHandler}>
                        <div >
                            <label className='form-label'>Name: </label>
                            <input className='form-control' type="text" name='name' value={product.name} onChange={handleChange} />
                            {
                                errors?.name ? <p className='errors'>{errors.name}</p> : null
                            }
                        </div>
                        <div>
                            <label className='form-label'>Description: </label>
                            <textarea className='form-control' name="description" cols="30" rows="3" value={product.description} onChange={handleChange}></textarea>
                            {
                                errors?.description ? <p className='errors'>{errors.description}</p> : null
                            }
                        </div>
                        <div>
                            <label className='form-label'>Category: </label>
                            <select className='form-control' name="category" onChange={handleChange} value={product.category}>
                                <option value="Flower">Flower</option>
                                <option value="Fruit">Fruit</option>
                                <option value="Vegetable">Vegetable</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className='form-label'>Price:</label>
                            <input className='form-control' type="number" step='.01' name='price' value={product.price} onChange={handleChange} />
                            {
                                errors?.price ? <p className='errors'>{errors.price}</p> : null
                            }
                        </div>
                        <div >
                            <label className='form-label'>Image: </label>
                            <input className='form-control' type='file' name='image' onChange={handleChange} />
                        </div>

                        <button className='sub-btn'>{capitalize(btnTxt)} Product</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ProductForm;
