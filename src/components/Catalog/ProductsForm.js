import React from 'react';
import Grid from '@material-ui/core/Grid';
import ProductCard from './ProductCard';


export default function ProductsForm(props) {
    if (props.products.length > 0) {
        return (
            <Grid container  justifyContent = "flex-start" spacing={2} style={{ display: 'flex', alignContent: 'normal' }} >
                {props.products.map(item =>
                    <Grid item key={item.id} md={3} >
                        <ProductCard name={item.name} price={item.price} description={item.description} image={item.image}/>
                    </Grid>
                )}
            </Grid>
        );
    }
    else {
        return <h1>Loading...</h1>
    }
}