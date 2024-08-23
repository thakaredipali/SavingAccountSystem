import { TRANSACTION_HISTORY } from "../../constant/constants";
import { TransactionHistory, TransactionHistoryState } from "../../screens/Customer/Transaction/type";

import { Iaction } from "./types";

const initialState: TransactionHistoryState = {
    transactions: [], 
  };
  
  export const TransactionReducer = (state = initialState, action: Iaction) => {
    switch (action.type) {
      case TRANSACTION_HISTORY:
        return {
          ...state,
          transactions: [...state.transactions, ...action.data],
        };
      default:
        return state;
    }
  };