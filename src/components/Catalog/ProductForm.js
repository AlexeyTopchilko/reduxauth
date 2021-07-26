import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 300,
      backgroundColor: theme.palette.background.paper,
    },
    section1: {
      margin: theme.spacing(3,2),
    },
    section3: {
      margin: theme.spacing(3, 1, 1),
    },
  }));
  
  export default function ProductForm(props) {
    const classes = useStyles();
    const name = props.name;
    const price = props.price;
    const description = props.description;
  
    return (
      <Box border={1} borderColor = "primary.main" className={classes.root}>
        <div className={classes.section1}>
          <Grid container alignItems="flex-start" style ={{ flexDirection : 'column'}} >
              <Typography  variant="h4">
                {name}
              </Typography>

              <Typography  variant="h6">
                {price}$
              </Typography>
 
          <Typography color="textSecondary" variant="body1">
            {description}
          </Typography>

          </Grid>
        </div>
        <Divider variant="middle" />
        <div className={classes.section3}>
          <Button color="primary" fullWidth
            variant="contained" position = 'bottom' >Add to cart</Button>
        </div>
      </Box>
    );
  }