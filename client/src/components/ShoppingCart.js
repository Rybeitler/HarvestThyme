import React, {useContext, useState, useEffect}from 'react';
import {Offcanvas, Stack} from 'react-bootstrap'
import { cartContext } from '../context/CartContext';
import { formatCurrency } from '../utilities/formatCurrency';
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem';
import axios from 'axios'
import useAuth from '../hooks/useAuth';
import logo from '../images/logo.jpeg'
const ShoppingCart = () => {
    const {closeCart, isOpen, cart, clearCart} = useContext(cartContext)
    const [products, setProducts] = useState({})
    const [loaded, setLoaded] = useState(false)
    const navigate = useNavigate()
    const {auth} = useAuth()
    const [order, setOrder] = useState({
        items:[],
        total:0,
        pickUp: ''
    })
    const today = new Date().toISOString().split('T')[0]
    const [date, setDate] = useState(today) 

    useEffect(() => {
        axios.get('http://localhost:8000/api/allProducts')
            .then(res => {
                setProducts(res.data)
                setLoaded(true)
            })
            .catch(err => console.log(err))
    }, [])

    const checkout = (e)=>{
        e.preventDefault()
        order.items = cart
        order.pickUp = date
        order.total = cart.reduce((total, cartItem)=>{
            const item = products.find(i=> i._id===cartItem.id)
            return total + (item?.price || 0) * cartItem.quantity
        },0)
        axios.post('http://localhost:8000/api/createOrder', order, {withCredentials:true})
            .then(res=>{
                clearCart()
                navigate('/userOrders')
                closeCart()
            })
            .catch(err=>console.log(err))
    }
    
    return (
        <div>
            { loaded &&
            <Offcanvas show={isOpen} onHide={closeCart} placement='end' style={{backgroundColor:'rgb(243,240,232'}}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{auth?.user?.firstName}'s Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className='d-flex flex-column'>
                    <Stack gap={3}>
                        {cart.map(item=>(
                            <CartItem key={item.id} item={item} />
                        ))}
                        <div className='ms-auto fw-bold fs-5'>
                            Total: {formatCurrency(cart.reduce((total, cartItem)=>{
                                const item = products.find(i=> i._id===cartItem.id)
                                return total + (item?.price || 0) * cartItem.quantity
                            },0))}
                        </div>
                        <form onSubmit={checkout} className='d-flex flex-column'>
                            <div>
                                <label className='form-label text-dark fs-4'>Pick-up on? </label>
                                <input type="date" className='form-control' value={date} name='pickup-date' onChange={(e)=>setDate(e.target.value)} />
                            </div>
                            <button className='checkout m-3 rounded'>Checkout</button>
                        </form>
                    </Stack>
                    <div>
                            <img className='align-baseline'src={logo} alt="logo" />
                    </div>
                </Offcanvas.Body>
                
            </Offcanvas>
            }
        </div>
    );
}

export default ShoppingCart;
