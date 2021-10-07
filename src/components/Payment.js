import { useEffect, useState } from "react";
import { PayAddress, PaymentOrderInfo, URL } from "../Addresses/Addresses";
import WebAPI from "../WebApi";
import LinearProgress from '@material-ui/core/LinearProgress';
import { Button, Typography, Grid } from "@material-ui/core";
import { useHistory } from "react-router";

export default function Payment(props) {

    const [orderInfo, setOrderInfo] = useState({ orderId: 0, totalPrice: 0 });
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    let token = localStorage.getItem('token');

    async function GetOrderInfo() {
        let params = '?orderId=' + props.match.params.orderId;
        let getResponse = await fetch(URL + PaymentOrderInfo + params, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                authorization: 'Bearer ' + token
            }
        });
        let data = await getResponse.json();
        setOrderInfo(data);
        setLoading(false);
    }
    async function Pay() {
        let params = { orderId: props.match.params.orderId, Paid: true };
        WebAPI('POST', params, URL + PayAddress);
        history.push('/catalog');
    }

    useEffect(() => {
        setLoading(true);
        GetOrderInfo();
    }, [])

    if (loading) {
        return (<div>
            <h1>Loading...</h1>
            <LinearProgress color="primary" />
        </div>)
    }
    else {
        return (
            <Grid>
                <Grid container spacing={2} style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 30, alignItems: 'center' }}>
                    <Grid item>
                        <Typography>Order Id: {orderInfo.orderId}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography>Price: {orderInfo.totalPrice}$</Typography>
                    </Grid>
                </Grid>
                <Button color="primary" size="large" onClick={Pay} >Pay</Button>
            </Grid>)
    }
}

