import { Grid, Typography } from "@material-ui/core";
import { useEffect, useState } from 'react';
import { ProductById, URL } from "../../Addresses/Addresses";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    root: {
      height : '100%'
    },
    media: {
      height: 300,
      backgroundSize : 'contain'
    },
    button: {
    }
  });

export default function ProductPage(props)
{
    const classes = useStyles();
    const id = props.match.params.id;
    const [product, setProduct] = useState(null);
    
     async function GetProductById() {
        let response = await fetch(URL + ProductById, {
             method: 'POST',
             body: id,
             headers: {
                 'Content-Type': 'application/json;charset=utf-8'
            }
         });
         let data = await response.json();
        setProduct(data);
     }

     useEffect(
        () => {
            GetProductById()
        },[])
if(product!==null){
return(
    <div>
    <Card className={classes.root} >
        <CardMedia
          className={classes.media}
          image={"https://blobforcatalog.blob.core.windows.net/blobforcatalog/Images/"+product.image}
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
        <Button className = {classes.button} size="small" color="primary">
          Add to cart
        </Button>
        </div>
    
    // <div>
    //     <div>
    // <image src={"https://blobforcatalog.blob.core.windows.net/blobforcatalog/Images/"+product.image} alt ={product.name} />
    // </div>
    // <Grid container >
    //     <Grid item>
    //         <Typography variant="h5" component="h2">{product.name}
    //         </Typography>
    //     </Grid>
    //     <Grid item>
    //         <Typography variant="h6" component="h2">{product.price}$
    //         </Typography>
    //     </Grid>
    //     <Grid item>
    //         <Typography variant="body2" color="textSecondary">{product.description}
    //         </Typography>
    //     </Grid>
    // </Grid>
    // </div>
)}
else{ return( <h1>Loading...</h1>)}
}