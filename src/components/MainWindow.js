import { BrowserRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import LogInButton from './Authentication/Buttons/LogInButton';
import LogOutButton from './Authentication/Buttons/LogOutButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux'
import { blue } from '@material-ui/core/colors';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import HomeIcon from '@material-ui/icons/Home';
import Routes from './Routes/Routes';





const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  appBar: {
    backgroundColor: blue[500]
  },
  title: {
    flexGrow: 1,

  },
  authButtton: {
    marginLeft: theme.spacing(3),
  }
}));

const MainWindow = () => {

  const authReducer = useSelector(state => state.authReducer)

  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.root} >
        <AppBar className={classes.appBar} position="sticky">
          <Toolbar>
            <Button className={classes.menuButton} variant="contained" startIcon={<HomeIcon />} color="primary" type="submit" href="/">
              Home
            </Button >
            <Button className={classes.title} variant="contained" type="submit" color="primary" href="/catalog">
              Catalog
            </Button >
            {authReducer.loggedIn ? <Button className={classes.title} variant="contained" color="primary" type="submit" href="/weather">
              Authorized space
            </Button> : <Button style={{ display: 'none' }} />}
            {!authReducer.loggedIn ? <LogInButton className={classes.authButtton} /> : <LogOutButton className={classes.authButtton} />}
            <Button className={classes.authButtton} color="primary" variant="contained" startIcon={<LocalGroceryStoreIcon />} href="/Cart">
              Cart
            </Button>
          </Toolbar>
        </AppBar>
        <div>
          <Routes />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default MainWindow;