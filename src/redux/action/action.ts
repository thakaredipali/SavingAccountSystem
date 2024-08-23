import { ACCOUNT_DETAILS, CUCTOMER_LIST, USER_DATA } from "../../constant/constants"
import { UserData } from "../../screens/Admin/CreateUser/type"
import { AccountDetails } from "../../screens/Customer/Dashboard/type"



export const getCustomerList = (data: any) => {
    return {
        type : CUCTOMER_LIST,
        data: data
    }
}


export const getUserData = (data: UserData) => {
    return {
        type : USER_DATA,
        data: data
    }
}


export const getAccountDetails = (data: AccountDetails) => {
    return {
        type : ACCOUNT_DETAILS,
        data: data
    }
}