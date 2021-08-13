import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import LogInButton from './Authentication/Buttons/LogInButton';
import LogOutButton from './Authentication/Buttons/LogOutButton';
import WeatherDisplay from './ForTest/WeatherDisplay';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Home from './Home';
import SignInForm from './Authentication/SignInForm';
import SignUpForm from './Authentication/SignUpForm';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux'
import CatalogForm from './Catalog/CatalogForm';
import ProductPage from './Catalog/ProductPage';
import { blue} from '@material-ui/core/colors';





const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  appBar:{
    backgroundColor : blue[500]
  },
  title: {
    flexGrow: 1,
    
  },
  authButtton:{
    marginLeft : theme.spacing(2),
  }
}));

const MainWindow = () => {

  const authReducer = useSelector(state => state.authReducer)

  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.root} >
        <AppBar className ={classes.appBar} position="sticky">
          <Toolbar>
            <Button className={classes.menuButton} variant="contained" color="primary"  type="submit" href="/">
              Home
            </Button >
            <Button className={classes.title} variant="contained"  type="submit" color="primary"  href="/catalog">
              Catalog
            </Button >
            <Button className={classes.title} variant="contained" color="primary"  type="submit" href="/weather">
              Authorized space
            </Button>
            {!authReducer.loggedIn ? <LogInButton className={classes.authButtton} /> : <LogOutButton className={classes.authButtton} />}
          </Toolbar>
        </AppBar>
        <div>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/signin' component={SignInForm} />
            <Route exact path='/signup' component={SignUpForm} />
            <Route exact path='/catalog' component = {CatalogForm}/>
            <Route exact path='/weather' component={WeatherDisplay} />
            <Route exact path ='/product/id=:id' component ={ProductPage} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}


export default MainWindow;