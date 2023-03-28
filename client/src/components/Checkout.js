import React, {useContext, useState, useEffect} from 'react';
import { Col, Row } from 'react-bootstrap';
import { cartContext } from '../context/CartContext';
import useAuth from '../hooks/useAuth';
import CartItem from './CartItem';
import ProductCard from './ProductCard';
import { formatCurrency } from '../utilities/formatCurrency';
import axios from 'axios'

const Checkout = () => {
    const {cart, decreaseCartQuantity, increaseCartQuantity} = useContext(cartContext)
    const {auth} = useAuth()
    const [products, setProducts] = useState({})

    useEffect(() => {
        axios.get('http://localhost:8000/api/allProducts')
            .then(res => {
                console.log(res.data)
                setProducts(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className='container bg-light'>
            <h2>{auth?.user?.firstName}'s Order:</h2>
            <Row xs={1} md={2} lg={3} classname='g-3'>
                {
                    cart.map(item=>(
                        <div key={item.id}>
                        <Col>
                            <CartItem  item={item}/>
                            <div className='d-flex'>
                                <p>Adjust Quantity:  </p>
                                <button className='btn btn-primary rounded-circle m-2' onClick={()=>decreaseCartQuantity(item.id)}>-</button>
                                <button className='btn btn-primary rounded-circle m-2'onClick={()=>increaseCartQuantity(item.id)}>+</button>
                            </div>
                        </Col>
                        </div>
                    ))
                }
            </Row>
            <div className='ms-auto fw-bold fs-5'>
                    {/* Total: {formatCurrency(cart.reduce((total, cartItem)=>{
                        const item = products.find(i=> i._id===cartItem.id)
                        return total + (item?.price || 0) * cartItem.quantity
                    },0))} */}
                    </div>
        </div>
    );
}

export default Checkout;
