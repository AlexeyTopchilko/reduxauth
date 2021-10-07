import { Button, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import CartLine from "./CartLine";
import { URL, CartByUser, UpdateCart, GetOrderById } from "../../Addresses/Addresses";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import WebAPI from "../../WebApi";
import LinearProgress from '@material-ui/core/LinearProgress';



export default function Cart() {

    const authReducer = useSelector(state => state.authReducer)
    const [updated, setUpdated] = useState(false);
    const [cartInfo, setCartInfo] = useState({
        id: 0,
        userId: 0, products: []
    });
    const [totalPrice, setTotalPrice] = useState(0);
    const [changed, setChanged] = useState(false);

    function calculateTotalPrice() {
        let sum = 0;
        cartInfo.products.map(product => sum += product.quantity * product.price);
        setTotalPrice(sum);
    }
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const changeCartLine = (id, quantity) => {
        const newProducts = cartInfo.products.map(product => {
            if (product.id === id) {
                product.quantity = quantity;
                return product;
            }
            return product;
        });
        setChanged(true);
        setCartInfo(oldValues => ({ ...oldValues, products: newProducts }));
    }

    const deleteCartLine = (id) => {
        const newProducts = cartInfo.products.filter(product => product.id !== id);
        setCartInfo(oldValues => ({ ...oldValues, products: newProducts }));
        setChanged(true);
    }

    const history = useHistory();

    const handleUpdate = () => {
        setUpdated(!updated);
    }
    async function GetOrderByUser() {
        try {
            let params = "?userId=" + authReducer.user.id;
            let data = await WebAPI('GET', params, URL + CartByUser);
            setCartInfo(data);
            calculateTotalPrice();
            setLoading(false);
        }
        catch {
            setError(true);
            setLoading(false);
        }
    }

    async function updateCartFunc() {
        await WebAPI('POST', cartInfo, URL + UpdateCart);
    }

    useEffect(() => {
        GetOrderByUser();
    }, []);

    useEffect(() => {
        calculateTotalPrice();
    }, [deleteCartLine, changeCartLine]);

    if (loading === false) {
        if (error === true) { return (<h1>Something went wrong</h1>) }
        if (cartInfo.products === null || cartInfo.products.length === 0) {
            return (<h1>There is no products in your cart.</h1>)
        }
        else {
            return (
                <Grid style={{ marginTop: 10, justifyItems: 'center' }}>
                    <Button variant="contained"
                        color="primary"
                        style={{ position: 'fixed', marginTop: '3%', marginLeft: '35%', visibility: changed ? 'visible' : 'hidden' }}
                        onClick={() => { updateCartFunc(); setChanged(false);}}
                    >Save changes</Button>
                    <h1>Cart</h1>
                    {cartInfo.products.map(item =>
                        <CartLine key={item.id}
                            changeCartLine={changeCartLine}
                            deleteCartLine={deleteCartLine}
                            product={item}
                            handleUpdate={handleUpdate} />
                    )}
                    <h1 style={{ marginTop: 50 }}>Total price: {totalPrice}$</h1>
                    <Button onClick={() => history.push("/address/cartId=" + cartInfo.id)}
                        variant="contained" color="primary" style={{ marginBottom: 40, marginTop: 20 }}>Place an order</Button>
                </Grid>
            )
        }
    }
    else {
        return (
            <div>
                <h1>Loading...</h1>
                <LinearProgress color="primary" />
            </div>)
    }
}