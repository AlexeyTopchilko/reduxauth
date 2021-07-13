import Button from '@material-ui/core/Button';
import { useHistory } from "react-router";
import React, { useState, useEffect } from 'react';

 function AuthButton()
{
    let history = useHistory();


    if (localStorage.getItem('isLoggedIn') === 'true'){
    return(
    <Button variant="contained" color="primary" type="button" onClick={()=>{localStorage.removeItem('username') ;
     localStorage.removeItem('access_token'); localStorage.setItem('isLoggedIn',false);
     history.push("/signin")
    }}>
             Logout
            </Button>
    )
    }
    else{
        return (
            <Button variant="contained" color="primary" type="button"  href="/signin">
             Sign In
            </Button>
        )
        }
    }

    export default AuthButton;