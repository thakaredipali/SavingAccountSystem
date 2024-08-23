export interface TransactionHistory {
    id: string
    type: string
    amount: string
}[]


export interface TransactionHistoryState {
  transactions: TransactionHistory[]
  }
  
 export interface TransactionRootState {
    TransactionReducer: TransactionHistoryState;
  }