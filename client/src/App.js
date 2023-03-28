import React from 'react'
import './App.css';
import {Route, Routes} from 'react-router-dom'
import Home from './views/Home';
import Shop from './views/Shop';
import Services from './views/Services';
import Contact from './views/Contact';
import Login from './components/Login';
import Register from './components/Register';
import Unauthorized from './components/Unauthorized'
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import Layout from './components/Layout';
import OrderDashboard from './components/OrderDashboard';
import UserOrders from './components/UserOrders';
import EditProduct from './views/EditProduct';
import AddProduct from './views/AddProduct';
import AddSevice from './views/AddSevice';
import EditService from './views/EditService';


function App() {
  return (
      <Routes>
        <Route element={<PersistLogin/>}>
        <Route path='/' element={<Layout/>}>
          <Route path={'/'} element={<Home/>}/>
          <Route path={'login'} element={<Login/>}/>
          <Route path={'register'} element={<Register/>}/>
          <Route path={'shop'} element={<Shop/>}/>
          <Route path={'services'} element={<Services/>}/>
          <Route path={'contact'} element={<Contact/>}/>
          <Route path={'unauthorized'} element={<Unauthorized/>}/>

          <Route element={<RequireAuth allowedRoles={'user'}/>}>
            <Route path={'userOrders'} element={<UserOrders/>}/>
          </Route>


          <Route element={<RequireAuth allowedRoles={'employee'}/>}>
            <Route path={'shop/add'} element={<AddProduct/>}/>
            <Route path={'shop/edit/:id'} element={<EditProduct/>}/>
            <Route path={'services/add'} element={<AddSevice/>}/>
            <Route path={'services/edit/:id'} element={<EditService/>}/>
            <Route path={'orders'} element={<OrderDashboard/>}/>
          </Route>
        </Route>
        </Route>
      </Routes>
  );
}

export default App;
