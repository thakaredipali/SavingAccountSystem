import { CUCTOMER_LIST, USER_DATA } from "../../constant/constants"
import { UserData } from "../../screens/createuser/type"



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