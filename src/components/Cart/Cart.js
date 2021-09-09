import { Button, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import CartLine from "./CartLine";
import { URL, OrderByUser } from "../../Addresses/Addresses";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import WebAPI from "../../WebApi";



export default function Cart() {

    const authReducer = useSelector(state => state.authReducer)
    const [updated, setUpdated] = useState(false);
    const [orderInfo, setOrderInfo] = useState({
        id: 0,
        userId: 0, addressId: 0, products: [], totalPrice: 0
    });
    const [loading, setLoading] = useState(true);

    const history = useHistory();
    const handleUpdate = () => {
        setUpdated(!updated);
    }
    async function GetOrderByUser() {
        let params = "?userId=" + authReducer.user.id;
        let data = await WebAPI('GET',params,URL+OrderByUser)
        setOrderInfo(data);
        setLoading(false);
    }

    useEffect(() => {
        GetOrderByUser();
    }, [updated])
    if(loading === false){
    return (
        <Grid style={{ marginTop: 10, justifyItems: 'center' }}>
            <h1>Cart</h1>
            {orderInfo.products.map(item =>
                <CartLine key={item.id} image={item.image}
                    name={item.name} price={item.price}
                    quantity={item.quantity} totalPrice={item.totalPrice}
                    productId={item.productId} id={item.id} handleUpdate={handleUpdate} />
            )}
            <h1 style={{ marginTop: 50 }}>Total price: {orderInfo.totalPrice}$</h1>
            <Button onClick={() => history.push("/address")} variant="contained" color="primary" style={{ marginBottom: 40, marginTop: 20 }}>Place an order</Button>
        </Grid>
    )}
    else{
        return(<h1>Loading...</h1>)
    }
}