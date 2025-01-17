import React, { useState, useEffect } from 'react';
import { products } from '../products';
import { useDispatch, useSelector } from 'react-redux';
import { changeQuantity } from '../stores/cart';

// New Cart parent component
const Cart = () => {
    const cartItems = useSelector(state => state.cart.items);
    
    // Calculate total price
    const totalPrice = cartItems.reduce((total, item) => {
        const product = products.find(p => p.id === item.productId);
        return total + (product?.price || 0) * item.quantity;
    }, 0);

    return (
        <div className="p-4">
            {cartItems.map(item => (
                <CartItem key={item.productId} data={item} />
            ))}
            
            {/* Total price display */}
            <div className="mt-4 p-4 bg-slate-600 text-white rounded-md">
                <h2 className="text-xl font-bold">
                    Total: ${totalPrice.toFixed(2)}
                </h2>
            </div>
        </div>
    );
};

// Your existing CartItem component
const CartItem = (props) => {
    const { productId, quantity } = props.data;
    const [detail, setDetail] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        // Find the product details based on productId
        const findDetail = products.find(product => product.id === productId);
        setDetail(findDetail || {}); // Ensure detail is not undefined
    }, [productId]);

    // Handlers for quantity changes
    const handleMinusQuantity = () => {
        if (quantity > 1) {
            dispatch(changeQuantity({
                productId: productId,
                quantity: quantity - 1,
            }));
        }
    };

    const handlePlusQuantity = () => {
        dispatch(changeQuantity({
            productId: productId,
            quantity: quantity + 1,
        }));
    };

    const handleClearQuantity = () => {
        dispatch(changeQuantity({
            productId: productId,
            quantity: 0
        }));
    };

    return (
        <div className='flex justify-between items-center bg-slate-600 text-white p-2 border-b-2 border-slate-700 gap-5 rounded-md'>
            {/* Product Image */}
            <img src={detail.image} alt={detail.name} className='w-12' />

            {/* Product Name */}
            <h3>{detail.name || 'Unknown Product'}</h3>

            {/* Product Price */}
            <p>${(detail.price || 0) * quantity}</p>

            {/* Quantity Controls */}
            <div className='w-20 flex justify-between gap-2'>
                <button
                    className='bg-gray-200 rounded-full w-6 h-6 text-cyan-600'
                    onClick={handleMinusQuantity}
                    disabled={quantity <= 1}
                >
                    -
                </button>
                <span>{quantity}</span>
                <button
                    className='bg-gray-200 rounded-full w-6 h-6 text-cyan-600'
                    onClick={handlePlusQuantity}
                >
                    +
                </button>
                <button
                    className='bg-gray-200 rounded-full w-6 h-6 text-red-600'
                    onClick={handleClearQuantity}
                >
                    X
                </button>
            </div>
        </div>
    );
};

export default CartItem;
