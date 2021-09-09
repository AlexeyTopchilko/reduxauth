import { Button, Grid, TextField } from "@material-ui/core";
import { useState } from "react";
import { useSelector } from "react-redux";
import { URL, CreateAddress } from "../../Addresses/Addresses";
import WebAPI from "../../WebApi";

export default function AddAddressForm(props) {

    const authReducer = useSelector(state => state.authReducer)

    const [values, setValues] = useState({
        city: '',
        street: '',
        houseNumber: '',
        errors: { city: '', street: '', houseNumber: '' },
        cityValid: false,
        streetValid: false,
        houseNumberValid: false,
        formValid: false
    });

    const set = name => {
        return (({ target: { value } }) => {
            setValues(oldValues => ({ ...oldValues, [name]: value }));
            validateField(name, value);
        })
    }

    function validateField(fieldName, value) {
        let fieldValidationErrors = values.errors;
        let cityValid = values.cityValid;
        let streetValid = values.streetValid;
        let houseNumberValid = values.houseNumberValid;

        switch (fieldName) {
            case 'city':
                cityValid = value.length >= 1;
                fieldValidationErrors.city = cityValid ? '' : 'Can not be empty';
                break;
            case 'street':
                streetValid = value.length >= 1;
                fieldValidationErrors.street = streetValid ? '' : 'Can not be empty';
                break;
            case 'houseNumber':
                houseNumberValid = value.length >= 1;
                fieldValidationErrors.houseNumber = houseNumberValid ? '' : 'Can not be empty'
                break;
            default:
                break;


        }
        setValues(oldValues => ({
            ...oldValues,
            errors: fieldValidationErrors,
            cityValid: cityValid,
            streetValid: streetValid,
            houseNumberValid: houseNumberValid,
            formValid: cityValid && streetValid && houseNumberValid
        }));
    }
    async function CreateAddressFunc() {
        let address = { userId: authReducer.user.id, city: values.city, street: values.street, houseNumber: values.houseNumber }
        await WebAPI('POST', address, URL + CreateAddress);
        props.handleUpdate();
    };

    return (
        <Grid container spacing={2} style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 30, alignItems: 'center' }}>
            <Grid item>
                <TextField
                    variant="outlined"
                    label="City"
                    name="city"
                    autoFocus
                    error={values.errors.city !== ''}
                    helperText={values.errors.city}
                    value={values.city}
                    onChange={set('city')} />
            </Grid>
            <Grid item>
                <TextField
                    variant="outlined"
                    label="Street"
                    name="street"
                    error={values.errors.street !== ''}
                    helperText={values.errors.street}
                    value={values.street}
                    onChange={set('street')} />
            </Grid>
            <Grid item>
                <TextField
                    variant="outlined"
                    label="House number"
                    name="houseNumber"
                    error={values.errors.houseNumber !== ''}
                    helperText={values.errors.houseNumber}
                    value={values.houseNumber}
                    onChange={set('houseNumber')} />
            </Grid>
            <Grid item>
                <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    disabled={!values.formValid}
                    onClick={CreateAddressFunc}>
                    Add
                </Button>
            </Grid>
        </Grid>
    )
}