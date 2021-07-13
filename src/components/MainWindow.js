import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import React from 'react';
import Button from '@material-ui/core/Button';
import AuthButton from './AuthButton';
import WeatherDisplay from './WeatherDisplay';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Home from './Home';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import { makeStyles } from '@material-ui/core/styles';





const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


function MainWindow() {

  const classes = useStyles();

      return (
        <BrowserRouter>
        <div className={classes.root} >
      <AppBar position="static">
        <Toolbar>
        <Button className={classes.menuButton} variant="contained" color="primary" type="submit" href="/">
             Home
            </Button >
            <Button className={classes.title}  variant="contained" color="primary" type="submit" href="/weather">
             Get Weather
            </Button>
            <AuthButton />
        </Toolbar>
      </AppBar>
          <div>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/signin' component={SignInForm} />
                <Route path='/signup' component={SignUpForm} />
                <Route path='/weather' component={WeatherDisplay} />
            </Switch>
          </div>
          </div>
        </BrowserRouter>
      );
  }


  export default MainWindow;