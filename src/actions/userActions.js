import { Login, URL } from '../Addresses/Addresses';
import { SET_USER, SET_USER_FAIL, LOG_OUT } from './Types/userActionTypes';

const setUser = (payload) => ({ type: SET_USER, payload })
const setUserFail = () => ({ type: SET_USER_FAIL })
const delUser = () => ({ type: LOG_OUT })

export const signIn = (userInfo) => dispatch => {
    fetch(URL + Login, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo)
    })
        .then(res =>
            res.json()
        )
        .then(data => {
            if (data.access_token) {
                localStorage.setItem('token', data.access_token)
                dispatch(setUser({name : data.username, id : data.id} ))
            }
            else {
                dispatch(setUserFail())
            }
        })
}

export const logOut = () => dispatch => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    dispatch(delUser())
}