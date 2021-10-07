import { Grid, Typography } from "@material-ui/core";
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import { red } from "@material-ui/core/colors";
import ClearIcon from '@material-ui/icons/Clear';
import RemoveIcon from '@material-ui/icons/Remove';
import Tooltip from '@material-ui/core/Tooltip';
import { useState } from "react";
import { URL, RemoveCartLine, CHANGEQUANTITY } from "../../Addresses/Addresses";
import { TextField } from "@material-ui/core";
import WebAPI from "../../WebApi";
import { useDispatch, useSelector } from "react-redux";
import { setCartQuantity } from "../../actions/CartQuantityActions";


export default function CartLine(props) {

    const [product, setProduct] = useState(props.product);

    const dispatch = useDispatch();
    const cartQuantityReducer = useSelector(state => state.cartQuantityReducer);
    const token = localStorage.getItem('token');

    async function DeleteCartLine() {
        props.deleteCartLine(product.id);
        dispatch(setCartQuantity(cartQuantityReducer.quantity - product.quantity));
    }

    const handleChange = (e) => {
        const mask = /^[0-9\b]+$/;
        if (e.target.value === '') {
            dispatch(setCartQuantity(cartQuantityReducer.quantity - product.quantity));
            props.changeCartLine(product.id, 0);
        }
        if (mask.test(e.target.value)) {
            dispatch(setCartQuantity(cartQuantityReducer.quantity + (Number(e.target.value - product.quantity))));
            props.changeCartLine(product.id, Number(e.target.value));
        }
    }

    async function handleQuantity(num) {
        dispatch(setCartQuantity(cartQuantityReducer.quantity + num))
        props.changeCartLine(product.id, Number(product.quantity + num));
    }

    return (
        <Grid container spacing={2} style={{ height: 240, marginLeft: 0, justifyContent: 'center', flexDirection: 'row', marginTop: 50, alignItems: 'center' }}>
            <Grid item xs={4} >
                <Grid container style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Grid item xs={4} style={{ height: 240 }}>
                        <CardActionArea style={{ height: '100%' }} href={'/product/id=' + product.productId} >
                            <CardMedia style={{
                                height: '100%',
                                backgroundSize: 'contain'
                            }}
                                image={'https://blobforcatalog.blob.core.windows.net/blobforcatalog/Images/' + product.image}
                            />
                        </CardActionArea>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography component='h5' variant='h5' >
                            {product.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={4} >
                        <Typography component='h5' variant='h5' >
                            {product.price}$
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item  >
                <Grid container style={{ justifyContent: 'space-between' }} >
                    <Grid item xs={4}>
                        <Tooltip title="-1" aria-label="remove">
                            <Fab color='primary' size="small" onClick={() => { handleQuantity(-1) }} disabled={!(product.quantity > 0)} >
                                <RemoveIcon />
                            </Fab>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField value={product.quantity === 0 ? '' : product.quantity} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={4}>
                        <Tooltip title="+1" aria-label="add">
                            <Fab color='primary' size="small" onClick={() => handleQuantity(1)} >
                                <AddIcon />
                            </Fab>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Typography component='h5' variant='h5' >
                    {product.price * product.quantity}$
                </Typography>
            </Grid>
            <Grid item>
                <Tooltip title="Clear" aria-label="Clear">
                    <IconButton aria-label="delete" style={{ color: red[500] }} onClick={DeleteCartLine}>
                        <ClearIcon fontSize="large" />
                    </IconButton>
                </Tooltip>
            </Grid>
        </Grid>
    )
}