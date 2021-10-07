import authReducer from "./authReducer";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import catalogReducer from "./catalogReducer";
import cartQuantityReducer from "./cartQuantityReducer";


const persistConfig = {
    key : 'reduxState',
    storage
}

const rootReducer = combineReducers({
    authReducer,
    catalogReducer,
    cartQuantityReducer
})

export default persistReducer(persistConfig,rootReducer);