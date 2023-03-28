import React, {useEffect, useState} from 'react';
import OrderCard from './OrderCard';
import axios from 'axios'

const UserOrders = () => {
    const [orders, setOrders] = useState([])
    const [loaded, setLoaded] = useState(false)

    useEffect(()=>{
        axios.get('http://localhost:8000/api/userOrders', {withCredentials:true})
            .then(res=>{
                setOrders(res.data)
                setLoaded(true)
            })
            .catch(err=>console.log(err))
    },[])

    const deleteOrder = (id) =>{
        axios.delete(`http://localhost:8000/api/deleteOrder/${id}`, {withCredentials:true})
            .then(res=>{
                console.log(res)
                setOrders(orders.filter(o=> o._id !==id))
            })
            .catch(err=>console.log(err))
    }

    return (
        <div className='container'>
                        {loaded &&
                orders.map(order=>(
                    <div key={order.id}>
                        <OrderCard  order={order} deleteOrder={deleteOrder}/>
                    </div>
                ))
            }
        </div>
    );
}

export default UserOrders;
