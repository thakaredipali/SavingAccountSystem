
import { combineReducers } from "redux";
import { CustomerReducer } from "./customerReducer";
import { AccountDetailsReducer } from "./accountDetailsReducer";
import { TransactionReducer } from "./transactionReducer";




export const rootReducer = combineReducers({
    CustomerReducer,
    AccountDetailsReducer,
    TransactionReducer
})