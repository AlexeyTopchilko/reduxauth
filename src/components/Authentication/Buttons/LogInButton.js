import Button from '@material-ui/core/Button';

 function LogInButton(props)
{
     return (
        <Button className={props.className} variant="contained" type="button" color='primary' href="/signin">
          Sign In
         </Button>
            )
}

export default LogInButton;