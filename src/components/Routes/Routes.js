import { Switch, Route } from 'react-router-dom';
import Home from '../Home';
import SignInForm from '../Authentication/SignInForm';
import SignUpForm from '../Authentication/SignUpForm';
import Cart from '../Cart/Cart';
import AddressForm from '../AddressForms/AddressForm';
import CatalogForm from '../Catalog/CatalogForm';
import ProductPage from '../Catalog/ProductPage';
import WeatherDisplay from '../ForTest/WeatherDisplay';
import Order from '../Order/Order';
import UserOrders from '../Order/Orders';
import Payment from '../Payment';
import OrderInfo from '../Order/OrderInfo';
import PaymentStripe from '../PaymentStripe';

export default function Routes() {
    
    return(
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/signin' component={SignInForm} />
            <Route exact path='/signup' component={SignUpForm} />
            <Route exact path='/catalog' component = {CatalogForm}/>
            <Route exact path='/weather' component={WeatherDisplay} />
            <Route exact path ='/product/id=:id' component ={ProductPage} />
            <Route exact path="/Cart" component={Cart} />
            <Route exact path='/address/cartId=:cartId' component={AddressForm} />
            <Route exact path='/order/orderId=:orderId' component={Order} />
            <Route exact path='/orderInfo/orderId=:orderId' component={OrderInfo} />
            <Route exact path='/myorders' component={UserOrders} />
            <Route exact path='/payment/orderId=:orderId' component={Payment} />
            <Route exact path='/stripe/orderId=:orderId' component={PaymentStripe} />
          </Switch>
    )
}