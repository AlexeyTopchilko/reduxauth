import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { signIn } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';
import { Backdrop } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';


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
  const dispatch = useDispatch();

  const authReducer = useSelector(state => state.authReducer)

  const classes = useStyles();

  const [values, setValues] = useState({
    username: '',
    password: '',
    errors: { username: '', password: '' },
    usernameValid: false,
    passwordValid: false,
    formValid: false,
  });
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('Wrong username or password!');
  const [severity, setSeverity] = useState('error');
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);

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
        break;

      default:
        break;
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

  function wait(time) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  }

  async function LogIn() {
    dispatch(signIn(userInfo));
  }


  useEffect(() => {
    setLoading(authReducer.loading);
    setOpen(authReducer.open)
    if (authReducer.loggedIn) {
      setRedirect(true);
    }
  }, [authReducer.loading, authReducer.loggedIn])

  if (redirect) {
    return (<Redirect to='/catalog' />)
  }

  else {
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
                  error={values.errors.username !== ''}
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
                  error={values.errors.password !== ''}
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
              onClick={LogIn}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signup" variant="h5">
                  Don't have an account? Sign up
                </Link>
              </Grid>
            </Grid>
            <Backdrop
              style={{ zIndex: "5" }}
              open={loading}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </form>
        </div>
        <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} style={{ marginTop: 80 }}>
          <Alert severity={severity}>{message}</Alert>
        </Snackbar>
      </Container>
    )
  }
};

export default SignInForm;