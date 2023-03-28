import React, {useContext}from 'react';
import { cartContext } from '../context/CartContext';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const ProductCard = (props) => {
    const { product, removeProduct } = props
    const {getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,} = useContext(cartContext)
    const quantity = getItemQuantity(product._id);
    const {auth} = useAuth();


    return (
        <div className='product-card'>
            <img src={product.image} alt="product" />
            <div className='card-text'>
                <div className='card-title'>
                    <h3>{product.name}</h3>
                    <p className='price'>{product.price}</p>
                </div>
                <p>{product.description}</p>
                <div className='cart-btns'>
                    {
                        auth?.user?.role === "employee"
                            ?<div className='employee-btns-wrap'>
                                <Link className='edit-link' to={`/shop/edit/${product._id}`}><button className='edit-btn'>Edit Product</button></Link>
                                <button className='delete-btn' onClick={()=>removeProduct(product._id)}>Remove Product</button>
                            </div>
                            :quantity ===0
                                ?<button className='add-to-cart' onClick={()=>increaseCartQuantity(product._id)}>+ Add to Cart</button>
                                :<div className='adj-quantity'>
                                    <div className='quantity'>
                                        <button className='plus-minus' onClick={()=>decreaseCartQuantity(product._id)}>-</button>
                                        <p>{quantity} in cart</p>
                                        <button className='plus-minus'onClick={()=>increaseCartQuantity(product._id)}>+</button>
                                    </div>
                                    <button className='remove-btn'onClick={()=>removeFromCart(product._id)}>Remove</button>
                                </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
