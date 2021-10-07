import { Grid, Typography } from "@material-ui/core";



export default function OrderLine(props) {

const id = props.id;
const address = props.address;
const totalPrice = props.totalPrice;
const state = props.state;

    return (
        <Grid container spacing={2} style={{ marginLeft: 0, justifyContent: 'center', flexDirection: 'row', marginTop: 50, alignItems: 'center' }}>
            <Grid item xs={4} >
                <Typography>{id}</Typography>
            </Grid>
            <Grid item>
                <Typography>{address}</Typography>
            </Grid>
            <Grid item>
                <Typography component='h5' variant='h5' >
                    {totalPrice}$
                </Typography>
            </Grid>
            <Grid item>
                <Typography>{state}</Typography>
            </Grid>
        </Grid>
    )
}