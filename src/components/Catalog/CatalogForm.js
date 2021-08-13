import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        padding: theme.spacing(3),
    },
    appBar: {
        width: `100% px`
    },
    pagination: {
        position: 'relative',
        bottom: 10,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        marginLeft: 190,
        flexGrow: 1,
        backgroundColor: theme.palette.background.white,
        padding: theme.spacing(3),
    }
}));

export default function CatalogForm() {
    const classes = useStyles();

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [sortMode, setSortMode] = useState(0);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize, setPageSize] = useState(8);

    const handlePage = (e, value) => {
        setPage(value)
    }

    const handlePageSize = (e) =>{
        setPageSize(e.target.value);
        setPage(1);
    }

    const resetPage = () => {
        setPage(1);
    }

    const handleSort = (e) => {
        setSortMode(e.target.value);
        setPage(1);
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
        let params = "?sortMode=" + sortMode + "&skip=" + (page - 1) * pageSize + "&take=" + pageSize;
        let response = await fetch(URL + Products + params, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        });
        let data = await response.json();
        setProducts(data.products);
        setTotalPages(data.totalPages);
    };

    async function GetProductByName() {
        let params = "?name=" + catalogReducer.searchString + "&sortMode=" + sortMode + "&skip=" + (page - 1) * pageSize + "&take=" + pageSize;
        let response = await fetch(URL + ProductsByName + params, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        });
        let data = await response.json();
        setProducts(data.products);
        setTotalPages(data.totalPages);
    }
    async function GetProductsByCategory() {
        let params = "?id=" + catalogReducer.currentCategory.id + "&sortMode=" + sortMode + "&skip=" + (page - 1) * pageSize + "&take=" + pageSize;
        let response = await fetch(URL + ProductsByCategory + params, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        });
        let data = await response.json();
        setProducts(data.products);
        setTotalPages(data.totalPages);
    }

    function startMod() {
        if (catalogReducer.searchMod) {
            GetProductByName();
        }
        else {
            if (catalogReducer.currentCategory.id === 0) { GetProducts(); }
            else { setPage(1); GetProductsByCategory(); }
        }
    }

    useEffect(
        () => {
            GetCategories()
            startMod()
        }, [catalogReducer, sortMode, page, pageSize])

    function sendSearch() {
        dispatch(SetSearchMod(search))
    }


    return (
        <Grid className={classes.root}>
            <div style={{ position: 'fixed' }}>
                <CategoryForm categories={categories} resetPage={resetPage} />
            </div>
            <main className={classes.content}>
                <Grid container justifyContent="space-between"  >
                    <Grid item>
                        <Grid container>
                            <TextField
                                name="search"
                                variant="outlined"
                                id="search"
                                label="Search..."
                                inputProps={{ style: { fontSize: 18 }, minLength: "1" }}
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                            <Button variant='contained' color="primary" onClick={() => { sendSearch(); setSearch(''); setPage(1) }}  >
                                Ok
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item>
                        {!(catalogReducer.searchMod) ?
                            <Typography component="h1" variant="h4">
                                {catalogReducer.currentCategory.name}
                            </Typography> :
                            <Typography component="h1" variant="h4">
                                Results of serching "{catalogReducer.searchString}"
                            </Typography>
                        }
                    </Grid>
                    <Grid item >
                        {//<InputLabel id="demo-simple-select-label">Sort By</InputLabel>}
                        }
                        <Grid container direction='column' spacing={2}>
                            <Grid item>
                            <Select value={sortMode} onChange={handleSort}>
                                <MenuItem value={0}>Default sort</MenuItem>
                                <MenuItem value={1}>Sort by price ascending</MenuItem>
                                <MenuItem value={2}>Sort by price descending</MenuItem>
                                <MenuItem value={3}>Sort by name</MenuItem>
                            </Select>
                            </Grid>
                            <Grid item>
                            <Select value={pageSize} onChange={handlePageSize}>
                                <MenuItem value={4}>Show 4 products on page</MenuItem>
                                <MenuItem value={8}>Show 8 products on page</MenuItem>
                                <MenuItem value={12}>Show 12 products on page</MenuItem>
                                <MenuItem value={16}>Show 16 products on page</MenuItem>
                            </Select>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <div className={classes.toolbar} />
                <ProductsForm products={products} />
                <div style={{ position: 'relative', marginTop: 30 }} />
                <Pagination style={{ display: 'flex', justifyContent: 'center' }} count={totalPages} page={page} siblingCount={2} onChange={handlePage} />
            </main>
        </Grid>

    );
}