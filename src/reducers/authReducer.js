import { SET_USER, SET_USER_FAIL, LOG_OUT } from '../actions/Types/userActionTypes';

const defaultState = {
    loggedIn: false,
    user: {}
}

const authReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                loggedIn: true,
                user: action.payload
            }
        case SET_USER_FAIL:
            return{
                loggedIn : false,
                user: {}
            }    
        case LOG_OUT:
            return {
                loggedIn: false,
                user: {}
            }
        default: return state
    }
}

export default authReducer;