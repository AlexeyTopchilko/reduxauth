
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import { useDispatch, useSelector} from 'react-redux';
import { ResetCategory, SetCategory } from '../../actions/catalogActions';
import { MenuItem } from '@material-ui/core';
import { useState } from 'react';


export default function CategoryForm(props) {
    const dispatch = useDispatch();
    const catalogReducer = useSelector(state => state.catalogReducer)
    const [id, setId] = useState(catalogReducer.currentCategory.id);
    try
    {
    return (
        <List container="true" alignitems="flex-start" style ={{ flexDirection : 'column', }} >
            <MenuItem button key='null' selected ={catalogReducer.currentCategory.id === 0}  style ={{color : 'royalblue'}} 
            onClick = {()=>{dispatch(ResetCategory()); setId(0); props.resetPage()}} >
                                   <ListItemText primary="All"  />
                            </MenuItem>
            {props.categories.map(item =>
                            <MenuItem button key={item.id} selected ={item.id === id}  style ={{color : 'royalblue'}} 
                            onClick = {()=> {dispatch(SetCategory({id :item.id, name : item.name})); setId(item.id);props.resetPage()}} >
                                   <ListItemText primary={item.name}  />
                            </MenuItem>
                        )}
            </List>
    )}
    catch{
        return;
    }
}