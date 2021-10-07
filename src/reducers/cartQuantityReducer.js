import { SET_QUANTITY, RESET_QUANTITY } from "../actions/Types/CartQuantityTypes"

const defaultState = {
    quantity : 0
}


const cartQuantityReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_QUANTITY:
            return {
                quantity: action.payload
            }
        case RESET_QUANTITY:
            return {
                quantity : 0
            }
        default: return state
    }
}

export default cartQuantityReducer;