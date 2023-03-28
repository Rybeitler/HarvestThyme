import {createContext, useState} from 'react'
import ShoppingCart from '../components/ShoppingCart'
import useAuth from '../hooks/useAuth'
import {useLocalStorage} from '../hooks/useLocalStorage'
import { useNavigate } from 'react-router-dom'

export const cartContext = createContext()


export const CartProvider = (props) =>{
    const [cart, setCart] = useLocalStorage('shopping-cart',[])
    const [isOpen, setIsOpen] = useState(false)
    const {auth} = useAuth();
    const navigate = useNavigate()

    const getItemQuantity = (id)=>{
        return cart.find(item=> item.id=== id)?.quantity || 0
    }

    const increaseCartQuantity= (id)=>{
        if(!auth?.user){
            navigate('/login')
        }else{
            setCart(currItems=>{
                if(currItems.find(item=> item.id===id)==null){
                    return [...currItems, {id, quantity:1}]
                }else{
                    return currItems.map(item => {
                        if(item.id===id){
                            return {...item, quantity: item.quantity + 1}
                        }else{
                            return item
                        }
                    })
                }
            })
        }   
    }

    const decreaseCartQuantity= (id)=>{
        setCart(currItems=>{
            if(currItems.find(item=> item.id===id)?.quantity===1){
                return currItems.filter(item => item.id !== id)
            }else{
                return currItems.map(item => {
                    if(item.id===id){
                        return {...item, quantity: item.quantity - 1}
                    }else{
                        return item
                    }
                })
            }
        })
    }
    
    const removeFromCart = (id)=>{
        setCart(currItems=>{
            return currItems.filter(item => item.id !== id)
        })
    }

    const clearCart = ()=>{
        setCart([])
    }

    const cartQuantity = cart?.reduce(
        (quantity, item) => item.quantity + quantity, 0
    )

    const openCart = ()=> setIsOpen(true)
    const closeCart = ()=> setIsOpen(false)

    return(
        <cartContext.Provider value={{
            getItemQuantity,
            increaseCartQuantity,
            decreaseCartQuantity,
            removeFromCart,
            cartQuantity,
            isOpen,
            openCart,
            closeCart,
            clearCart,
            cart
        }}>
            {props.children}
            <ShoppingCart/>
        </cartContext.Provider>
        
    )
}