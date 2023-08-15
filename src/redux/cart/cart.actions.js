import CartActionTypes from './cart.types';

export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN
});

export const addItem = item => {
  console.log(item);
  return {
  type: CartActionTypes.ADD_ITEM,
  payload: item
 };
};

export const removeItem = item => ({
  type: CartActionTypes.REMOVE_ITEM,
  payload: item
});

export const clearItemFromCart = item => {
  return {
  type: CartActionTypes.CLEAR_ITEM_FROM_CART,
  payload: item
 };
};

