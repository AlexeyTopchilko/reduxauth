import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
      position : 'relative',
    height : '100%'
  },
  media: {
    height: 140,
    backgroundSize : 'contain'
  },
  button: {
      position : 'absolute',
      bottom : 0 ,
  }
});

export default function ProductCard(props) {
  const classes = useStyles();
  const name = props.name;
    const price = props.price;
    const description = props.description;
    const image = props.image;
    const id = props.id;

  return (
    <Card className={classes.root} xs={3}>
      <CardActionArea style={{marginBottom : 10}} href ={'/product/id='+id} >
        <CardMedia
          className={classes.media}
          image={"https://blobforcatalog.blob.core.windows.net/blobforcatalog/Images/"+image}
          title={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography gutterBottom variant="h6" component="h2">
            {price}$
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions >
        <Button className = {classes.button} size="small" color="primary">
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
}