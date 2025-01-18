import React from 'react' 
import { Link } from 'react-router-dom';
import iconCart from '../assets/images/iconCart.png'
import { useSelector, useDispatch} from 'react-redux';
import { useState } from 'react';
import { addToCart } from '../stores/cart';

const ProductCart = (props) => {
    const [isAdded, setIsAdded] = useState(false);
    const carts = useSelector((store) => store.cart.items);
    const { id, name, price, image, slug } = props.data;
    const dispatch = useDispatch();
  
    const handleAddToCart = () => {
      dispatch(
        addToCart({
          productId: id,
          quantity: 1,
        })
      );
      setIsAdded(true);
    };
  
    return (
      <div className="bg-white p-5 rounded-xl shadow-sm">
        <Link to={slug}>
          <img src={image} alt="" className="w-full h-80 object-cover object-top" />
        </Link>
        <h3 className="text-2xl py-3 text-center font-medium">{name}</h3>
        <div className="flex justify-between items-center">
          <p>
            $<span className="text-2xl font-medium">{price}</span>
          </p>
          <button
            className={`p-2 rounded-md text-sm flex gap-2 ${
              isAdded
                ? 'bg-gray-500 cursor-not-allowed hover:bg-gray-500'
                : 'bg-green-600 hover:bg-green-500'
            }`}
            onClick={handleAddToCart}
            disabled={isAdded}
          >
            <img src={iconCart} alt="" className="w-5" />
            {isAdded ? 'Added to Cart' : 'Add To Cart'}
          </button>
        </div>
      </div>
    );
  };
  
  export default ProductCart;
