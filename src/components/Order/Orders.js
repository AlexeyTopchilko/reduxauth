import { useEffect, useState } from "react";
import WebAPI from '../../WebApi';
import { useSelector } from "react-redux";
import { URL, GetOrderByUserId } from '../../Addresses/Addresses';
import LinearProgress from '@material-ui/core/LinearProgress';
import { DataGrid, GridApi, GridCellValue, GridCellParams, GridColDef } from "@mui/x-data-grid";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router";
import { PinDropSharp } from "@material-ui/icons";



export default function UserOrders() {

  const history = useHistory();

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const authReducer = useSelector(state => state.authReducer);

  async function GetOrdersByUser() {
    let params = "?userId=" + authReducer.user.id;
    let data = await WebAPI('GET', params, URL + GetOrderByUserId);
    setRows(data);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    GetOrdersByUser();
  }, [])

  const columns = [
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'address', headerName: 'Address', width: 250, sortable: false },
    { field: 'totalPrice', headerName: 'Total Price', width: 250 },
    { field: 'state', headerName: 'State', width: 150 },
    { field: 'dateOfPayment', headerName: 'Date of payment', width: 200 },
    {
      field: 'infoButton', headerName: 'Get Info', width: 150, renderCell: (params) => {
        const onClick = () => {
          const id = params.id;
          history.push('/orderInfo/orderId=' + id);
        }
        return <Button size="small" color="primary" variant="contained" onClick={onClick}>Get Info</Button>
      }
    },
    {
      field: 'payButton', headerName: 'Pay', width: 150, renderCell: (params) => {
        const state = params.state;
        const onClick = () => {
          const id = params.id;
          history.push('payment/orderId=' + id);
        }
        if(state !== "Processing"){
        return(<Button size="small" color="primary" variant="contained" onClick={onClick}>Pay</Button>)}
        else{
          return(<Button></Button>)
        }
      }
    }
  ];

  if (loading === true) {
    return (
      <div>
        <h1>Loading...</h1>
        <LinearProgress color="primary" />
      </div>)
  }
  else {
    return (
      <div style={{ height: 700, width: '80%', marginTop: 50, marginLeft: '10%' }}>
        <h1>My Orders</h1>
        <DataGrid rows={rows} columns={columns} pageSize={10} />
      </div>
    )
  }
}