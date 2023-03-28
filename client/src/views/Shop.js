import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './Shop.css'
import ProductCard from '../components/ProductCard';
import { Col, Row } from 'react-bootstrap';




const Shop = () => {
    const [products, setProducts] = useState([])
    const [active, setActive] = useState('All')
    const [filteredProd, setFilteredProd] = useState(products)


    useEffect(() => {
        axios.get('http://localhost:8000/api/allProducts')
            .then(res => {
                setProducts(res.data)
            })
            .catch(err => console.log(err))
    }, [])


    useEffect(()=>{
        switch(active){
            case 'All':
                setFilteredProd((products))
                break;
            case 'Flower':
                setFilteredProd(products.filter(p=>p.category==='Flower'))
                break;
            case 'Fruit':
                setFilteredProd(products.filter(p=>p.category==='Fruit'))
                break;
            case 'Vegetable':
                setFilteredProd(products.filter(p=>p.category==='Vegetable'))
                break;
            case 'Other':
                setFilteredProd(products.filter(p=>p.category==='Other'))
                break;
            default:
                break;
        }
    },[active, products])

    const removeProduct = (id) =>{
        axios.delete(`http://localhost:8000/api/deleteProduct/${id}`, {withCredentials:true})
            .then(res=>{
                console.log(res)
                setProducts(products.filter(p=> p._id !==id))
            })
            .catch(err=>console.log(err))
    } 
    return (
        <div>
            <div className='container'>
                <div className=' category'>
                    <button onClick={()=>setActive('All')} style={active==='All'?{backgroundColor:'rgb(148, 120, 111)'}:null}>All</button>
                    <button onClick={()=>setActive('Flower')} style={active==='Flower'?{backgroundColor:'rgb(148, 120, 111)'}:null}>Flowers</button>
                    <button onClick={()=>setActive('Fruit')} style={active==='Fruit'?{backgroundColor:'rgb(148, 120, 111)'}:null}>Fruits</button>
                    <button onClick={()=>setActive('Vegetable')} style={active==='Vegetable'?{backgroundColor:'rgb(148, 120, 111)'}:null}>Veggies</button>
                    <button onClick={()=>setActive('Other')} style={active==='Other'?{backgroundColor:'rgb(148, 120, 111)'}:null}>Other</button>
                </div>
                <Row xs={1} md={2} lg={3} className='p-2'>
                    {
                        filteredProd.map(product => (
                            <Col key={product._id} className="mb-2">
                                <ProductCard product={product} removeProduct={removeProduct}/>
                            </Col>
                            ))
                    }               
                </Row>
            </div>
        </div>
    );
}

export default Shop;

