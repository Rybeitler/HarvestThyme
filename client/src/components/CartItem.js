import React, {useContext, useEffect, useState} from 'react';
import { Button, Stack } from 'react-bootstrap';
import { cartContext } from '../context/CartContext';
import axios from 'axios'
import { formatCurrency } from '../utilities/formatCurrency';
const CartItem = (props) => {
    const {item} = props
    const {removeFromCart} = useContext(cartContext)
    const [product, setProduct] = useState({})

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/oneProduct/${item.id}`)
            .then(res=>{
                setProduct(res.data)
            })
            .catch(err=>console.log(err))
    },[])
    return (
        <div>
            <Stack direction='horizontal' gap={2}>
                <img style={{height:'75px', width:'125px', objectFit:'cover'}} src={product.image} alt="product" />
                <div className='me-auto'>
                    <div>
                        {product.name}{item.quantity >1&& <span className='text-muted' style={{fontSize:'.65rem'}}>x{item.quantity}</span>}
                    </div>
                    <div className='text-muted' style={{fontSize: '.75rem'}}>
                        {formatCurrency(product.price)}
                    </div>
                </div>
                <div>
                    {formatCurrency(product.price * item.quantity)}
                </div>
                <Button variant='outline-danger' size='sm' onClick={()=>removeFromCart(item.id)}>&times;</Button>
            </Stack>
        </div>
    );
}

export default CartItem;
