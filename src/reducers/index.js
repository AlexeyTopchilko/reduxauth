import authReducer from "./authReducer";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import catalogReducer from "./catalogReducer";


const persistConfig = {
    key : 'reduxState',
    storage
}

const rootReducer = combineReducers({
    authReducer,
    catalogReducer
})

export default persistReducer(persistConfig,rootReducer);