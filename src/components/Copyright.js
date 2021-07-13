import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

function Copyright() {
    return (
      <Typography variant="h4" color="textSecondary" align="center">
        {'Topchilko©'}
        <Link color="inherit" href="https://www.itechart.by/">
        ItechArt 
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  export default Copyright;