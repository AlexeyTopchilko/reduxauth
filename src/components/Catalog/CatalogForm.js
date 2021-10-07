import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ProductsForm from './ProductsForm';
import CategoryForm from './CategoryForm';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { SetSearchMod } from '../../actions/catalogActions';
import { Categories, Products, URL } from '../../Addresses/Addresses';
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import SearchIcon from '@material-ui/icons/Search'
import SortButtons from './Buttons/SortButtons';
import PageSizeButtons from './Buttons/PageSizeButtons';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';
import WebAPI from '../../WebApi';
import LinearProgress from '@material-ui/core/LinearProgress';


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
    const [loading, setLoading] = useState(true);
    const [open, setOpsen] = useState(false);

    const handlePage = (e, value) => {
        setPage(value)
    }

    const handlePageSize = (size) => {
        setPageSize(size);
        setPage(1);
    }

    const resetPage = () => {
        setPage(1);
    }

    const handleSort = (index) => {
        setSortMode(index);
        setPage(1);
    }

    const catalogReducer = useSelector(state => state.catalogReducer)

    const dispatch = useDispatch();

    async function GetCategories() {
        let data = await WebAPI('GET', '', URL + Categories)
        setCategories(data);
    };

    async function GetProducts() {
        let params = {sortMode: sortMode, skip: (page - 1) * pageSize, take: pageSize};
        let data = await WebAPI('POST', params, URL + Products)
        setProducts(data.products);
        setTotalPages(data.totalPages);
        setLoading(false);
    };

    async function GetProductByName() {
        let params = {name: catalogReducer.searchString, sortMode: sortMode , skip: (page - 1) * pageSize, take: pageSize};
        let data = await WebAPI('POST', params, URL + Products)
        setProducts(data.products);
        setTotalPages(data.totalPages);
        setLoading(false);
    }
    async function GetProductsByCategory() {
        let params = {categoryId: catalogReducer.currentCategory.id, sortMode: sortMode, skip: (page - 1) * pageSize, take: pageSize};
        let data = await WebAPI('POST', params, URL + Products)
        setProducts(data.products);
        setTotalPages(data.totalPages);
        setLoading(false);
    }

    const handleClose = () => {
        setOpsen(false)
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
            setLoading(true);
            setOpsen(false);
            GetCategories();
            startMod();

        }, [catalogReducer, sortMode, page, pageSize])

    function sendSearch() {
        dispatch(SetSearchMod(search))
    }


    if (loading === false) {
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
                                    inputProps={{ style: { fontSize: 18 } }}
                                    value={search}
                                    onChange={e =>{ e.target.value.length <=10 ? setSearch(e.target.value) : setSearch(search)}}
                                />
                                <Button variant='contained' color="primary" startIcon={<SearchIcon />} onClick={() => { sendSearch(); setSearch(''); setPage(1) }} />
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
                            <Grid container spacing={2}>
                                <Grid item>
                                    <SortButtons color="primary" sortMode={sortMode} setSortMode={handleSort} />
                                </Grid>
                                <Grid item>
                                    <PageSizeButtons pageSize={pageSize} setPageSize={handlePageSize} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <div className={classes.toolbar} />
                    <ProductsForm products={products} notification={setOpsen} />
                    <div style={{ position: 'relative', marginTop: 30 }} />
                    <Pagination style={{ display: 'flex', justifyContent: 'center' }} count={totalPages} page={page} siblingCount={2} onChange={handlePage} />
                </main>
                <Snackbar onClose={handleClose} open={open} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} autoHideDuration={2000}>
                    <Alert severity='success'>Added to the cart</Alert>
                </Snackbar>
            </Grid>

        )
    }
    else {
        return (
            <div>
                <h1>Loading...</h1>
                <LinearProgress color="primary" />
            </div>)
    }
}