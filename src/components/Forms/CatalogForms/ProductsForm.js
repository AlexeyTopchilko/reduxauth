import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ProductForm from './ProductForm';
import { useEffect, useState } from 'react';
import Copyright from '../Copyright/Copyright';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

export default function ProductsForm() {
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
        () => GetProducts()
    )

    if (products != null) {
        return (
            <Grid container className={classes.root} >
                <Grid item xs={12}>
                    <Grid container justifyContent spacing={2} >
                            {products.map(item =>
                            <Grid item  >
                                <ProductForm name={item.name} price={item.price} description={item.description} />
                                </Grid>
                            )}
                    </Grid>
                </Grid>
            </Grid>
        );
    }
    else {
        return <h1>Loading...</h1>
    }
}