import { RESET_CATEGORY, SET_CATEGORY, SET_SEARCH_MOD } from "../actions/Types/catalogActionTypes"

const defaultState = {
    currentCategory: null,
    searchMod: false,
    searchString: {},
}


const catalogReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_CATEGORY:
            return {
                currentCategory: action.payload,
                searchMod: false,
                searcString: {}
            }
        case RESET_CATEGORY:
            return {
                currentCategory: null,
                searchMod: false,
                searcString: {}
            }
        case SET_SEARCH_MOD:
            return {
                currentCategory: null,
                searchMod: true,
                searchString: action.payload
            }
        default: return state
    }
}

export default catalogReducer;