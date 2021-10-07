import { Typography } from "@material-ui/core";
import { useEffect, useState } from 'react';
import { ProductById, URL } from "../../Addresses/Addresses";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';


const useStyles = makeStyles({
  root: {
    height: '100%'
  },
  media: {
    height: 300,
    backgroundSize: 'contain'
  },
  button: {
  }
});

export default function ProductPage(props) {
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  const id = props.match.params.id;
  const [product, setProduct] = useState(null);

  async function GetProductById() {
    let params = "?id=" + id;
    let response = await fetch(URL + ProductById + params, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    });
    let data = await response.json();
    setProduct(data);
    setLoading(false);
  }

  useEffect(
    () => {
      setLoading(true);
      GetProductById();
    }, [])
  if (loading == true) {
    return (
      <div>
        <h1>Loading...</h1>
        <LinearProgress color="primary" />
      </div>)
  }
  else {
    if(product.name !== null){
    return (
      <div>
        <Card className={classes.root} >
          <CardMedia
            className={classes.media}
            image={"https://blobforcatalog.blob.core.windows.net/blobforcatalog/Images/" + product.image}
            title={product.name}
          />
        </Card>
        <Typography gutterBottom variant="h5" component="h2">
          {product.name}
        </Typography>
        <Typography gutterBottom variant="h6" component="h2">
          {product.price}$
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {product.description}
        </Typography>
        <Button className={classes.button} size="small" color="primary">
          Add to cart
        </Button>
        <Button className={classes.button} size="small" color="primary">
          Edit
        </Button>

      </div>
    )}
    else{
      return(<h1>Something going wrong!</h1>)
    }
  }
}