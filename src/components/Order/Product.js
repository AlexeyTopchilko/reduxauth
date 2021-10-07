import { Grid, Typography } from "@material-ui/core";
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';

export default function Product(props) {
    const image = props.image;
    const name = props.name;
    const price = props.price;
    const totalPrice = props.totalPrice;
    const productId = props.productId;
    const quantity = props.quantity;

    return (
        <Grid container spacing={2} style={{ height: 240, marginLeft: 0, justifyContent: 'center', flexDirection: 'row', marginTop: 50, alignItems: 'center' }}>
            <Grid item xs={4} >
                <Grid container style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Grid item xs={4} style={{ height: 240 }}>
                        <CardActionArea style={{ height: '100%' }} href={'/product/id=' + productId} >
                            <CardMedia style={{
                                height: '100%',
                                backgroundSize: 'contain'
                            }}
                                image={'https://blobforcatalog.blob.core.windows.net/blobforcatalog/Images/' + image}
                            />
                        </CardActionArea>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography component='h5' variant='h5' >
                            {name}
                        </Typography>
                    </Grid>
                    <Grid item xs={4} >
                        <Typography component='h5' variant='h5' >
                            {price}$
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={4} >
                        <Typography component='h5' variant='h5'>
                            x{quantity}
                        </Typography>
            </Grid>
            <Grid item>
                <Typography component='h5' variant='h5' >
                    {totalPrice}$
                </Typography>
            </Grid>
        </Grid>
    )
}