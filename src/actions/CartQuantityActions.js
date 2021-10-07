import { SET_QUANTITY, RESET_QUANTITY } from "./Types/CartQuantityTypes";

const setQuantity = (payload) => ({ type: SET_QUANTITY, payload });
const resetQuantity = () => ({ type: RESET_QUANTITY })


export const setCartQuantity = (quantity) => dispatch => {
    dispatch(setQuantity(quantity))
}

export const ResetCartQuantity = () => dispatch => {
    dispatch(resetQuantity())
}