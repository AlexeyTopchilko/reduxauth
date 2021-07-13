import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from './Copyright';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', 
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  
  function SignUpForm()  {
   
    const classes = useStyles();
  
        const [values, setValues] = useState({
          username : '',
          password : '',
          errors : { username : '', password : '', email : ''},
          usernameValid : false,
          emailValid : false,
          passwordValid : false,
          formValid : false,
          redirect : false
        })
  
        const set = name => {
          return (({target: {value}})=>{
            setValues(oldValues =>({...oldValues,[name] : value}));
            validateField(name,value);
          })
        }
  
        useEffect(
           (() =>{localStorage.removeItem('status');
        localStorage.removeItem('message')})
        );
  
        function validateField(fieldName, value){
          let fieldValidationErrors = values.errors;
          let usernameValid = values.usernameValid;
          let passwordValid = values.passwordValid;
          let emailValid = values.emailValid;
  
          switch(fieldName){
            case 'username':
              usernameValid = value.length >=3;
              fieldValidationErrors.username = usernameValid ? '': 'Too short';
              break;
            case 'password':
              passwordValid = value.length >=5;
              fieldValidationErrors.password = passwordValid ? '': 'Too short';
              break;
          case 'email':
              emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
              fieldValidationErrors.email = emailValid ? '' : 'Email invalid'
  
  
          }
          setValues(oldValues =>({...oldValues,
            errors : fieldValidationErrors,
            usernameValid : usernameValid,
            emailValid : emailValid,
            passwordValid : passwordValid,
            formValid : usernameValid && passwordValid && emailValid
        }));
  
  
        }
      
          async function SignUp() {
  
          let user = {username : values.username,email : values.email, password : values.password }
            const URL = "http://localhost:22948/Register";
            let response = await fetch(URL, { method : 'POST',
          headers : {
            'Content-Type' : 'application/json;charset=utf-8'
          },
        body : JSON.stringify(user)});
        let data = await response.json();
        localStorage.setItem('status',data.status)
        localStorage.setItem('message',data.message)
        if(localStorage.getItem('status')==='Success'){
          alert(localStorage.getItem('message'))
          setValues(oldValues =>({...oldValues,redirect : true}));
        }
        else{
          alert(localStorage.getItem('message'))
        }};
      
          if(values.redirect){return <Redirect to='/signin'/>}
    
          return (
        
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper} >
          <Typography component="h1" variant="h4">
            Sign up
          </Typography>
          <form className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  autoComplete="username"
                  name="username"
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  inputProps={{style: {fontSize: 18}, minLength : "1"}}
                  autoFocus
                  error={values.errors.username}
                  helperText={values.errors.username}
                  value={values.username}
                  onChange={set('username')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  type = 'email'
                  fullWidth
                  id="email"
                  label="Email Address"
                  name='email'
                  inputProps={{style: {fontSize: 18}}}
                  error={values.errors.email}
                  helperText={values.errors.email}
                  autoComplete="email"
                  value={values.email}
                  onChange={set('email')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  error={values.errors.password}
                  helperText={values.errors.password}
                  inputProps={{style: {fontSize: 18}, minLength : "1"}}
                  value={values.password}
                  onChange={set('password')}
                />
              </Grid>
            </Grid>
            <Button
              type="button"
              fullWidth
              variant="contained"
              className={classes.submit}
              disabled={!values.formValid}
              onClick = {() => SignUp()}
            >
              Sign In
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/signin" variant="h5">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    )};
  
  export default SignUpForm;