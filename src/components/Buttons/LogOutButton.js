import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { logOut } from '../../actions/userActions';

function LogOutButton() {
    const dispatch = useDispatch();

    return (
        <Button variant="contained" color="primary" type="button" onClick={() => {
            dispatch(logOut())
        }}>
            Logout
        </Button>
    )
}

export default LogOutButton;