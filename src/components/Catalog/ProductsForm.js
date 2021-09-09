import React from 'react';
import Grid from '@material-ui/core/Grid';
import ProductCard from './ProductCard';


export default function ProductsForm(props) {
    if (!!props.products) {
        return (
            <Grid container  justifyContent = "flex-start" spacing={2} style={{ display: 'flex', alignContent: 'normal' }} >
                {props.products.map(item =>
                    <Grid item key={item.id} md={3} >
                        <ProductCard id = {item.id} name={item.name} price={item.price} description={item.description} image={item.image} notification={props.notification}/>
                    </Grid>
                )}
            </Grid>
        );
    }
    else {
        return <h1>There is no products</h1>
    }
}