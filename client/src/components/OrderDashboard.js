import React, {useEffect, useState} from 'react';
import OrderCard from './OrderCard';
import axios from 'axios'
import './OrderDashboard.css'
const OrderDashboard = () => {
    const [orders, setOrders] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [active, setActive] = useState('All')
    const [filteredOrders, setFilteredOrders] = useState(orders)
    
    const fixOrders = () =>{
        if(active==='all'){
            setFilteredOrders(orders)
        }else{
            setFilteredOrders(orders.filter(o=>o.state===active))
        }
    }

    const updateOrderState = (id, state)=>{
        axios.put(`http://localhost:8000/api/updateOrderState/${id}`, state)
            .then(res=>{
                setOrders(orders.map((order)=>{
                    return order._id == res.data._id? res.data : order;
                }), fixOrders())

            })
            .catch(err=>console.log(err))
    }

    useEffect(()=>{
        axios.get('http://localhost:8000/api/allOrders')
            .then(res=>{
                
                setOrders(res.data)
                setLoaded(true)
            })
            .catch(err=>console.log(err))
    },[])


    const deleteOrder = (id) =>{
        axios.delete(`http://localhost:8000/api/deleteOrder/${id}`, {withCredentials:true})
            .then(res=>{
                setOrders(orders.filter(o=> o._id !==id))
            })
            .catch(err=>console.log(err))
    }

    useEffect(()=>{
        switch(active){
            case 'All':
                setFilteredOrders((orders))
                break;
            case 'placed':
                setFilteredOrders(orders.filter(o=>o.state==='placed'))
                break;
            case 'ready':
                setFilteredOrders(orders.filter(o=>o.state==='ready'))
                break;
            case 'completed':
                setFilteredOrders(orders.filter(o=>o.state==='completed'))
                break;
            default:
                break;
        }
    },[active, orders])
    return (
        <div className='container'>
            <div className="orderStatus">
            <button onClick={()=>setActive('All')} style={active==='All'?{backgroundColor:'hsl(24, 31%, 52%)'}:null}>All</button>
            <button onClick={()=>setActive('placed')} style={active==='placed'?{backgroundColor:'hsl(24, 31%, 52%)'}:null}>Placed</button>
            <button onClick={()=>setActive('ready')} style={active==='ready'?{backgroundColor:'hsl(24, 31%, 52%)'}:null}>Ready</button>
            <button onClick={()=>setActive('completed')} style={active==='completed'?{backgroundColor:'hsl(24, 31%, 52%)'}:null}>Completed</button>
            </div>
            {loaded &&
                filteredOrders.map(order=>(
                    <div key={order._id}>
                        <OrderCard  order={order} deleteOrder={deleteOrder} updateOrderState={updateOrderState}/>
                    </div>
                ))
            }
        </div>
    );
}

export default OrderDashboard;
