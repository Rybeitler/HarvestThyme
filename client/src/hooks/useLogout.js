import axios from 'axios'
import useAuth from './useAuth';
import { cartContext } from '../context/CartContext';
import { useContext } from 'react'; 

const useLogout = () =>{
    const {setAuth} = useAuth()
    const {clearCart} = useContext(cartContext)

    const logout = async ()=>{
        setAuth({})
        try{
            const res = await axios.get('http://localhost:8000/api/logout',{withCredentials:true})
            clearCart()
            // localStorage.removeItem('shopping-cart')
        }
        catch(err){
            console.log(err)
        }
    }
    return logout;
}

export default useLogout;