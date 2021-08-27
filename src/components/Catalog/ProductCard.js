import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { useSelector } from 'react-redux'
import { URL, AddToCart } from '../../Addresses/Addresses';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    position: 'relative',
    height: '100%'
  },
  media: {
    height: 140,
    backgroundSize: 'contain'
  },
  button: {
    position: 'absolute',
    bottom: 0,
  }
});

export default function ProductCard(props) {
  const classes = useStyles();
  const name = props.name;
  const price = props.price;
  const description = props.description;
  const image = props.image;
  const id = props.id;
  let history=useHistory();

  const authReducer = useSelector(state => state.authReducer)

  async function AddToCartFunc() {
    if(authReducer.loggedIn){
    let productInfo = { userId: authReducer.user.id, quantity: 1, id: id }
    let response = await fetch(URL + AddToCart, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(productInfo)
    });
  }
  else{
      history.push('/signin')
  }
    
    }

return (
  <Card className={classes.root} xs={3}>
    <CardActionArea style={{ marginBottom: 10 }} href={'/product/id=' + id} >
      <CardMedia
        className={classes.media}
        image={"https://blobforcatalog.blob.core.windows.net/blobforcatalog/Images/" + image}
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
      <Button className={classes.button} size="small" onClick={AddToCartFunc} color="primary" startIcon={<AddShoppingCartIcon />} >
        Add to cart
      </Button>
    </CardActions>
  </Card>
);
}