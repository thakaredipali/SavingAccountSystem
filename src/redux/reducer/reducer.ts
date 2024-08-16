import { CUCTOMER_LIST, USER_DATA } from "../../constant/constants"
import { Iaction } from "./types"


const initialState: any= []
export const CustomerReducer = (state = [], action: Iaction) => {
    switch(action.type) {
        case CUCTOMER_LIST:
            const res = action?.data;
            return {...state, res}; // Ensure action.data is serializable
        default:
            return state;
    }
};

export const UserDataReducer = (state = [], action: Iaction) => {
    switch(action.type) {
        case USER_DATA:
            const res = action?.data;
            return {...state, res}; // Ensure action.data is serializable
        default:
            return state;
    }
};