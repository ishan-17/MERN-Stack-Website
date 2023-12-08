import { createContext, useReducer } from "react";
// import Cookies from 'js-cookie'


export const ShoppingCartContext = createContext();


const initialState = {
//   cart: Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : { cartItems: [] },
cart: {cartItems: [], shippingAddress: {}, paymentMethod: {}}
};


const reducer = (state, action) => {
    switch (action.type) {
      case "CART_ADD_ITEM": {
        const newItem = action.payload;
        const itemExists = state?.cart?.cartItems.find(
          (e) => e._id === newItem._id
        );
  
        const cartItems = itemExists
          ? state?.cart?.cartItems.map((e) =>
              e.title === newItem?.title ? newItem : e
            )
          : [...state?.cart?.cartItems, newItem];
  
        // Remove product if its quantity is 0
        const itemExistsIndex = state?.cart?.cartItems.findIndex(
          (e) => e._id === newItem._id
        );
  
        if (
          itemExistsIndex > -1 &&
          state.cart.cartItems[itemExistsIndex].quantity === 0
        ) {
           cartItems.splice(itemExistsIndex, 1)
        }
  
      //   Cookies.set('cart', JSON.stringify({...state.cart, cartItems}))
  
        return { ...state, cart: { ...state.cart, cartItems } };
      }
  
      case "REMOVE_CART_ITEM": {
        console.log("xxxxxxx", action)
          const id = action.payload
          const cartItems = state?.cart?.cartItems.filter(e => e._id !== id)
          // Cookies.set('cart', JSON.stringify({...state.cart, cartItems}))
  
          return { ...state, cart: {...state?.cart, cartItems} };
  
      }
  
      case "UPDATE_QUANTITY": {
          const item = action.payload
          console.log("state", state)
          let itemToUpdate = state.cart.cartItems.find(e => e.id === item.id)
          console.log("itemtoupdate", itemToUpdate)
          itemToUpdate.quantity = +item.quantity
          const cartItems = state.cart.cartItems
          return {...state, cart: {...state.cart, cartItems}}
          
      }
  
      case "SAVE_SHIPPING_ADDRESS": {
          return {...state, cart: {...state.cart, shippingAddress: {...state.cart.shippingAddress, ...action.payload}}}
      }
  
      case "SAVE_PAYMENT_METHOD": {
        return {...state, cart: {...state.cart, paymentMethod: {...state.cart.paymentMethod, ...action.payload}}}
      }
  
      case "RESET_CART": {
        return {...state, cart: {...state.cart, shippingAddress: {}, paymentMethod: {}, cartItems: []}}
      }
    }
  };
  
  export function ShoppingCartProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };
    return (
      <ShoppingCartContext.Provider value={value}>
        {children}
      </ShoppingCartContext.Provider>
    );
  }
  