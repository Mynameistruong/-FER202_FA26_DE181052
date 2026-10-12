import { useReducer } from 'react';
import { CART_ACTIONS, cartReducer, getCartTotals, initialCart } from '../reducers/cartReducer';
import { CartContext } from './CartContext';

const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);
  const { totalPrice, totalQuantity } = getCartTotals(cart);
  const value = {
    cart,
    dispatch,
    totalPrice,
    totalQuantity,
    addToCart: (product) => dispatch({ type: CART_ACTIONS.ADD, payload: product }),
    clearCart: () => dispatch({ type: CART_ACTIONS.CLEAR }),
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
