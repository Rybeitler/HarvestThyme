import React, {useState, useEffect} from 'react';
import { Card } from 'react-bootstrap';
import axios from 'axios'
import { formatCurrency } from '../utilities/formatCurrency';
import {formatDate} from '../utilities/formatDate'
import useAuth from '../hooks/useAuth';
import './OrderCard.css'

const OrderCard = (props) => {
    const {order, deleteOrder, updateOrderState, key} = props;
    const [products, setProducts] = useState([]);
    const {auth} = useAuth();

    const statusColorObj ={
        placed:'hsl(61, 84%, 46%)',
        ready: 'hsl(129, 36%, 49%)',
        completed: 'hsl(185, 84%, 46%)'
    }


    useEffect(() => {
        axios.get('http://localhost:8000/api/allProducts')
            .then(res => {
                setProducts(res.data)
            })
            .catch(err => console.log(err))
    }, [])


    return (
        <div key={key}>
            <Card className='height-100 me-2 ms-2 mt-1 mb-1'>
                <Card.Header className='d-flex justify-content-between align-items-center order-card-title'>
                    <h2>{order.firstName}'s Order</h2>
                        <p>{order.email}</p>
                </Card.Header>
                <Card.Body className='even-columns order-card'>
                    <div>
                    {
                        order.items.map(item=>{
                            const product = products.find(p=> p._id===item.id)
                            
                            return(
                                <div key={item.id} >
                                    <div className='d-flex align-items-center'>
                                        <p className='fw-bold fs-5 text-dark'>{product?.name || "product no longer available"}:</p>
                                        <p className='fs-5 ms-2 text-dark'>x{item.quantity}</p>
                                    </div>
                                    <p>{formatCurrency(product?.price)}  each</p>
                                </div>
                            )
                        })
                    }
                    </div>
                    <div className='fs-5'>
                        <p><span className='fw-bold'>Pick-Up:</span> {formatDate(order.pickUp)}</p>
                        <p><span className='fw-bold'>Order Total:</span> {formatCurrency(order.total)}</p>
                        <p><span className='fw-bold'>Status:</span> <span className='p-2 border rounded' style={{backgroundColor: statusColorObj[order.state]}}>{order.state}</span></p>
                    </div>
                </Card.Body>
                <Card.Footer className='d-flex justify-content-end order-card-footer'>
                {
                        auth?.user?.role === 'user'
                            ?<button className='btn btn-danger m-2' onClick={()=>deleteOrder(order._id)}>Cancel Order</button>
                            : auth?.user.role === 'employee'
                                ? (order?.state === 'placed'&& <button className='btn btn-success m-2' onClick={()=>updateOrderState(order._id, {state:'ready'})}>Order is Ready</button>)
                                    || (order?.state === 'ready' && <button className='btn btn-info m-2' onClick={()=>updateOrderState(order._id, {state:'completed'})}>Order Picked Up</button>)
                                    || (order?.state === 'completed' && <button className='btn btn-danger m-2' onClick={()=>deleteOrder(order._id)}>Remove Order</button>)
                                :null
            }
                </Card.Footer>
            </Card>
        </div>
    );
}

export default OrderCard;



