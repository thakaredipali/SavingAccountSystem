export interface AccountData{
    acc_no: number;
    balance: number;
}


interface AcccountDetailsState {
    res: {
      acc_no: number;
      branch_id: number;
      acc_type: string;
      balance: number;
    }[];
  }
  
 export interface RootState {
    AccountDetailsReducer: AcccountDetailsState;
  }