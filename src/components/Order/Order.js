import { Button, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { URL, GetOrderById, ConfirmAnOrder } from "../../Addresses/Addresses";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import WebAPI from "../../WebApi";
import LinearProgress from '@material-ui/core/LinearProgress';
import Product from "./Product";
import { ResetCartQuantity } from "../../actions/CartQuantityActions";



export default function Order(props) {

    const authReducer = useSelector(state => state.authReducer)
    const cartQuantityReducer = useSelector(state => state.cartQuantityReducer);

    const dispatch = useDispatch();
    const [orderInfo, setOrderInfo] = useState({
        id: 0,
        userId: 0, address: null, products: [], totalPrice: 0
    });
    const [loading, setLoading] = useState(true);

    const history = useHistory();

    async function GetOrder() {
        let params = "?orderId=" + props.match.params.orderId;
        let data = await WebAPI('GET', params, URL + GetOrderById)
        setOrderInfo(data);
        setLoading(false);
    }

    async function ConfirmAnOrderFunc() {
        let params = '?orderId='+orderInfo.id;
        await WebAPI('PUT',params, URL + ConfirmAnOrder);
        dispatch(ResetCartQuantity());
    }

    useEffect(() => {
        GetOrder();
    }, [])

    if (loading === false) {
        return (
            <Grid style={{ marginTop: 10, justifyItems: 'center' }}>
                <h1>Order</h1>
                {orderInfo.products.map(item =>
                    <Product key={item.productId} image={item.image}
                        name={item.name} price={item.price}
                        quantity={item.quantity} totalPrice={item.totalPrice}
                        productId={item.productId} id={item.id} />
                )}
                <h1 style={{ marginTop: 50 }}>Total price: {orderInfo.totalPrice}$</h1>
                <h1 style={{ marginTop: 50 }}>Address: {orderInfo.address.city},{orderInfo.address.street},{orderInfo.address.houseNumber}</h1>
                <Button onClick={() =>{ ConfirmAnOrderFunc(); history.push("/stripe/orderId="+ orderInfo.id)}} variant="contained" color="primary" style={{ marginBottom: 40, marginTop: 20 }}>Confirm an order</Button>
            </Grid>
        )
    }
    else {
        return (
            <div>
                <h1>Loading...</h1>
                <LinearProgress color="primary" />
            </div>)
    }
}