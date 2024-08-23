export interface UserData {
    address: string;
    email: string;
    mobile: string;
    name: string;
    role: string;
    user_id?: number
}


export interface CreateUserValues{
    name: string,
    mobile: string
    email: string
    address: string
}

export interface CreateAccountValues{
    user_id?: number,
    branch_id: number,
    acc_type: string
    balance: number,
}

export interface BranchOption {
    label: string;
    value: string | number; 
  }
