import { Divider, Grid, ListItemAvatar } from "@material-ui/core";
import { useEffect, useState } from "react";
import CartLine from "./CartLine";
import { URL, OrderByUser } from "../../Addresses/Addresses";
import { useSelector } from "react-redux";



export default function Cart() {

    const authReducer = useSelector(state => state.authReducer)
    const [products, setProducts] = useState([]);
    const [updated, setUpdated] = useState(false);
    
    const handleUpdate = () => {
        setUpdated(!updated);
    }
    async function GetOrderByUser() {
        let params = "?userId=" + authReducer.user.id;
        let response = await fetch(URL + OrderByUser + params, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        });
        let data = await response.json();
        setProducts(data.products);
    }

    useEffect(() => {
        GetOrderByUser();
    },[updated])
    return (
        <Grid style={{ marginTop: 10, justifyItems: 'center' }}>
            <h1>Cart</h1>
            {products.map(item =>
                <CartLine key={item.id} image={item.image} 
                name={item.name} price={item.price} 
                quantity={item.quantity} totalPrice={item.totalPrice} 
                productId={item.productId} id={item.id} handleUpdate={handleUpdate} />
            )}
        </Grid>
    )
}