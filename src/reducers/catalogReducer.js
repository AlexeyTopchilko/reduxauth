import { RESET_CATEGORY, SET_CATEGORY, SET_SEARCH_MOD } from "../actions/Types/catalogActionTypes"

const defaultState = {
    currentCategory: { id :null,
        name : 'All Categories'},
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
                currentCategory: { id :null,
                    name : 'All Categories'},
                searchMod: false,
                searcString: {}
            }
        case SET_SEARCH_MOD:
            return {
                currentCategory: { id :null,
                    name : 'All Categories'},
                searchMod: true,
                searchString: action.payload
            }
        default: return state
    }
}

export default catalogReducer;