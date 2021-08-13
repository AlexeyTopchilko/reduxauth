import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { logOut } from '../../../actions/userActions';

function LogOutButton(props) {
    const dispatch = useDispatch();

    return (
        <Button className={props.className} variant="contained" color='primary' type="button" onClick={() => {
            dispatch(logOut())
        }}>
            Logout
        </Button>
    )
}

export default LogOutButton;