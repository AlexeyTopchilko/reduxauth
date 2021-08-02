import React from 'react';
import {makeStyles } from '@material-ui/core/styles';
import ProductsForm from './ProductsForm';
import CategoryForm from './CategoryForm';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { SetSearchMod } from '../../actions/catalogActions';
import { Categories, Products, ProductsByCategory, ProductsByName, URL } from '../../Addresses/Addresses';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        padding: theme.spacing(3),
    },
    appBar: {
        width: `100% px`,
        marginLeft: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        marginLeft : 190,
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));

export default function CatalogForm() {
    const classes = useStyles();

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [sortMode, setSortMode] = useState('');

    const handleSort = (e) =>{
        setSortMode(e.target.value);
    }

    const catalogReducer = useSelector(state => state.catalogReducer)

    const dispatch = useDispatch();

    async function GetCategories() {
        let response = await fetch(URL + Categories, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        });
        let data = await response.json();
        setCategories(data);
    };

    async function GetProducts() {
        let response = await fetch(URL + Products, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        });
        let data = await response.json();
        setProducts(data);
    };

    async function GetProductByName(){
        let response = await fetch(URL + ProductsByName, {
            method: 'POST',
            body: JSON.stringify(catalogReducer.searchString), 
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        });
        let data = await response.json();
        setProducts(data);
    }
    async function GetProductsByCategory() {
        let response = await fetch(URL + ProductsByCategory, {
            method: 'POST',
            body: catalogReducer.currentCategory.id,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        });
        let data = await response.json();
        setProducts(data);
    }

    function ghghghg() {
        if(catalogReducer.searchMod){
             GetProductByName();
         }
         else{
        if (catalogReducer.currentCategory.id === null) { GetProducts();}
        else { GetProductsByCategory();}
        }}
    
    useEffect(
        () => {
            GetCategories()
            ghghghg()
        },[catalogReducer])
    
    function sendSearch() {
        dispatch(SetSearchMod(search))
    }    
        

    return (
        <Grid className={classes.root}>
            <div style ={{position : 'fixed'}}>
            <CategoryForm categories={categories} />
            </div>
            <main className={classes.content}>
                <Grid container justifyContent="space-between"  >
                    <Grid item>
            <TextField
                name="search"
                variant="outlined"
                id="search"
                label="Search..."
                inputProps={{ style: { fontSize: 18 }, minLength: "1" }}
                //error={values.errors.username}
                //helperText={values.errors.username}
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <Button variant="contained" color="primary"   onClick = {() => {sendSearch(); setSearch('')}}  >
        Ok
      </Button>
      </Grid>
      <Grid item>
          <Typography component="h1" variant="h4">
            {catalogReducer.currentCategory.name}
          </Typography>
      </Grid>
      <Grid item>
      <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
      <Select value = {sortMode} onChange = {handleSort}>
          <MenuItem value={1}>Price ascending</MenuItem>
          <MenuItem value={2}>Price descending</MenuItem>
        </Select>
        </Grid>
        </Grid>
                <div className={classes.toolbar} />
                <ProductsForm products = {(sortMode === 1 )? products.sort((a,b)=> b.price - a.price) : (sortMode === 2) ? products.sort((a,b) => a.price - b.price) : products}/>
            </main>
        </Grid>
    );
}