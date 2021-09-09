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
import Copyright from '../Copyright/Copyright';
import { Registry, URL } from '../../Addresses/Addresses';
import WebAPI from '../../WebApi';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    maxWidth: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUpForm() {

  const classes = useStyles();

  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    errors: { username: '', password: '', email: '' },
    usernameValid: false,
    emailValid: false,
    passwordValid: false,
    formValid: false,
    redirect: false
  });

  const [open,setOpsen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const set = name => {
    return (({ target: { value } }) => {
      setValues(oldValues => ({ ...oldValues, [name]: value }));
      validateField(name, value);
    })
  }

  useEffect(
    (() => {
      localStorage.removeItem('status');
      localStorage.removeItem('message');
      setOpsen(false);
      setMessage('');
    }),[]
  );

  function validateField(fieldName, value) {
    let fieldValidationErrors = values.errors;
    let usernameValid = values.usernameValid;
    let passwordValid = values.passwordValid;
    let emailValid = values.emailValid;

    switch (fieldName) {
      case 'username':
        usernameValid = value.length >= 3 && value.length <= 10;
        fieldValidationErrors.username = usernameValid ? '' : 'Must be between 3 and 10 symbols';
        break;
      case 'password':
        passwordValid = value.length >= 5 && value.length <= 24;
        fieldValidationErrors.password = passwordValid ? '' : 'Must be between 5 and 24 symbols';
        break;
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : 'Email invalid'
        break;
      default:
        break;


    }
    setValues(oldValues => ({
      ...oldValues,
      errors: fieldValidationErrors,
      usernameValid: usernameValid,
      emailValid: emailValid,
      passwordValid: passwordValid,
      formValid: usernameValid && passwordValid && emailValid
    }));
  }

  function wait(time) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

  async function SignUp() {

    let user = { username: values.username, email: values.email, password: values.password }
    let data = await WebAPI('POST',user,URL+Registry);
    if (data.status === 'Success') {
      setSeverity('success');
      setMessage(data.message);
      setOpsen(true);
      await wait(2000);
      setValues(oldValues => ({ ...oldValues, redirect: true }));
    }
    else {
      setSeverity('error');
      setMessage(data.message);
      setOpsen(true);
    }
  };

  if (values.redirect) { return <Redirect to='/signin' /> }

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
                inputProps={{ style: { fontSize: 18 }, minLength: "1" }}
                autoFocus
                error={values.errors.username !==''}
                helperText={values.errors.username}
                value={values.username}
                onChange={set('username')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                type='email'
                fullWidth
                id="email"
                label="Email Address"
                name='email'
                inputProps={{ style: { fontSize: 18 } }}
                error={values.errors.email !==''}
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
                error={values.errors.password !==''}
                helperText={values.errors.password}
                inputProps={{ style: { fontSize: 18 }, minLength: "1" }}
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
            onClick={() => SignUp()}
          >
            Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signin" variant="h5">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box style ={{ marginTop: 60}}>
        <Copyright />
      </Box>
      <Snackbar  open={open} anchorOrigin={{vertical :'top', horizontal: 'center'}}>
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
    </Container>
  )
};

export default SignUpForm;