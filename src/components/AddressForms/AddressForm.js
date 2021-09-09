import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Checkbox } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import { URL, GetUserAddresses, DeleteAddress } from "../../Addresses/Addresses";
import { useSelector } from "react-redux";
import AddAddressForm from "./AddAddressForm";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import { red } from "@material-ui/core/colors";
import { Button } from "@material-ui/core";

export default function AddressForm() {
    const [addresses, setAddresses] = useState([]);
    const [chosenAddress, setChosenAddress] = useState(null);
    const [addMod, setAddMod] = useState(false);
    const [update, setUpdate] = useState(false);
    const [loading, setLoading] = useState(true);
    const authReducer = useSelector(state => state.authReducer);


    const handleUpdate = () => {
        setAddMod(false);
        setUpdate(!update);
    }

    async function GetAddresses() {
        let params = "?userId=" + authReducer.user.id;
        let response = await fetch(URL + GetUserAddresses + params, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        });
        let data = await response.json();
        setAddresses(data);
        setLoading(false);
    }

    async function DeleteAddressFunc(id) {
        let params = "?addressId=" + id;
        await fetch(URL + DeleteAddress + params, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        });
        setUpdate(!update);
    }
    useEffect(() => {
        setLoading(true);
        GetAddresses();
    }, [update])
    if (loading) {
        return (<h1>Loading...</h1>)
    }
    else {
        return (
            <Grid container style={{ marginTop: 10, justifyItems: 'center', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', maxWidth: '99%' }}>
                <Grid item>
                    <Typography variant="subtitle1">Choose your address:</Typography>
                </Grid>
                {addresses.map(item =>
                    <Grid key={item.id} container spacing={2} style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 30, alignItems: 'center' }}>
                        <Grid item xs={2}>
                            <Checkbox checked={chosenAddress === item.id} color="primary"
                                onChange={() => chosenAddress === item.id ? setChosenAddress(null) : setChosenAddress(item.id)} />
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>{item.city},{item.street},{item.houseNumber}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Tooltip title="Clear" aria-label="Clear">
                                <IconButton aria-label="delete" style={{ color: red[500] }} onClick={() => { DeleteAddressFunc(item.id) }}>
                                    <ClearIcon fontSize="large" />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>)}
                <Grid item>
                    <Tooltip title="Add address" aria-label="add" style={{ marginTop: 30 }}>
                        <Fab color='primary' size="small" onClick={() => { setAddMod(true) }} >
                            <AddIcon />
                        </Fab>
                    </Tooltip>

                    {addMod ? <AddAddressForm handleUpdate={handleUpdate} /> : null}
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" disabled={chosenAddress === null} style={{ marginTop: 30 }}>Next</Button>
                </Grid>
            </Grid>
        )
    }
}