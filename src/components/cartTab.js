import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from './cartItem';
import { toggleStatusTab } from '../stores/cart';

const CartTab = () => {
  const carts = useSelector((store) => store.cart.items);
  const statusTab = useSelector((store) => store.cart.statusTab);
  const dispatch = useDispatch();

  // Calculate total price
  

  // Calculate total quantity
  const totalQuantity = carts.reduce((total, item) => total + item.quantity, 0);

  const handleCloseTabCart = () => {
    dispatch(toggleStatusTab());
  };

  return (
    <div
      className={`fixed top-0 right-0 bg-gray-700 shadow-2xl w-96 h-full grid grid-rows-[60px_1fr_120px] 
    transform transition-transform duration-500
    ${statusTab === false ? 'translate-x-full' : ''}
    `}
    >
      <h2 className="p-5 text-white text-2xl">Shopping Cart</h2>
      <div className="p-5 overflow-y-auto">
        {carts.map((item, key) => (
          <CartItem key={key} data={item} />
        ))}
      </div>
      <div className="bg-gray-800 p-5 text-white text-center flex flex-col gap-4">
        {/* Total Price and Quantity */}
        <div>
          <p className="text-md font-medium">Total Items: {totalQuantity}</p>
        </div>
        {/* Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-black text-white py-2" onClick={() => {
                handleCloseTabCart();
                document.getElementById('product-listing')?.scrollIntoView({ behavior: 'smooth' }); // Scroll to product listing
            }}>
            CONTINUE <br />SHOPPING
          </button>
          <button className="bg-green-600 text-white py-2">CHECKOUT <br />(coming soon)</button>
        </div>
      </div>
    </div>
  );
};

export default CartTab;
