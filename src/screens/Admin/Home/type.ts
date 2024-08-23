export interface UserListData {
    res:{
    address: string;
    email: string;
    mobile: string;
    name: string;
    role: string;
    user_id: number;
    accounts?: Accounts[]; // M
    }
}

interface Accounts{
    acc_no: number,
    branch_id: number,
    branch_name: string
    branch_location: string,
    acc_type: string,
    balance: number
}



interface CustomerState {
    res: {
        address: string;
        email: string;
        mobile: string;
        name: string;
        role: string;
        user_id: number;
        accounts?: Accounts[]; 
    }[];
}

export interface RootState {
    CustomerReducer: CustomerState;
}
