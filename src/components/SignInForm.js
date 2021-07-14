import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from './Copyright';
import { signIn } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignInForm() {

  const authReducer = useSelector(state => state.authReducer)

  const dispatch = useDispatch();

  const classes = useStyles();

  const [values, setValues] = useState({
    username: '',
    password: '',
    errors: { username: '', password: '' },
    usernameValid: false,
    passwordValid: false,
    formValid: false,
  })

  const set = name => {
    return (({ target: { value } }) => {
      setValues(oldValues => ({ ...oldValues, [name]: value }));
      validateField(name, value);
    })
  }

  function validateField(fieldName, value) {
    let fieldValidationErrors = values.errors;
    let usernameValid = values.usernameValid;
    let passwordValid = values.passwordValid;

    switch (fieldName) {
      case 'username':
        usernameValid = value.length >= 1;
        fieldValidationErrors.username = usernameValid ? '' : 'Can not be empty';
        break;
      case 'password':
        passwordValid = value.length >= 1;
        fieldValidationErrors.password = passwordValid ? '' : 'Can not be empty';
    }
    setValues(oldValues => ({
      ...oldValues,
      errors: fieldValidationErrors,
      usernameValid: usernameValid,
      passwordValid: passwordValid,
      formValid: usernameValid && passwordValid
    }));
  }
  let userInfo = {
    username: values.username,
    password: values.password
  }

  if(authReducer.loggedIn)
  {
    return(<Redirect to='/weather'/>)
  }

  else{
  return (

    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper} >
        <Typography component="h1" variant="h4">
          Sign in
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
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                error={values.errors.password}
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
            onClick={() => { dispatch(signIn(userInfo)) }}
          >
            Sign In
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signup" variant="h5">
                Don't have an account? Sign up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  )
  }
};

export default SignInForm;