import { SET_USER, SET_USER_FAIL, LOG_OUT, SET_LOADING, } from '../actions/Types/userActionTypes';

const defaultState = {
    open: false,
    loading: false,
    loggedIn: false,
    user: {
        id: 0,
        name: ""
    }
}

const authReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                open: false,
                loading: false,
                loggedIn: true,
                user: action.payload
            }
        case SET_USER_FAIL:
            return {
                open: true,
                loading: false
            }
        case LOG_OUT:
            return {
                open: false,
    loading: false,
    loggedIn: false,
    user: {
        id: 0,
        name: ""
    }
            }
        case SET_LOADING:
            return {
                loading: true
            }
        default: return state
    }
}

export default authReducer;