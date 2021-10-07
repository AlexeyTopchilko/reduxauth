import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logOut } from '../../../actions/userActions';

function LogOutButton(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    return (
        <Button className={props.className} variant="contained" color='primary' type="button" onClick={() => {
            dispatch(logOut());
            history.push("/signin")
        }}>
            Logout
        </Button>
    )
}

export default LogOutButton;