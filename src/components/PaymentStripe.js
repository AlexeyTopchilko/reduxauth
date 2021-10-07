import Cards from 'react-credit-cards';
import { useEffect, useState } from 'react';
import 'react-credit-cards/es/styles-compiled.css';
import { Button, Grid } from '@material-ui/core';
import { URL, PaymentOrderInfo, PayStripe } from '../Addresses/Addresses';
import LinearProgress from '@material-ui/core/LinearProgress';
import WebAPI from '../WebApi';



export default function PaymentStripe(props) {

  const [loading, setLoading] = useState(true);
  const [orderInfo, setOrderInfo] = useState({ orderId: 0, totalPrice: 0 });
  const [values, setValues] = useState({
    cardNumber: '',
    cvc: '',
    expDate: '',
    focus: ''
  });
  let token = localStorage.getItem('token');
  let orderId = props.match.params.orderId;

  async function GetOrderInfo() {
    let params = '?orderId=' + orderId;
    let getResponse = await fetch(URL + PaymentOrderInfo + params, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: 'Bearer ' + token
      }
    });
    let data = await getResponse.json();
    setOrderInfo(data);
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    GetOrderInfo();
  }, [])

  const set = name => {
    return (({ target: { value } }) => {
      setValues(oldValues => ({ ...oldValues, [name]: value }));
    })
  }

  async function PayFunc() {
    let model = { cardNumber: values.cardNumber, month: values.expDate.substring(0, 2), year: values.expDate.substring(2,4), cvc: values.cvc, orderId: orderId };
    let response = await WebAPI('POST', model, URL + PayStripe);
    alert(response.message);
  }

  const handleInputFocus = (e) => {
    setValues(oldValues => ({ ...oldValues, focus: e.target.name }))
  }

  if (loading) {
    return (<div>
      <h1>Loading...</h1>
      <LinearProgress color="primary" />
    </div>)
  }
  else {
    return (
      <Grid container spacing={2} id="PaymentForm" style={{ marginTop: 100, justifyContent: 'center' }}>
        <Grid item>
          <Cards
            name=""
            cvc={values.cvc}
            expiry={values.expDate}
            number={values.cardNumber}
            focused={values.focus}
          />
        </Grid>
        <Grid item>
          <form>
            <Grid container spacing={3} style={{ flexDirection: 'column' }}>
              <Grid item>
                <input
                maxLength={16}
                  name="number"
                  placeholder="Card Number"
                  onChange={set('cardNumber')}
                  onFocus={handleInputFocus}
                />
              </Grid>
              <Grid item>
                <input
                maxLength={4}
                value={values.expDate}
                placeholder="MM\YY"
                  name="expiry"
                  onChange={set('expDate')}
                  onFocus={handleInputFocus} />
              </Grid>
              <Grid item>
                <input
                maxLength={4}
                placeholder="cvc"
                  name="cvc"
                  onChange={set('cvc')}
                  onFocus={handleInputFocus} />
              </Grid>
              <Grid item>
                <Button onClick={PayFunc} variant="contained" color="primary">Pay {orderInfo.totalPrice}$</Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    );
  }
}