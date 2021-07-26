import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

export default function ProductsTest() {
    const classes = useStyles();
    const [products, setProducts] = useState([]);

    async function GetProducts() {

        const URL = "http://localhost:22948/Products";
        let response = await fetch(URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        });
        let data = await response.json();
        setProducts(data);
    };

    useEffect(
        ()=> GetProducts()
    )
if(products != null){
    return (
       products.map(product => <div>name : {product.name} Price: {product.price}$</div>)
      // <div>{JSON.stringify(products)}</div>

    );
}
else{
    return(<div>Loading...</div>)
}
}