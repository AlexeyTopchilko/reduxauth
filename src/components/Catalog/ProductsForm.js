import React from 'react';
import Grid from '@material-ui/core/Grid';
import ProductForm from './ProductForm';


export default function ProductsForm(props) {
    if (props.products.length > 0) {
        return (
            <Grid container  justifyContent = "flex-start" spacing={2} style={{ display: 'flex', alignContent: 'normal' }} >
                {props.products.map(item =>
                    <Grid item key={item.id} xs={3} >
                        <ProductForm name={item.name} price={item.price} description={item.description} />
                    </Grid>
                )}
            </Grid>
        );
    }
    else {
        return <h1>Loading...</h1>
    }
}