import { ACCOUNT_DETAILS } from "../../constant/constants";
import { Iaction } from "./types";

export const AccountDetailsReducer = (state = [], action: Iaction) => {
    switch(action.type) {
        case ACCOUNT_DETAILS:
            const res = action?.data;
            return {...state, res}; // Ensure action.data is serializable
        default:
            return state;
    }
};