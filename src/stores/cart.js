import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
    items: localStorage.getItem("carts") ? JSON.parse(localStorage.getItem("carts")) : [],
    statusTab: false,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // Add an item to the cart
        addToCart(state, action) {
            const { productId, quantity } = action.payload;
            const existingProductIndex = state.items.findIndex(item => item.productId === productId);

            if (existingProductIndex >= 0) {
                // Update the quantity of the existing product
                state.items[existingProductIndex].quantity += quantity;
            } else {
                // Add a new product to the cart
                state.items.push({ productId, quantity });
            }

            // Update localStorage
            localStorage.setItem("carts", JSON.stringify(state.items));
        },

        // Change the quantity of an item
        changeQuantity(state, action) {
            const { productId, quantity } = action.payload;
            const existingProductIndex = state.items.findIndex(item => item.productId === productId);
        
            if (existingProductIndex >= 0) {
                if (quantity > 0) {
                    // Correctly updating quantity
                    state.items[existingProductIndex].quantity = quantity;
                } else {
                    // Remove product entirely when quantity is 0
                    state.items = state.items.filter(item => item.productId !== productId);
                }

                // Update localStorage
                localStorage.setItem("carts", JSON.stringify(state.items));
            }
        },

        // Toggle the visibility of the cart tab
        toggleStatusTab(state) {
            state.statusTab = !state.statusTab;
        },
    },
});

export const { addToCart, changeQuantity, toggleStatusTab } = cartSlice.actions;
export default cartSlice.reducer;
