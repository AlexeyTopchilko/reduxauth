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


export default function CartLine(props) {
    const [quantity, setQuantity] = useState(props.quantity);
    const image = props.image;
    const name = props.name;
    const price = props.price;
    const totalPrice = props.totalPrice;
    const productId = props.productId;
    const id = props.id;

    async function DeleteCartLine() {
        let params = "?id=" + id;
        await fetch(URL + RemoveCartLine + params, {
            method: 'DELETE'
        });
        props.handleUpdate();
    }

    async function ChangeQuantity(num) {
        let params = `?id=${id}&quantity=${num}`;
       WebAPI('PUT',params,URL+CHANGEQUANTITY)
        props.handleUpdate();
    }
    const handleChange = (e) => {
        const mask = /^[0-9\b]+$/;
        if (e.target.value === '') {
            setQuantity(0);
            ChangeQuantity(0);
        }
        if (mask.test(e.target.value)) {
            setQuantity(Number(e.target.value));
            ChangeQuantity(Number(e.target.value));
        }
    }

    async function handleQuantity(num) {
        let params = "?id=" + id + "&quantity=" + (quantity + num);
        WebAPI('PUT',params,URL+CHANGEQUANTITY);
        setQuantity(Number(quantity + num));
        props.handleUpdate();
    }

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
            <Grid item  >
                <Grid container style={{ justifyContent: 'space-between' }} >
                    <Grid item xs={4}>
                        <Tooltip title="-1" aria-label="remove">
                            <Fab color='primary' size="small" onClick={() => { handleQuantity(-1) }} disabled={!(quantity > 0)} >
                                <RemoveIcon />
                            </Fab>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField value={quantity === 0 ? '' : quantity} onChange={handleChange} />
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
                    {totalPrice}$
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