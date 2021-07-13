import { useHistory } from "react-router-dom"

const setUser = (payload) => ({ type: "SET_USER", payload })
const setUserFail = () => ({ type: "SET_USER_FAIL" })
const regUser = (payload) => ({ type: "REG_USER", payload })
const regUserFail = (payload) => ({type: "REG_USER_FAIL",payload})
const delUser = () => ({ type: "LOG_OUT" })

export const signIn = (userInfo) => dispatch => {
    fetch('http://localhost:22948/Login', {
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
                alert('Welcome,' + data.username +'!')
                dispatch(setUser(data.username))
            }
            else {
                alert('Wrong username or password')
                dispatch(setUserFail())
            }
        })
}

export const signUp = (userInfo) => dispatch => {
    fetch('http://localhost:22948/Register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(userInfo)
    })
        .then(res => res.json())
        .then(data => {
            if(data.status === 'Success')
            {
            alert('User created successfully')
            dispatch(regUser(data.message))
            }
            else{
                alert(data.message)
                dispatch(regUserFail(data.message))
            }
        })
}

export const logOut = () => dispatch => {
    //let history = useHistory()
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    //history.push("/signin");
    dispatch(delUser())
}