import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import LogInButton from './Buttons/LogInButton';
import LogOutButton from './Buttons/LogOutButton';
import WeatherDisplay from './ForTest/WeatherDisplay';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Home from './Home';
import SignInForm from './Forms/SignInForm';
import SignUpForm from './Forms/SignUpForm';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux'





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


const MainWindow = () => {

  const authReducer = useSelector(state => state.authReducer)

  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.root} >
        <AppBar position="static">
          <Toolbar>
            <Button className={classes.menuButton} variant="contained" color="primary" type="submit" href="/">
              Home
            </Button >
            <Button className={classes.title} variant="contained" color="primary" type="submit" href="/weather">
              Get Weather
            </Button>
            {!authReducer.loggedIn ? <LogInButton /> : <LogOutButton />}
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